import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios'; // npm i axios

@Injectable()
export class TinkoffGateway {
  private baseUrl = 'https://securepay.tinkoff.ru/v2/';

  constructor(private configService: ConfigService) {}

  async createPayment(amount: number, orderId: number) {
    const prepay = amount * 0.5;
    const payload = {
      TerminalKey: this.configService.get('TINKOFF_TERMINAL_KEY'),
      Amount: prepay * 100, // в копейках
      OrderId: orderId.toString(),
      SuccessURL: `${process.env.FRONTEND_URL}/success`,
      Password: this.configService.get('TINKOFF_PASSWORD'),
    };

    const res = await axios.post(`${this.baseUrl}Init`, payload);
    return res.data;
  }

  // Webhook verification аналогично Yookassa
  async verifyWebhook(payload: any): Promise<boolean> {
    // Implement signature check with SHA256
    return true; // Placeholder
  }
}
