import { IsEnum, IsArray, MaxLength, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { ProductType } from '../common/types';

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
