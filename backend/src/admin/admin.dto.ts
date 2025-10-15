import { IsDateString, IsOptional } from 'class-validator';

export class ChartQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string; // ISO format: YYYY-MM-DD

  @IsOptional()
  @IsDateString()
  endDate?: string; // ISO format: YYYY-MM-DD
}
