// backend/src/recipes/products.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(getRepositoryToken(Product))
    private readonly repo: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.repo.findOne({ where: { slug, isActive: true } });
  }

  async findById(id: string): Promise<Product | null> {
    return this.repo.findOne({ where: { id, isActive: true } });
  }
}
