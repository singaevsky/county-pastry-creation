import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CakeSize } from '../entities/cake-size.entity';
import { CakeLayer } from '../entities/cake-layer.entity';
import { CakeFilling } from '../entities/cake-filling.entity';
import { CakeDecoration } from '../entities/cake-decoration.entity';
import { CalculatePriceDto, PriceResponseDto } from '../dto/calculate-price.dto';
import { Product, Filling } from '../interfaces/legacy-types';

@Injectable()
export class PriceCalculatorService {
  constructor(
    @InjectRepository(CakeSize)
    private readonly sizeRepository: Repository<CakeSize>,
    @InjectRepository(CakeLayer)
    private readonly layerRepository: Repository<CakeLayer>,
    @InjectRepository(CakeFilling)
    private readonly fillingRepository: Repository<CakeFilling>,
    @InjectRepository(CakeDecoration)
    private readonly decorationRepository: Repository<CakeDecoration>,
  ) {}

  // Legacy method for backward compatibility
  calculate(
    product: Product,
    fillings: Array<{ filling: Filling; qty: number }>,
    options?: { designComplexity?: number }
  ): number {
    let price = product.basePrice || 0;

    for (const f of fillings) {
      price += (f.filling?.price || 0) * (f.qty || 1);
    }

    if (options?.designComplexity) {
      price += product.basePrice * (options.designComplexity * 0.05);
    }

    return Math.round(price * 100) / 100;
  }

  async calculatePrice(dto: CalculatePriceDto): Promise<PriceResponseDto> {
    let basePrice = 0;
    let layersPrice = 0;
    let fillingsPrice = 0;
    let decorationsPrice = 0;

    // Calculate base price from size
    const size = await this.sizeRepository.findOne({ where: { id: dto.sizeId } });
    if (!size) throw new NotFoundException('Size not found');
    basePrice = size.price;

    // Calculate layers price
    for (const layer of dto.layers) {
      const layerEntity = await this.layerRepository.findOne({ where: { id: layer.id } });
      if (!layerEntity) continue;
      layersPrice += layerEntity.price * layer.quantity;
    }

    // Calculate fillings price
    for (const filling of dto.fillings) {
      const fillingEntity = await this.fillingRepository.findOne({ where: { id: filling.id } });
      if (!fillingEntity) continue;
      fillingsPrice += fillingEntity.price * filling.quantity;
    }

    // Calculate decorations price
    if (dto.decorations) {
      for (const decoration of dto.decorations) {
        const decorationEntity = await this.decorationRepository.findOne({
          where: { id: decoration.id }
        });
        if (!decorationEntity) continue;
        decorationsPrice += decorationEntity.price * decoration.quantity;
      }
    }

    const totalPrice = basePrice + layersPrice + fillingsPrice + decorationsPrice;

    return {
      totalPrice: Math.round(totalPrice * 100) / 100,
      currency: 'RUB',
      details: {
        base: basePrice,
        layers: layersPrice,
        fillings: fillingsPrice,
        decorations: decorationsPrice
      }
    };
  }
}
