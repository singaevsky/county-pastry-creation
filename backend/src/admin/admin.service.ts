import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Order } from '../../orders/entities/order.entity'; // Assume shared entity
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private getDateRange(startDate?: string, endDate?: string): { start: Date; end: Date } {
    const now = new Date();
    const start = startDate ? new Date(startDate) : new Date(now.setMonth(now.getMonth() - 1));
    const end = endDate ? new Date(endDate) : new Date();
    if (start > end) throw new BadRequestException('Invalid date range');
    return { start, end };
  }

  /**
   * Данные для графика продаж: сумма по датам
   * @returns [{ date: 'YYYY-MM-DD', total: number }]
   */
  async getSalesData(startDate?: string, endDate?: string): Promise<{ date: string; total: number }[]> {
    const cacheKey = `sales:${startDate || 'default'}-${endDate || 'default'}`;
    const cached = await this.cacheManager.get<{ date: string; total: number }[]>(cacheKey);
    if (cached) return cached;

    const { start, end } = this.getDateRange(startDate, endDate);
    const sales = await this.ordersRepository
      .createQueryBuilder('order')
      .select("TO_CHAR(order.createdAt, 'YYYY-MM-DD') AS date, SUM(order.amount) AS total")
      .where('order.status = :status AND order.createdAt BETWEEN :start AND :end', { status: 'paid', start, end })
      .groupBy("date")
      .orderBy("date", "ASC")
      .getRawMany();

    const result = sales.map((item) => ({ date: item.date, total: parseFloat(item.total) || 0 }));
    await this.cacheManager.set(cacheKey, result, { ttl: 3600 }); // 1 hour
    return result;
  }

  /**
   * Данные для графика популярности начинок: количество упоминаний
   * @returns [{ name: string, value: number }]
   */
  async getFillingsPopularity(startDate?: string, endDate?: string): Promise<{ name: string; value: number }[]> {
    const cacheKey = `fillings:${startDate || 'default'}-${endDate || 'default'}`;
    const cached = await this.cacheManager.get<{ name: string; value: number }[]>(cacheKey);
    if (cached) return cached;

    const { start, end } = this.getDateRange(startDate, endDate);
    const fillings = await this.ordersRepository
      .createQueryBuilder('order')
      .select("jsonb_array_elements_text(order.params->'fillings') AS filling, COUNT(*) AS count")
      .where('order.status = :status AND order.createdAt BETWEEN :start AND :end', { status: 'paid', start, end })
      .groupBy("filling")
      .orderBy("count", "DESC")
      .getRawMany();

    const result = fillings.map((item) => ({ name: item.filling, value: parseInt(item.count, 10) }));
    await this.cacheManager.set(cacheKey, result, { ttl: 3600 });
    return result;
  }

  /**
   * Данные для графика конверсии конструктора: funnel (просмотры → шаги → заказы)
   * @returns [{ name: 'Step', value: number }] (e.g., Views, Step1, Step2, Orders)
   */
  async getConstructorConversion(startDate?: string, endDate?: string): Promise<{ name: string; value: number }[]> {
    const cacheKey = `conversion:${startDate || 'default'}-${endDate || 'default'}`;
    const cached = await this.cacheManager.get<{ name: string; value: number }[]>(cacheKey);
    if (cached) return cached;

    const { start, end } = this.getDateRange(startDate, endDate);

    // Placeholder logic: Assume logs or orders for steps; in real - use separate logs entity
    const views = await this.ordersRepository.count({ where: { createdAt: Between(start, end) } }); // Proxy for views
    const stepCompleted = Math.floor(views * 0.7); // Mock; replace with real query
    const orders = await this.ordersRepository.count({ where: { status: 'paid', createdAt: Between(start, end) } });

    const result = [
      { name: 'Просмотры конструктора', value: views },
      { name: 'Завершенные шаги', value: stepCompleted },
      { name: 'Созданные заказы', value: orders },
    ];
    await this.cacheManager.set(cacheKey, result, { ttl: 3600 });
    return result;
  }
}
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Order } from '../../orders/order.entity';
import { Filling } from '../../recipes/fillings.entity';
import { Product } from '../../recipes/products.entity';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Filling) private fillingsRepository: Repository<Filling>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // ... существующие методы (getSalesData, etc.)

  async getFillings(): Promise<Filling[]> {
    return this.fillingsRepository.find();
  }

  async createFilling(dto: { name: string; cost: number }): Promise<Filling> {
    const existing = await this.fillingsRepository.findOneBy({ name: dto.name });
    if (existing) throw new BadRequestException('Filling exists');
    const filling = this.fillingsRepository.create(dto);
    return this.fillingsRepository.save(filling);
  }

  async updateFilling(id: number, dto: { name?: string; cost?: number }): Promise<Filling> {
    const filling = await this.fillingsRepository.findOneBy({ id });
    if (!filling) throw new BadRequestException('Filling not found');
    Object.assign(filling, dto);
    return this.fillingsRepository.save(filling);
  }

  async deleteFilling(id: number): Promise<void> {
    await this.fillingsRepository.delete(id);
  }

  // Аналогично для products
  async getProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async createProduct(dto: { type: string; maxTiers: number; maxFillings: number }): Promise<Product> {
    const product = this.productsRepository.create(dto);
    return this.productsRepository.save(product);
  }

  // ... update/delete
}
