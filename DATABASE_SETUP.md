# Настройка базы данных Supabase

## Инструкция по запуску SQL миграций

Откройте SQL Editor в вашей Supabase консоли и выполните следующий скрипт:

```sql
-- Create newsletter_subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  subscribed_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price decimal(10,2) not null check (price >= 0),
  category text not null,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create contact_submissions table
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

-- Create cart_items table
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, product_id)
);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  total_amount decimal(10,2) not null check (total_amount >= 0),
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'cancelled')),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null check (quantity > 0),
  price decimal(10,2) not null check (price >= 0),
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.newsletter_subscribers enable row level security;
alter table public.products enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- RLS Policies for newsletter_subscribers (insert only)
create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers for insert
  to public
  with check (true);

-- RLS Policies for products (public read)
create policy "Products are viewable by everyone"
  on public.products for select
  to public
  using (true);

-- RLS Policies for contact_submissions (insert only for public)
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  to public
  with check (true);

-- RLS Policies for cart_items (users manage their own cart)
create policy "Users can view their own cart"
  on public.cart_items for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert into their own cart"
  on public.cart_items for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own cart"
  on public.cart_items for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete from their own cart"
  on public.cart_items for delete
  to authenticated
  using (auth.uid() = user_id);

-- RLS Policies for orders (users can view their own orders)
create policy "Users can view their own orders"
  on public.orders for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on public.orders for insert
  to authenticated
  with check (auth.uid() = user_id);

-- RLS Policies for order_items (users can view items from their orders)
create policy "Users can view their order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Create cake_configurations table
create table if not exists public.cake_configurations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  configuration jsonb not null,
  price integer not null check (price >= 0),
  status text not null default 'draft' check (status in ('draft', 'ordered', 'completed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for cake_configurations
alter table public.cake_configurations enable row level security;

-- RLS Policies for cake_configurations
create policy "Users can view their own configurations"
  on public.cake_configurations for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own configurations"
  on public.cake_configurations for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own configurations"
  on public.cake_configurations for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own configurations"
  on public.cake_configurations for delete
  to authenticated
  using (auth.uid() = user_id);

-- Insert sample products
insert into public.products (title, description, price, category, image_url) values
  ('Шоколадный торт мечты', 'Нежные шоколадные коржи с шелковистым ганашем', 45.00, 'cakes', '/assets/chocolate-cake.jpg'),
  ('Набор авторской выпечки', 'Ассорти свежих круассанов, датских булочек и слоёных изделий', 28.00, 'pastries', '/assets/pastries.jpg'),
  ('Праздничный торт на заказ', 'Персонализированный многоярусный торт для вашего особого случая', 120.00, 'custom', '/assets/custom-cake.jpg')
on conflict do nothing;
```

## Что это создаст:

1. **newsletter_subscribers** - подписчики на новости
2. **products** - таблица продуктов
3. **contact_submissions** - сообщения из контактной формы
4. **cart_items** - корзина покупок (для авторизованных пользователей)
5. **orders** - заказы
6. **order_items** - элементы заказов
7. **cake_configurations** - конфигурации тортов на заказ

Все таблицы защищены Row Level Security (RLS) политиками.

## После выполнения SQL:

Ваш проект готов к работе с базой данных!
