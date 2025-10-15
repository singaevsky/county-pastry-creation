import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import YooKassa from 'yookassa'; // npm i yookassa

@Injectable()
export class YookassaGateway {
  private client: any;

  constructor(private configService: ConfigService) {
    this.client = new YooKassa({
      shopId: this.configService.get('YOOKASSA_SHOP_ID'),
      secretKey: this.configService.get('YOOKASSA_SECRET_KEY'),
    });
  }

  async createPayment(amount: number, orderId: number) {
    const prepay = amount * 0.5; // 50% logic
    return this.client.createPayment({
      amount: { value: prepay.toString(), currency: 'RUB' },
      confirmation: { type: 'redirect', return_url: `${process.env.FRONTEND_URL}/success` },
      capture: true,
      description: `Заказ #${orderId}`,
      metadata: { orderId: orderId.toString() },
    });
  }

  verifyWebhook(payload: any, signature: string): boolean {
    // Implement HMAC-SHA256 verification with secret
    const crypto = require('crypto');
    const computed = crypto.createHmac('sha256', this.configService.get('YOOKASSA_WEBHOOK_SECRET'))
      .update(JSON.stringify(payload))
      .digest('hex');
    return computed === signature;
  }

  async confirmPayment(paymentId: string) {
    // Update order status to 'paid', notify via integrations
    // e.g., this.paymentsService.updateOrderStatus(orderId, 'paid');
  }
}
