import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AdminService } from './admin.service';
import { ChartQueryDto } from './admin.dto';
// ... imports
@Roles('admin', 'baker') // Updated: baker edits fillings/products
@Get('fillings')
async getFillings() { /* ... */ }
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'manager')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles('admin', 'baker') // Обновлено: baker редактирует fillings/products
  @Get('fillings')
  async getFillings() {
    return this.adminService.getFillings();
  }

  @Roles('admin', 'baker')
  @Post('fillings')
  async createFilling(@Body() dto: { name: string; cost: number }) {
    return this.adminService.createFilling(dto);
  }

  // Аналогично для products, charts, etc.
  @Roles('admin', 'sales_manager')
  @Get('charts/sales')
  async getSalesChart(@Query() query: ChartQueryDto) {
    return this.adminService.getSalesData(query.startDate, query.endDate);
  }

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
