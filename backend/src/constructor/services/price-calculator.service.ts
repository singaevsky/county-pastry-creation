// backend/src/constructor/services/price-calculator.service.ts
import { Injectable } from '@nestjs/common';
import { Product } from '../../products/product.entity';
import { Filling } from '../../fillings/filling.entity';

@Injectable()
export class PriceCalculatorService {
  // Простая формула: базовая цена продукта + sum(filling.price * qty) + design surcharge
  calculate(product: Product, fillings: { filling: Filling; qty: number }[], options?: { designComplexity?: number }) {
    let price = product.basePrice || 0;

    for (const f of fillings) {
      price += (f.filling?.price || 0) * (f.qty || 1);
    }

    if (options?.designComplexity) {
      // small surcharge per complexity level (example)
      price += product.basePrice * (options.designComplexity * 0.05);
    }

    // rounding
    return Math.round(price * 100) / 100;
  }
}
