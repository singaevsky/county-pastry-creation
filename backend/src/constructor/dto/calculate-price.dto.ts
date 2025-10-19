import { IsString, IsNumber, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ComponentDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsNumber()
  quantity!: number;
}

export class CakeDetailsDto {
  @ApiProperty()
  @IsNumber()
  base!: number;

  @ApiProperty()
  @IsNumber()
  layers!: number;

  @ApiProperty()
  @IsNumber()
  fillings!: number;

  @ApiProperty()
  @IsNumber()
  decorations!: number;
}

export class CalculatePriceDto {
  @ApiProperty()
  @IsString()
  sizeId!: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        quantity: { type: 'number' }
      }
    }
  })
  @ValidateNested({ each: true })
  @Type(() => ComponentDto)
  @IsArray()
  layers!: ComponentDto[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        quantity: { type: 'number' }
      }
    }
  })
  @ValidateNested({ each: true })
  @Type(() => ComponentDto)
  @IsArray()
  fillings!: ComponentDto[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        quantity: { type: 'number' }
      }
    },
    required: false
  })
  @ValidateNested({ each: true })
  @Type(() => ComponentDto)
  @IsArray()
  @IsOptional()
  decorations?: ComponentDto[];
}

export class PriceResponseDto {
  @ApiProperty()
  @IsNumber()
  totalPrice!: number;

  @ApiProperty()
  @IsString()
  currency!: string;

  @ApiProperty({ type: CakeDetailsDto })
  @ValidateNested()
  @Type(() => CakeDetailsDto)
  details!: CakeDetailsDto;
}
