import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'; // Assume implemented
import { PaymentsService } from './payments.service';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  async create(@Body('orderId') orderId: number, @Body('amount') amount: number) {
    return this.paymentsService.createPayment(orderId, amount);
  }

  @Post('webhook/yookassa')
  async handleYookassaWebhook(@Body() payload: any) {
    // Verify signature (Yookassa header)
    if (!this.paymentsService.verifyWebhook(payload)) {
      throw new UnauthorizedException('Invalid signature');
    }
    if (payload.event === 'payment.succeeded') {
      await this.paymentsService.confirmPayment(payload.object.id);
    }
    return { status: 'ok' };
  }
}
