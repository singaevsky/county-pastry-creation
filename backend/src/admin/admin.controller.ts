import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminService } from './admin.service';
import { ChartQueryDto } from './admin.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'manager')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Получить данные для графика продаж (line chart)
   */
  @Get('charts/sales')
  async getSalesChart(@Query() query: ChartQueryDto) {
    return this.adminService.getSalesData(query.startDate, query.endDate);
  }

  /**
   * Получить данные для графика популярности начинок (pie chart)
   */
  @Get('charts/fillings-popularity')
  async getFillingsPopularity(@Query() query: ChartQueryDto) {
    return this.adminService.getFillingsPopularity(query.startDate, query.endDate);
  }

  /**
   * Получить данные для графика конверсии конструктора (funnel chart)
   */
  @Get('charts/constructor-conversion')
  async getConstructorConversion(@Query() query: ChartQueryDto) {
    return this.adminService.getConstructorConversion(query.startDate, query.endDate);
  }
}
