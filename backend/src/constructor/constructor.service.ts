import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstructorParamsDto } from './constructor.dto';
import { Product } from '../recipes/products.entity';

@Injectable()
export class ConstructorService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  /**
   * Валидация параметров на основе типа изделия
   */
  async validateParams(dto: ConstructorParamsDto): Promise<string> {
    const product = await this.productsRepository.findOneBy({ type: dto.productType });
    if (!product) throw new BadRequestException('Invalid product type');

    if (dto.tiers > product.maxTiers) throw new BadRequestException(`Max tiers: ${product.maxTiers}`);
    if (dto.fillings.length > product.maxFillings) throw new BadRequestException(`Max fillings: ${product.maxFillings}`);

    // Проверка начинок из БД (опционально: validate if fillings exist)

    return JSON.stringify(dto); // Сериализация для заказа
  }
}
