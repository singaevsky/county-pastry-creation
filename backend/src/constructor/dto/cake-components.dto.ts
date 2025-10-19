import { IsString, IsNumber, IsEnum, IsArray, IsOptional, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCakeSizeDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0)
  diameter!: number;

  @IsNumber()
  @Min(0)
  weight!: number;

  @IsNumber()
  @Min(1)
  servings!: number;

  @IsNumber()
  @Min(0)
  basePrice!: number;
}

export class CreateCakeLayerDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(['biscuit', 'meringue', 'shortcrust'])
  type!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergens?: string[];
}

export class CreateCakeFillingDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(['cream', 'jam', 'mousse', 'custard'])
  type!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergens?: string[];
}

export class CreateCakeDecorationDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(['topping', 'fruit', 'chocolate', 'fondant'])
  type!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergens?: string[];
}

class ComponentQuantityDto {
  @IsUUID()
  id!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class CalculatePriceDto {
  @IsUUID()
  sizeId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComponentQuantityDto)
  layers!: ComponentQuantityDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComponentQuantityDto)
  fillings!: ComponentQuantityDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComponentQuantityDto)
  decorations!: ComponentQuantityDto[];
}

export class PriceResponseDto {
  basePrice!: number;
  layersPrice!: number;
  fillingsPrice!: number;
  decorationsPrice!: number;
  totalPrice!: number;
  details: {
    size: { name: string; price: number };
    layers: Array<{ name: string; quantity: number; price: number }>;
    fillings: Array<{ name: string; quantity: number; price: number }>;
    decorations: Array<{ name: string; quantity: number; price: number }>;
  };
}
