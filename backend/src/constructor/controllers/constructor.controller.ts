import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, NotFoundException } from '@nestjs/common';
import { ConstructorService } from '../services/constructor.service';
import { PriceCalculatorService } from '../services/price-calculator.service';
import { CreateCakeDesignDto, UpdateCakeDesignDto } from '../dto/cake-design.dto';
import { CakeDesign } from '../entities/cake-design.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CalculatePriceDto, PriceResponseDto } from '../dto/calculate-price.dto';
import {
  CreateCakeSizeDto,
  CreateCakeLayerDto,
  CreateCakeFillingDto,
  CreateCakeDecorationDto
} from '../dto/cake-components.dto';

@Controller('constructor')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConstructorController {
  constructor(
    private readonly constructorService: ConstructorService,
    private readonly priceCalculatorService: PriceCalculatorService,
  ) {}

  // Дизайны тортов
  @Post()
  async create(@Body() createCakeDesignDto: CreateCakeDesignDto, @Request() req: any): Promise<CakeDesign> {
    const designData = { ...createCakeDesignDto };
    designData.userId = req.user.id;

    const priceResult = await this.priceCalculatorService.calculatePrice({
      sizeId: createCakeDesignDto.sizeId,
      layers: createCakeDesignDto.layers.map(id => ({ id, quantity: 1 })),
      fillings: [],
      decorations: (createCakeDesignDto.decorations || []).map(id => ({ id, quantity: 1 }))
    });

    const design = await this.constructorService.create({
      ...designData,
      price: priceResult.totalPrice
    });

    if (!design) {
      throw new Error('Failed to create cake design');
    }

    return design;
  }  @Get()
  async findAll(): Promise<CakeDesign[]> {
    return this.constructorService.findAll();
  }

  @Get('user')
  async findUserDesigns(@Request() req: any): Promise<CakeDesign[]> {
    return this.constructorService.findByUserId(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CakeDesign> {
    return this.constructorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCakeDesignDto: UpdateCakeDesignDto,
  ): Promise<CakeDesign> {
    if (updateCakeDesignDto.layers || updateCakeDesignDto.decorations) {
      const currentDesign = await this.constructorService.findOne(id);
      if (!currentDesign) {
        throw new NotFoundException('Cake design not found');
      }

      const priceResult = await this.priceCalculatorService.calculatePrice({
        sizeId: (updateCakeDesignDto.sizeId || currentDesign.sizeId) as string,
        layers: (updateCakeDesignDto.layers || currentDesign.layers).map(layerId => ({
          id: typeof layerId === 'string' ? layerId : layerId.id,
          quantity: 1
        })),
        fillings: [],
        decorations: (updateCakeDesignDto.decorations || currentDesign.decorations || []).map(decorId => ({
          id: typeof decorId === 'string' ? decorId : decorId.id,
          quantity: 1
        }))
      });
      updateCakeDesignDto = { ...updateCakeDesignDto, price: priceResult.totalPrice };
    }
    return this.constructorService.update(id, updateCakeDesignDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.constructorService.remove(id);
  }

  // Расчет цены
  @Post('calculate-price')
  async calculatePrice(@Body() priceDto: CalculatePriceDto): Promise<PriceResponseDto> {
    return this.priceCalculatorService.calculatePrice(priceDto);
  }

  // Размеры тортов
  @Post('sizes')
  @Roles('admin')
  async createSize(@Body() dto: CreateCakeSizeDto) {
    return this.constructorService.createSize(dto);
  }

  @Get('sizes')
  async getAllSizes() {
    return this.constructorService.getAllSizes();
  }

  @Get('sizes/:id')
  async getSize(@Param('id') id: string) {
    return this.constructorService.getSize(id);
  }

  // Слои
  @Post('layers')
  @Roles('admin')
  async createLayer(@Body() dto: CreateCakeLayerDto) {
    return this.constructorService.createLayer(dto);
  }

  @Get('layers')
  async getAllLayers() {
    return this.constructorService.getAllLayers();
  }

  @Get('layers/:id')
  async getLayer(@Param('id') id: string) {
    return this.constructorService.getLayer(id);
  }

  // Начинки
  @Post('fillings')
  @Roles('admin')
  async createFilling(@Body() dto: CreateCakeFillingDto) {
    return this.constructorService.createFilling(dto);
  }

  @Get('fillings')
  async getAllFillings() {
    return this.constructorService.getAllFillings();
  }

  @Get('fillings/:id')
  async getFilling(@Param('id') id: string) {
    return this.constructorService.getFilling(id);
  }

  // Украшения
  @Post('decorations')
  @Roles('admin')
  async createDecoration(@Body() dto: CreateCakeDecorationDto) {
    return this.constructorService.createDecoration(dto);
  }

  @Get('decorations')
  async getAllDecorations() {
    return this.constructorService.getAllDecorations();
  }

  @Get('decorations/:id')
  async getDecoration(@Param('id') id: string) {
    return this.constructorService.getDecoration(id);
  }

  // Управление активностью
  @Put('sizes/:id/toggle')
  @Roles('admin')
  async toggleSizeActive(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.constructorService.toggleSizeActive(id, isActive);
  }

  @Put('layers/:id/toggle')
  @Roles('admin')
  async toggleLayerActive(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.constructorService.toggleLayerActive(id, isActive);
  }

  @Put('fillings/:id/toggle')
  @Roles('admin')
  async toggleFillingActive(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.constructorService.toggleFillingActive(id, isActive);
  }

  @Put('decorations/:id/toggle')
  @Roles('admin')
  async toggleDecorationActive(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.constructorService.toggleDecorationActive(id, isActive);
  }
}
