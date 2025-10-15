import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../recipes/recipes.entity';
import { PricingDto } from './pricing.dto'; // { recipeId, params: ConstructorParams, deliveryType }

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    // Inject suppliers, taxes, etc.
  ) {}

  async calculatePrice(dto: PricingDto): Promise<number> {
    const recipe = await this.recipesRepository.findOneBy({ id: dto.recipeId });
    if (!recipe) throw new BadRequestException('Recipe not found');

    let price = recipe.basePrice;
    // Добавки от params (e.g., tiers * coeff)
    price += dto.params.tiers * 100; // Example
    // Налоги: +20% НДС
    price *= 1.2;
    // Доставка: API call to delivery (later)
    price += 500; // Placeholder

    return price;
  }
}
