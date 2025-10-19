import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class LayerCustomizationDto {
  @IsNumber()
  position!: number;

  @IsOptional()
  @IsUUID()
  fillingId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class DecorationCustomizationDto {
  @IsNumber()
  quantity!: number;

  @IsEnum(['top', 'side', 'both'])
  placement!: 'top' | 'side' | 'both';

  @IsOptional()
  @IsString()
  notes?: string;
}

class CustomizationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LayerCustomizationDto)
  layers!: LayerCustomizationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DecorationCustomizationDto)
  decorations!: DecorationCustomizationDto[];
}

export class CreateCakeDesignDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsUUID()
  sizeId!: string;

  @IsArray()
  @IsUUID("all", { each: true })
  layers!: string[];

  @IsOptional()
  @IsArray()
  @IsUUID("all", { each: true })
  decorations?: string[];

  @ValidateNested()
  @Type(() => CustomizationDto)
  customization!: CustomizationDto;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsUUID()
  userId!: string;
}

export class UpdateCakeDesignDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  sizeId?: string;

  @IsOptional()
  @IsArray()
  @IsUUID("all", { each: true })
  layers?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID("all", { each: true })
  decorations?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CustomizationDto)
  customization?: CustomizationDto;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
