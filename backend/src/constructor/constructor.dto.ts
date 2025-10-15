import { IsEnum, IsArray, MaxLength, IsNumber, IsOptional, IsUrl } from 'class-validator';

enum ProductType {
  TORTE = 'torte',
  BENTO_TORTE = 'bento_torte',
  PIE_BERRY = 'pie_berry',
  PIE_MEAT = 'pie_meat',
  PIE_LENTEN = 'pie_lenten',
  ROULETTE = 'roulette',
  PASTRY = 'pastry',
  CUPCAKE = 'cupcake',
  OTHER = 'other',
}

export class ConstructorParamsDto {
  /**
   * Тип кондитерского изделия
   */
  @IsEnum(ProductType)
  productType: ProductType;

  /**
   * URLs до 3 фото дизайна
   */
  @IsOptional()
  @IsArray()
  @MaxLength(3)
  @IsUrl({}, { each: true })
  designPhotos?: string[];

  /**
   * До 2 цветов
   */
  @IsArray()
  @MaxLength(2)
  colors: string[];

  /**
   * До 5 начинок (из БД)
   */
  @IsArray()
  @MaxLength(5)
  fillings: string[];

  /**
   * Количество ярусов
   */
  @IsNumber()
  tiers: number;

  /**
   * URL эскиза
   */
  @IsOptional()
  @IsUrl()
  sketchUrl?: string;
}
