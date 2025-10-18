// backend/src/constructor/dto/create-constructor.dto.ts
import { IsString, IsOptional, IsNumber, IsArray, Max } from 'class-validator';

export class FillingDto {
  @IsNumber()
  id: number;

  @IsNumber()
  qty: number;
}

export class CreateConstructorDto {
  @IsString()
  name: string;

  @IsString()
  productType: string;

  @IsNumber()
  @IsOptional()
  @Max(5)
  tiers?: number;

  @IsOptional()
  options?: Record<string, any>;

  @IsOptional()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsArray()
  fillings?: FillingDto[];

  @IsNumber()
  @IsOptional()
  productId?: number; // для calculatePrice
}
