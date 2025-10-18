import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersDto } from './orders.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/types';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Создать заказ (для client)
   */
  @Roles(Role.CLIENT)
  @Post('create')
  async createOrder(@Body() dto: OrdersDto) {
    return this.ordersService.createOrder(dto);
  }

  /**
   * Получить заказ(ы): список или по ID (для sales_manager, admin)
   */
  @Roles(Role.SALES_MANAGER, Role.ADMIN)
  @Get(':id?')
  async getOrders(@Param('id', ParseIntPipe) id?: number) {
    if (id) {
      return this.ordersService.getOrderById(id);
    }
    return this.ordersService.getAllOrders();
  }

  /**
   * Обновить статус заказа (для sales_manager, admin)
   */
  @Roles(Role.SALES_MANAGER, Role.ADMIN)
  @Post(':id/status')
  async updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
