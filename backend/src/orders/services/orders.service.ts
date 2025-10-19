import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { OrderStatus, PaymentStatus } from '../interfaces/order.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly usersService: UsersService,
  ) {}

  async create(clientId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const client = await this.usersService.findOne(clientId);

    const totalAmount = createOrderDto.items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    const order = this.orderRepo.create({
      ...createOrderDto,
      clientId,
      totalAmount,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
    });

    const savedOrder = await this.orderRepo.save(order);
    const fullOrder = await this.orderRepo.findOne({
      where: { id: savedOrder.id },
      relations: ['client', 'baker']
    });

    if (!fullOrder) {
      throw new NotFoundException(`Order with ID "${savedOrder.id}" not found`);
    }

    return fullOrder;
  }

  async findAll(filters?: FindOptionsWhere<Order>): Promise<Order[]> {
    return this.orderRepo.find({
      where: filters,
      relations: ['client', 'baker'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['client', 'baker']
    });
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return order;
  }

  async findByClient(clientId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { clientId },
      relations: ['baker'],
      order: { createdAt: 'DESC' }
    });
  }

  async findByBaker(bakerId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { bakerId },
      relations: ['client'],
      order: { createdAt: 'DESC' }
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.bakerId) {
      const baker = await this.usersService.findOne(updateOrderDto.bakerId);
      if (baker.role !== 'baker') {
        throw new BadRequestException('Assigned user must be a baker');
      }
    }

    // Обработка изменения статуса
    if (updateOrderDto.status) {
      switch (updateOrderDto.status) {
        case OrderStatus.COMPLETED:
          order.completedAt = new Date();
          break;
        case OrderStatus.CANCELLED:
          order.cancelledAt = new Date();
          break;
      }
    }

    Object.assign(order, updateOrderDto);
    return this.orderRepo.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Can only delete pending orders');
    }
    await this.orderRepo.remove(order);
  }

  async assignBaker(orderId: string, bakerId: string): Promise<Order> {
    const order = await this.findOne(orderId);
    const baker = await this.usersService.findOne(bakerId);

    if (baker.role !== 'baker') {
      throw new BadRequestException('Assigned user must be a baker');
    }

    order.bakerId = bakerId;
    order.status = OrderStatus.CONFIRMED;
    return this.orderRepo.save(order);
  }

  async updatePaymentStatus(orderId: string, status: PaymentStatus): Promise<Order> {
    const order = await this.findOne(orderId);
    order.paymentStatus = status;

    if (status === PaymentStatus.PAID) {
      if (order.status === OrderStatus.PENDING) {
        order.status = OrderStatus.CONFIRMED;
      }
    }

    return this.orderRepo.save(order);
  }
}
