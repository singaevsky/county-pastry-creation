import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class FillingItem {
  @IsNumber()
  fillingId!: number;

  @IsNumber()
  @Min(1)
  qty!: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  productSlug!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FillingItem)
  fillings!: FillingItem[];

  @IsNumber()
  @Min(1)
  quantity!: number;
}
