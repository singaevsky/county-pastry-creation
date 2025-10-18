import { Controller, Get, Post, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConstructorService } from './constructor.service';
import { RecipesService } from '../recipes/recipes.service';
import { ConstructorParamsDto } from './constructor.dto';

@Controller('constructor')
export class ConstructorController {
  constructor(
    private constructorService: ConstructorService,
    private recipesService: RecipesService,
  ) {}

  /**
   * Получить варианты изделий из БД
   */
  @Get('products')
  async getProducts() {
    return this.recipesService.getProducts();
  }

  /**
   * Получить начинки из БД
   */
  @Get('fillings')
  async getFillings() {
    return this.recipesService.getFillings();
  }

  /**
   * Загрузка до 3 фото дизайна
   */
  @Post('upload-design')
  @UseInterceptors(FilesInterceptor('designs', 3))
  async uploadDesign(@UploadedFiles() files: Express.Multer.File[]) {
    if (files.length > 3) throw new BadRequestException('Max 3 photos');
    // Логика сохранения файлов (e.g., в S3/local), return array URLs
    const urls = files.map(file => `/uploads/${file.filename}`); // Placeholder
    return { urls };
  }

  /**
   * Валидация и сериализация параметров
   */
  @Post('validate')
  async validate(@Body() dto: ConstructorParamsDto) {
    return this.constructorService.validateParams(dto);
  }
}
