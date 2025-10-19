import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CakeDesign } from '../entities/cake-design.entity';
import { CakeSize } from '../entities/cake-size.entity';
import { CakeLayer } from '../entities/cake-layer.entity';
import { CakeFilling } from '../entities/cake-filling.entity';
import { CakeDecoration } from '../entities/cake-decoration.entity';
import { CreateCakeDesignDto, UpdateCakeDesignDto } from '../dto/cake-design.dto';
import {
  CreateCakeSizeDto,
  CreateCakeLayerDto,
  CreateCakeFillingDto,
  CreateCakeDecorationDto
} from '../dto/cake-components.dto';

@Injectable()
export class ConstructorService {
  constructor(
    @InjectRepository(CakeDesign)
    private readonly cakeDesignRepository: Repository<CakeDesign>,
    @InjectRepository(CakeSize)
    private readonly sizeRepository: Repository<CakeSize>,
    @InjectRepository(CakeLayer)
    private readonly layerRepository: Repository<CakeLayer>,
    @InjectRepository(CakeFilling)
    private readonly fillingRepository: Repository<CakeFilling>,
    @InjectRepository(CakeDecoration)
    private readonly decorationRepository: Repository<CakeDecoration>
  ) {}

  async create(createCakeDesignDto: CreateCakeDesignDto): Promise<CakeDesign> {
    // Преобразуем DTO в entity
    const cakeDesign = new CakeDesign();
    cakeDesign.name = createCakeDesignDto.name;
    cakeDesign.description = createCakeDesignDto.description;
    cakeDesign.price = createCakeDesignDto.price || 0;

    if (createCakeDesignDto.layers) {
      cakeDesign.layers = await Promise.all(
        createCakeDesignDto.layers.map(layerId =>
          this.layerRepository.findOneOrFail({ where: { id: layerId } })
        )
      );
    }

    return this.cakeDesignRepository.save(cakeDesign);
  }

  async findAll(): Promise<CakeDesign[]> {
    return this.cakeDesignRepository.find();
  }

  async findOne(id: string): Promise<CakeDesign> {
    const cakeDesign = await this.cakeDesignRepository.findOne({ where: { id } });
    if (!cakeDesign) {
      throw new NotFoundException('Cake design not found');
    }
    return cakeDesign;
  }

  async findByUserId(userId: string): Promise<CakeDesign[]> {
    return this.cakeDesignRepository.find({ where: { userId } });
  }

  async update(id: string, updateCakeDesignDto: UpdateCakeDesignDto): Promise<CakeDesign> {
    const cakeDesign = await this.findOne(id);
    const updatedCakeDesign = Object.assign(cakeDesign, updateCakeDesignDto);
    return this.cakeDesignRepository.save(updatedCakeDesign);
  }

  async remove(id: string): Promise<void> {
    const result = await this.cakeDesignRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Cake design not found');
    }
  }

  // Размеры тортов
  async createSize(dto: CreateCakeSizeDto): Promise<CakeSize> {
    const size = this.sizeRepository.create(dto);
    return this.sizeRepository.save(size);
  }

  async getAllSizes(): Promise<CakeSize[]> {
    return this.sizeRepository.find();
  }

  async getSize(id: string): Promise<CakeSize> {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    return size;
  }

  async toggleSizeActive(id: string, isActive: boolean): Promise<CakeSize> {
    const size = await this.getSize(id);
    size.isActive = isActive;
    return this.sizeRepository.save(size);
  }

  // Слои
  async createLayer(dto: CreateCakeLayerDto): Promise<CakeLayer> {
    const layer = this.layerRepository.create(dto);
    return this.layerRepository.save(layer);
  }

  async getAllLayers(): Promise<CakeLayer[]> {
    return this.layerRepository.find();
  }

  async getLayer(id: string): Promise<CakeLayer> {
    const layer = await this.layerRepository.findOne({ where: { id } });
    if (!layer) {
      throw new NotFoundException('Layer not found');
    }
    return layer;
  }

  async toggleLayerActive(id: string, isActive: boolean): Promise<CakeLayer> {
    const layer = await this.getLayer(id);
    layer.isActive = isActive;
    return this.layerRepository.save(layer);
  }

  // Начинки
  async createFilling(dto: CreateCakeFillingDto): Promise<CakeFilling> {
    const filling = this.fillingRepository.create(dto);
    return this.fillingRepository.save(filling);
  }

  async getAllFillings(): Promise<CakeFilling[]> {
    return this.fillingRepository.find();
  }

  async getFilling(id: string): Promise<CakeFilling> {
    const filling = await this.fillingRepository.findOne({ where: { id } });
    if (!filling) {
      throw new NotFoundException('Filling not found');
    }
    return filling;
  }

  async toggleFillingActive(id: string, isActive: boolean): Promise<CakeFilling> {
    const filling = await this.getFilling(id);
    filling.isActive = isActive;
    return this.fillingRepository.save(filling);
  }

  // Украшения
  async createDecoration(dto: CreateCakeDecorationDto): Promise<CakeDecoration> {
    const decoration = this.decorationRepository.create(dto);
    return this.decorationRepository.save(decoration);
  }

  async getAllDecorations(): Promise<CakeDecoration[]> {
    return this.decorationRepository.find();
  }

  async getDecoration(id: string): Promise<CakeDecoration> {
    const decoration = await this.decorationRepository.findOne({ where: { id } });
    if (!decoration) {
      throw new NotFoundException('Decoration not found');
    }
    return decoration;
  }

  async toggleDecorationActive(id: string, isActive: boolean): Promise<CakeDecoration> {
    const decoration = await this.getDecoration(id);
    decoration.isActive = isActive;
    return this.decorationRepository.save(decoration);
  }
}
