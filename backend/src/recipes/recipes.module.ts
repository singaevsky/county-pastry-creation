import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Product,
  Filling,
  ProductsController,
  ProductsService,
  FillingsController,
  FillingsService
} from './index';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Filling])
  ],
  controllers: [ProductsController, FillingsController],
  providers: [ProductsService, FillingsService],
  exports: [ProductsService, FillingsService]
})
export class RecipesModule {}
