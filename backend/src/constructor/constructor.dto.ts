import { IsNumber, IsString, IsArray, MaxLength, IsOptional } from 'class-validator';

export class ConstructorParamsDto {
  @IsOptional()
  @IsString()
  sketchUrl?: string; // Загруженный эскиз

  @IsArray()
  @MaxLength(2)
  colors!: string[];

  @IsArray()
  @MaxLength(3)
  fillings!: string[];

  @IsNumber()
  tiers!: number;
}
