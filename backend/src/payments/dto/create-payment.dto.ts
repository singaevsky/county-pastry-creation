import { IsString, IsNumber, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  orderId!: string;

  @IsNumber()
  @Min(0)
  amount!: number;
}

export class PaymentResponseDto {
  id!: string;
  orderId!: string;
  amount!: number;
  status!: string;
  redirectUrl?: string;
}
