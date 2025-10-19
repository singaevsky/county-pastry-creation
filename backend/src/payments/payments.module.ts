import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { YookassaGateway } from './gateways/yookassa.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../orders/orders.module';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    OrdersModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, YookassaGateway],
  exports: [PaymentsService]
})
export class PaymentsModule {}
