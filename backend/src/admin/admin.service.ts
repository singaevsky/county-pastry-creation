import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../recipes/products.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async getAllUsers() {
    return this.usersService.findAll();
  }

  async getAllOrders() {
    return this.ordersService.findAll();
  }

  async getAllProducts() {
    return this.productsService.findAll();
  }
}
