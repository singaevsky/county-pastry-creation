export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  READY = 'ready',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface DeliveryDetails {
  address: string;
  city: string;
  postalCode: string;
  deliveryDate: Date;
  deliveryTime: string;
  contactPhone: string;
  specialInstructions?: string;
}
