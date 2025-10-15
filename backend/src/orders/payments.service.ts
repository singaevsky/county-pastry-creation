import { Injectable, Post, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as yookassa from 'yookassa'; // npm i yookassa

@Injectable()
export class PaymentsService {
  private yookassaClient;

  constructor(configService: ConfigService) {
    this.yookassaClient = yookassa({
      shopId: configService.get('YOOKASSA_SHOP_ID'),
      secretKey: configService.get('YOOKASSA_SECRET'),
    });
  }

  async createPayment(orderId: number, amount: number) {
    // 50% prepay
    const prepay = amount * 0.5;
    return this.yookassaClient.createPayment({
      amount: { value: prepay.toFixed(2), currency: 'RUB' },
      confirmation: { type: 'redirect', return_url: 'https://your-site/success' },
      metadata: { orderId },
    });
  }

  // Webhook handler для confirmation
  @Post('webhook/yookassa')
  async handleWebhook(@Body() payload: any) {
    // Update order status
  }

  // Аналог для Tinkoff
}
