// backend/src/recipes/fillings.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { FillingsService } from './fillings.service';
import { Filling } from './fillings.entity';

@Controller('fillings')
export class FillingsController {
  constructor(private readonly fillingsService: FillingsService) {}

  @Get()
  async getAll(): Promise<Filling[]> {
    return this.fillingsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Filling> {
    return this.fillingsService.findById(id);
  }
}
