import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrdersDto } from './orders.dto';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private paymentsService: PaymentsService,
  ) {}

  async createOrder(dto: OrdersDto): Promise<{ orderId: number; paymentId: string }> {
    const order = this.ordersRepository.create({
      userId: dto.userId,
      params: dto.params,
      amount: dto.amount,
      status: 'pending',
    });
    const savedOrder = await this.ordersRepository.save(order);

    // 50% предоплата
    const payment = await this.paymentsService.createPayment(savedOrder.id, savedOrder.amount);
    return { orderId: savedOrder.id, paymentId: payment.paymentId };
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) throw new BadRequestException('Order not found');
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (!order) throw new BadRequestException('Order not found');
    order.status = status;
    return this.ordersRepository.save(order);
  }
}
