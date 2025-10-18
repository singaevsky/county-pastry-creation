// backend/src/constructor/services/price-calculator.service.ts
import { Injectable } from '@nestjs/common';
import { Product } from '../../recipes/products.entity';
import { Filling } from '../../recipes/fillings.entity';

@Injectable()
export class PriceCalculatorService {
  calculate(product: Product, fillings: { filling: Filling; qty: number }[], options?: { designComplexity?: number }) {
    let price = product.basePrice || 0;

    for (const f of fillings) {
      price += (f.filling?.price || 0) * (f.qty || 1);
    }

    if (options?.designComplexity) {
      price += product.basePrice * (options.designComplexity * 0.05);
    }

    return Math.round(price * 100) / 100;
  }
}
