import { Injectable } from '@nestjs/common';
import { YookassaGateway } from './gateways/yookassa.gateway';
import { OrdersService } from '../orders/services/orders.service';
import { Payment } from './entities/payment.entity';
import { PaymentStatus } from '../orders/interfaces/order.interface';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly yookassaGateway: YookassaGateway,
    private readonly ordersService: OrdersService
  ) {}

  async createPayment(orderId: string, amount: number): Promise<Payment> {
    return this.yookassaGateway.createPayment(
      {
        amount: {
          value: amount.toFixed(2),
          currency: 'RUB'
        },
        confirmation: {
          type: 'redirect',
          return_url: process.env.PAYMENT_RETURN_URL || 'http://localhost:3000/payment/success'
        },
        metadata: {
          orderId
        }
      },
      orderId
    );
  }

  async confirmPayment(paymentId: string): Promise<Payment> {
    const payment = await this.yookassaGateway.checkPaymentStatus(paymentId);
    if (payment.status === 'succeeded' && payment.metadata?.orderId) {
      const orderId = payment.metadata.orderId;
      await this.ordersService.updatePaymentStatus(orderId, PaymentStatus.PAID);
    }
    return payment;
  }

  async getPaymentStatus(paymentId: string): Promise<Payment> {
    return this.yookassaGateway.checkPaymentStatus(paymentId);
  }

  verifyWebhook(payload: Record<string, unknown>): boolean {
    // В реальном приложении здесь должна быть проверка подписи
    return true;
  }
}
