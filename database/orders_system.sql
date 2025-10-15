-- =====================================================
-- ORDERS SYSTEM MIGRATION
-- Stage 1: Orders, Payments, Audit Logs
-- =====================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create enum for order status
create type public.order_status as enum (
  'draft',
  'awaiting_payment',
  'paid',
  'cooking',
  'delivery',
  'done',
  'cancelled'
);

-- Create enum for payment status
create type public.payment_status as enum (
  'pending',
  'completed',
  'failed',
  'refunded',
  'partially_refunded'
);

-- Create enum for payment provider
create type public.payment_provider as enum (
  'yookassa',
  'tinkoff'
);

-- Settings table for system configuration
create table public.settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default prepaid percentage setting
insert into public.settings (key, value, description)
values ('prepaid_percent', '50', 'Процент предоплаты для заказов');

-- Orders table
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  cake_configuration_id uuid references public.cake_configurations(id) on delete set null,
  status order_status default 'draft' not null,
  total_price decimal(10, 2) not null,
  prepaid_amount decimal(10, 2),
  delivery_address text,
  delivery_cost decimal(10, 2) default 0,
  delivery_lat decimal(10, 8),
  delivery_lon decimal(11, 8),
  assigned_cook_id uuid references auth.users(id) on delete set null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Payments table
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  provider payment_provider not null,
  provider_payment_id text,
  amount decimal(10, 2) not null,
  status payment_status default 'pending' not null,
  payment_url text,
  receipt_url text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Audit logs table
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id uuid not null,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  user_id uuid references auth.users(id) on delete set null,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order status transitions table (for tracking status changes)
create table public.order_status_transitions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  from_status order_status,
  to_status order_status not null,
  notes text,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable Row Level Security
alter table public.settings enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;
alter table public.audit_logs enable row level security;
alter table public.order_status_transitions enable row level security;

-- RLS Policies for settings (read-only for all authenticated users)
create policy "Settings are viewable by authenticated users"
  on public.settings for select
  to authenticated
  using (true);

-- RLS Policies for orders
create policy "Users can view their own orders"
  on public.orders for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own draft orders"
  on public.orders for update
  to authenticated
  using (auth.uid() = user_id and status = 'draft')
  with check (auth.uid() = user_id);

-- RLS Policies for payments
create policy "Users can view payments for their orders"
  on public.payments for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
      and orders.user_id = auth.uid()
    )
  );

-- RLS Policies for audit logs (read-only for users)
create policy "Users can view audit logs for their records"
  on public.audit_logs for select
  to authenticated
  using (user_id = auth.uid());

-- RLS Policies for order status transitions
create policy "Users can view status transitions for their orders"
  on public.order_status_transitions for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_status_transitions.order_id
      and orders.user_id = auth.uid()
    )
  );

-- =====================================================
-- TRIGGERS & FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Triggers for updated_at
create trigger update_settings_updated_at
  before update on public.settings
  for each row
  execute function public.update_updated_at_column();

create trigger update_orders_updated_at
  before update on public.orders
  for each row
  execute function public.update_updated_at_column();

create trigger update_payments_updated_at
  before update on public.payments
  for each row
  execute function public.update_updated_at_column();

-- Function to log order changes to audit_logs
create or replace function public.log_order_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (TG_OP = 'INSERT') then
    insert into public.audit_logs (table_name, record_id, action, new_data, user_id)
    values ('orders', new.id, 'INSERT', to_jsonb(new), auth.uid());
    return new;
  elsif (TG_OP = 'UPDATE') then
    insert into public.audit_logs (table_name, record_id, action, old_data, new_data, user_id)
    values ('orders', new.id, 'UPDATE', to_jsonb(old), to_jsonb(new), auth.uid());
    return new;
  elsif (TG_OP = 'DELETE') then
    insert into public.audit_logs (table_name, record_id, action, old_data, user_id)
    values ('orders', old.id, 'DELETE', to_jsonb(old), auth.uid());
    return old;
  end if;
  return null;
end;
$$;

-- Trigger for audit logging on orders
create trigger orders_audit_trigger
  after insert or update or delete on public.orders
  for each row
  execute function public.log_order_changes();

-- Function to track order status transitions
create or replace function public.track_order_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (TG_OP = 'UPDATE' and old.status is distinct from new.status) then
    insert into public.order_status_transitions (order_id, from_status, to_status, user_id)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$;

-- Trigger for tracking status changes
create trigger track_order_status_trigger
  after update on public.orders
  for each row
  execute function public.track_order_status_change();

-- Function to validate order status transitions
create or replace function public.validate_order_status_transition()
returns trigger
language plpgsql
as $$
begin
  -- Allow any transition from draft
  if old.status = 'draft' then
    return new;
  end if;
  
  -- Validate specific transitions
  if (
    (old.status = 'awaiting_payment' and new.status in ('paid', 'cancelled')) or
    (old.status = 'paid' and new.status in ('cooking', 'cancelled')) or
    (old.status = 'cooking' and new.status in ('delivery', 'cancelled')) or
    (old.status = 'delivery' and new.status in ('done', 'cancelled')) or
    (old.status = 'cancelled' and new.status = 'cancelled') or
    (old.status = 'done' and new.status = 'done')
  ) then
    return new;
  end if;
  
  raise exception 'Invalid status transition from % to %', old.status, new.status;
end;
$$;

-- Trigger for validating status transitions
create trigger validate_order_status_trigger
  before update on public.orders
  for each row
  when (old.status is distinct from new.status)
  execute function public.validate_order_status_transition();

-- Function to calculate prepaid amount
create or replace function public.calculate_prepaid_amount()
returns trigger
language plpgsql
as $$
declare
  prepaid_percent decimal;
begin
  -- Get prepaid percentage from settings
  select (value::text)::decimal into prepaid_percent
  from public.settings
  where key = 'prepaid_percent';
  
  -- Calculate prepaid amount
  new.prepaid_amount := (new.total_price * prepaid_percent / 100);
  
  return new;
end;
$$;

-- Trigger to auto-calculate prepaid amount
create trigger calculate_prepaid_trigger
  before insert or update on public.orders
  for each row
  when (new.total_price is not null)
  execute function public.calculate_prepaid_amount();

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_assigned_cook_id on public.orders(assigned_cook_id);
create index idx_payments_order_id on public.payments(order_id);
create index idx_payments_status on public.payments(status);
create index idx_audit_logs_table_record on public.audit_logs(table_name, record_id);
create index idx_audit_logs_user_id on public.audit_logs(user_id);
create index idx_order_status_transitions_order_id on public.order_status_transitions(order_id);
