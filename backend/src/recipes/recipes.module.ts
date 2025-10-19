import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipes.entity';
import { Filling } from './fillings.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FillingsController } from './fillings.controller';
import { FillingsService } from './fillings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Filling])
  ],
  controllers: [ProductsController, FillingsController],
  providers: [ProductsService, FillingsService],
  exports: [ProductsService, FillingsService]
})
export class RecipesModule {}
