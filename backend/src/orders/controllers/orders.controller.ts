import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../dto/order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Order } from '../entities/order.entity';
import { PaymentStatus } from '../interfaces/order.interface';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('client', 'admin')
  async create(
    @Request() req,
    @Body() createOrderDto: CreateOrderDto
  ): Promise<OrderResponseDto> {
    const order = await this.ordersService.create(req.user.id, createOrderDto);
    return this.mapToResponseDto(order);
  }

  @Get()
  @Roles('admin')
  async findAll(): Promise<OrderResponseDto[]> {
    const orders = await this.ordersService.findAll();
    return orders.map(order => this.mapToResponseDto(order));
  }

  @Get('my-orders')
  async findMyOrders(@Request() req): Promise<OrderResponseDto[]> {
    const orders = await this.ordersService.findByClient(req.user.id);
    return orders.map(order => this.mapToResponseDto(order));
  }

  @Get('baker-orders')
  @Roles('baker')
  async findBakerOrders(@Request() req): Promise<OrderResponseDto[]> {
    const orders = await this.ordersService.findByBaker(req.user.id);
    return orders.map(order => this.mapToResponseDto(order));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    const order = await this.ordersService.findOne(id);
    return this.mapToResponseDto(order);
  }

  @Put(':id')
  @Roles('admin', 'baker')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<OrderResponseDto> {
    const order = await this.ordersService.update(id, updateOrderDto);
    return this.mapToResponseDto(order);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<void> {
    await this.ordersService.remove(id);
  }

  @Put(':id/assign-baker/:bakerId')
  @Roles('admin', 'manager')
  async assignBaker(
    @Param('id') id: string,
    @Param('bakerId') bakerId: string
  ): Promise<OrderResponseDto> {
    const order = await this.ordersService.assignBaker(id, bakerId);
    return this.mapToResponseDto(order);
  }

  @Put(':id/payment-status')
  @Roles('admin')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body('status') status: PaymentStatus
  ): Promise<OrderResponseDto> {
    const order = await this.ordersService.updatePaymentStatus(id, status);
    return this.mapToResponseDto(order);
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    const { client, baker, ...orderData } = order;
    return {
      ...orderData,
      clientName: client?.firstName ? `${client.firstName} ${client.lastName}` : undefined,
      bakerName: baker?.firstName ? `${baker.firstName} ${baker.lastName}` : undefined,
    } as OrderResponseDto;
  }
}
