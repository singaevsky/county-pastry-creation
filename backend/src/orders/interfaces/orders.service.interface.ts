import { CreateOrderDto } from '../dto/order.dto';

export interface IOrdersService {
  create(userId: string, dto: CreateOrderDto): Promise<any>;
  findByClient(clientId: string): Promise<any[]>;
  findByBaker(bakerId: string): Promise<any[]>;
  updateStatus(orderId: string, status: string): Promise<any>;
  updatePaymentStatus(orderId: string, status: string): Promise<any>;
}
