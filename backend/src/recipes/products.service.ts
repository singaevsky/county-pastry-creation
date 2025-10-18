import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>) {}

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { slug, isActive: true } });
    if (!product) throw new NotFoundException(`Product "${slug}" not found`);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find({ where: { isActive: true } });
  }
}
