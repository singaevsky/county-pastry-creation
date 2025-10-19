import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from '../constructor/dto/create-order.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../recipes/products.service';
import { PriceCalculatorService } from '../constructor/services/price-calculator.service';
import { OrderStatus, PaymentStatus } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly priceCalculator: PriceCalculatorService,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productsService.findBySlug(dto.productSlug);
    if (!product) throw new NotFoundException('Product not found');

    if (!dto.fillings || dto.fillings.length === 0) {
      throw new BadRequestException('At least one filling must be selected');
    }

    const fillings = dto.fillings.map(f => ({
      id: f.fillingId.toString(),
      name: `Filling ${f.fillingId}`, // Replace with actual filling name from service
      quantity: f.qty,
      price: 0, // Replace with actual price calculation
    }));

    const order = this.orderRepo.create({
      clientId: userId,
      status: 'PENDING' as OrderStatus,
      paymentStatus: 'PENDING' as PaymentStatus,
      totalAmount: dto.quantity * product.price,
      items: fillings
    });

    return this.orderRepo.save(order);

  }
}
