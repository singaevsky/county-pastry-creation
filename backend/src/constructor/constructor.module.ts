import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructorService } from './services/constructor.service';
import { PriceCalculatorService } from './services/price-calculator.service';
import { ConstructorController } from './controllers/constructor.controller';
import { CakeDesign } from './entities/cake-design.entity';
import { CakeSize } from './entities/cake-size.entity';
import { CakeLayer } from './entities/cake-layer.entity';
import { CakeFilling } from './entities/cake-filling.entity';
import { CakeDecoration } from './entities/cake-decoration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CakeDesign,
      CakeSize,
      CakeLayer,
      CakeFilling,
      CakeDecoration
    ])
  ],
  controllers: [ConstructorController],
  providers: [ConstructorService, PriceCalculatorService],
  exports: [ConstructorService, PriceCalculatorService],
})
export class ConstructorModule {}
