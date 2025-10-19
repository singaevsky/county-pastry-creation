import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import YooKassa from 'yookassa';
import { IPaymentGateway, PaymentRequest } from '../interfaces/payment-gateway.interface';
import { Payment, PaymentStatus } from '../entities/payment.entity';

@Injectable()
export class YookassaGateway implements IPaymentGateway {
  private client: any;

  constructor(private configService: ConfigService) {
    const shopId = this.configService.get('YOOKASSA_SHOP_ID');
    const secretKey = this.configService.get('YOOKASSA_SECRET_KEY');

    if (!shopId || !secretKey) {
      throw new Error('YooKassa configuration is missing');
    }

    this.client = new YooKassa({
      shopId,
      secretKey,
    });
  }

  async createPayment(request: PaymentRequest, orderId: string): Promise<Payment> {
    const prepay = parseFloat(request.amount.value) * 0.5; // 50% предоплата
    const result = await this.client.createPayment({
      amount: { value: prepay.toString(), currency: request.amount.currency },
      confirmation: request.confirmation,
      capture: true,
      description: `Заказ #${orderId}`,
      metadata: request.metadata,
    });

    const payment = new Payment();
    payment.id = result.id;
    payment.orderId = orderId;
    payment.amount = prepay;
    payment.currency = request.amount.currency;
    payment.paymentMethodId = result.payment_method?.id || 'unknown';
    payment.status = this.mapYooKassaStatus(result.status);
    payment.metadata = result.metadata;
    payment.externalId = result.id;
    payment.createdAt = new Date(result.created_at);

    return payment;
  }

  async checkPaymentStatus(paymentId: string): Promise<Payment> {
    const result = await this.client.getPaymentInfo(paymentId);

    const payment = new Payment();
    payment.id = result.id;
    payment.orderId = result.metadata.orderId;
    payment.amount = parseFloat(result.amount.value);
    payment.currency = result.amount.currency;
    payment.paymentMethodId = result.payment_method?.id || 'unknown';
    payment.status = this.mapYooKassaStatus(result.status);
    payment.metadata = result.metadata;
    payment.externalId = result.id;
    payment.createdAt = new Date(result.created_at);

    return payment;
  }

  async confirmPayment(paymentId: string): Promise<Payment> {
    const result = await this.client.capturePayment(paymentId);

    const payment = new Payment();
    payment.id = result.id;
    payment.orderId = result.metadata.orderId;
    payment.amount = parseFloat(result.amount.value);
    payment.currency = result.amount.currency;
    payment.paymentMethodId = result.payment_method?.id || 'unknown';
    payment.status = this.mapYooKassaStatus(result.status);
    payment.metadata = result.metadata;
    payment.externalId = result.id;
    payment.createdAt = new Date(result.created_at);

    return payment;
  }

  async cancelPayment(paymentId: string): Promise<Payment> {
    const result = await this.client.cancelPayment(paymentId);

    const payment = new Payment();
    payment.id = result.id;
    payment.orderId = result.metadata.orderId;
    payment.amount = parseFloat(result.amount.value);
    payment.currency = result.amount.currency;
    payment.paymentMethodId = result.payment_method?.id || 'unknown';
    payment.status = this.mapYooKassaStatus(result.status);
    payment.metadata = result.metadata;
    payment.externalId = result.id;
    payment.createdAt = new Date(result.created_at);

    return payment;
  }

  private mapYooKassaStatus(status: string): PaymentStatus {
    switch (status) {
      case 'pending':
        return PaymentStatus.PENDING;
      case 'succeeded':
        return PaymentStatus.SUCCEEDED;
      case 'canceled':
        return PaymentStatus.CANCELED;
      default:
        return PaymentStatus.FAILED;
    }
  }

  verifyWebhook(payload: Record<string, unknown>, signature: string): boolean {
    const webhookSecret = this.configService.get('YOOKASSA_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new Error('YooKassa webhook secret is missing');
    }

    const crypto = require('crypto');
    const computed = crypto.createHmac('sha256', webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');
    return computed === signature;
  }
}
