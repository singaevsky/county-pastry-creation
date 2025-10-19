// backend/src/recipes/products.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<Product | null> {
    return this.productsService.findBySlug(slug);
  }
}
