// backend/src/recipes/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  async findBySlug(slug: string): Promise<Product> {
    return this.repo.findOne({ where: { slug, isActive: true } });
  }
}
