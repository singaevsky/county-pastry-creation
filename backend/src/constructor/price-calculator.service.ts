// backend/src/constructor/price-calculator.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { CreateConstructorDto } from './dto/create-constructor.dto';

@Injectable()
export class PriceCalculatorService {
  private readonly logger = new Logger(PriceCalculatorService.name);

  async calculate(dto: CreateConstructorDto): Promise<number> {
    // Простая логика: базовая цена + за слои + за начинку + за декор
    let price = 0;

    // base by productType
    switch (dto.productType) {
      case 'cake':
        price += 1500;
        break;
      case 'cupcake':
        price += 200;
        break;
      default:
        price += 500;
    }

    // tiers
    if (dto.tiers) {
      price += dto.tiers * 800;
    }

    // fillings: dto.options.fillings expected [{ id, qty }]
    if (dto.options && Array.isArray(dto.options.fillings)) {
      for (const f of dto.options.fillings) {
        // for simplicity: each filling adds 200 per unit — in prod query fillings table for price
        price += (f.qty || 1) * 200;
      }
    }

    // decorations / custom content
    if (dto.options && dto.options.customText) {
      price += 150;
    }

    // rounding
    price = Math.round(price);

    this.logger.debug(`Calculated price ${price} for DTO ${JSON.stringify(dto)}`);
    return price;
  }
}
