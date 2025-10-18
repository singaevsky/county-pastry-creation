import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderDto } from '../constructor/dto/create-order.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../recipes/products.service';
import { PriceCalculatorService } from '../constructor/services/price-calculator.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly priceCalculator: PriceCalculatorService,
  ) {}

  async create(userId: number, dto: CreateOrderDto) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productsService.findBySlug(dto.productSlug);
    if (!product) throw new NotFoundException('Product not found');

    if (!dto.fillings || dto.fillings.length === 0) {
      throw new BadRequestException('At least one filling must be selected');
    }

    const totalPrice = this.priceCalculator.calculate(product, dto.fillings);

    const order = this.orderRepo.create({
      user,
      product,
      fillings: dto.fillings,
      quantity: dto.quantity,
      totalPrice,
      status: 'pending',
    });

    return this.orderRepo.save(order);
  }
}
