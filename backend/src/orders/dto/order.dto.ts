import { IsUUID, IsEnum, IsNumber, IsArray, IsString, IsOptional, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, PaymentStatus, DeliveryDetails } from '../interfaces/order.interface';

export class CreateOrderItemDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;

  @IsOptional()
  customization?: Record<string, any>;
}

export class CreateDeliveryDetailsDto implements DeliveryDetails {
  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  postalCode!: string;

  @IsDateString()
  deliveryDate!: Date;

  @IsString()
  deliveryTime!: string;

  @IsString()
  contactPhone!: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];

  @ValidateNested()
  @Type(() => CreateDeliveryDetailsDto)
  deliveryDetails!: CreateDeliveryDetailsDto;

  @IsOptional()
  @IsString()
  specialRequirements?: string;

  @IsOptional()
  designImage?: {
    url: string;
    thumbnailUrl: string;
  };
}

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsUUID()
  bakerId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDeliveryDetailsDto)
  deliveryDetails?: CreateDeliveryDetailsDto;

  @IsOptional()
  @IsString()
  specialRequirements?: string;
}

export class OrderResponseDto {
  id!: string;
  clientId!: string;
  bakerId?: string;
  status!: OrderStatus;
  paymentStatus!: PaymentStatus;
  totalAmount!: number;
  items!: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    customization?: Record<string, any>;
  }>;
  deliveryDetails!: DeliveryDetails;
  specialRequirements?: string;
  designImage?: {
    url: string;
    thumbnailUrl: string;
  };
  createdAt!: Date;
  updatedAt!: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}
