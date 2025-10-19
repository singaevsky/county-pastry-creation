import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CareersService } from './careers.service';
import { CreateVacancyDto, UpdateVacancyDto, CreateBenefitDto, UpdateBenefitDto } from './dto/careers.dto';

@ApiTags('careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все данные раздела вакансий' })
  @ApiResponse({ status: 200, description: 'Данные раздела вакансий' })
  async getCareersData() {
    return this.careersService.getCareersData();
  }

  @Put()
  @ApiOperation({ summary: 'Обновить данные раздела вакансий' })
  @ApiResponse({ status: 200, description: 'Данные раздела обновлены' })
  async updateCareersData(@Body() updateData: any) {
    return this.careersService.updateCareersData(updateData);
  }

  @Get('vacancies')
  @ApiOperation({ summary: 'Получить список вакансий' })
  @ApiResponse({ status: 200, description: 'Список вакансий' })
  async getVacancies(@Query('active') active?: boolean) {
    return this.careersService.getVacancies(active);
  }

  @Post('vacancies')
  @ApiOperation({ summary: 'Создать новую вакансию' })
  @ApiResponse({ status: 201, description: 'Вакансия создана' })
  async createVacancy(@Body() createVacancyDto: CreateVacancyDto) {
    return this.careersService.createVacancy(createVacancyDto);
  }

  @Put('vacancies/:id')
  @ApiOperation({ summary: 'Обновить вакансию' })
  @ApiResponse({ status: 200, description: 'Вакансия обновлена' })
  async updateVacancy(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.careersService.updateVacancy(id, updateVacancyDto);
  }

  @Delete('vacancies/:id')
  @ApiOperation({ summary: 'Удалить вакансию' })
  @ApiResponse({ status: 200, description: 'Вакансия удалена' })
  async deleteVacancy(@Param('id') id: string) {
    return this.careersService.deleteVacancy(id);
  }

  @Put('vacancies/:id/toggle')
  @ApiOperation({ summary: 'Переключить статус вакансии' })
  @ApiResponse({ status: 200, description: 'Статус вакансии изменен' })
  async toggleVacancyStatus(@Param('id') id: string) {
    return this.careersService.toggleVacancyStatus(id);
  }

  @Get('benefits')
  @ApiOperation({ summary: 'Получить список преимуществ' })
  @ApiResponse({ status: 200, description: 'Список преимуществ' })
  async getBenefits() {
    return this.careersService.getBenefits();
  }

  @Post('benefits')
  @ApiOperation({ summary: 'Создать новое преимущество' })
  @ApiResponse({ status: 201, description: 'Преимущество создано' })
  async createBenefit(@Body() createBenefitDto: CreateBenefitDto) {
    return this.careersService.createBenefit(createBenefitDto);
  }

  @Put('benefits/:id')
  @ApiOperation({ summary: 'Обновить преимущество' })
  @ApiResponse({ status: 200, description: 'Преимущество обновлено' })
  async updateBenefit(@Param('id') id: string, @Body() updateBenefitDto: UpdateBenefitDto) {
    return this.careersService.updateBenefit(id, updateBenefitDto);
  }

  @Delete('benefits/:id')
  @ApiOperation({ summary: 'Удалить преимущество' })
  @ApiResponse({ status: 200, description: 'Преимущество удалено' })
  async deleteBenefit(@Param('id') id: string) {
    return this.careersService.deleteBenefit(id);
  }
}
