// backend/src/constructor/constructor.service.ts
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstructorEntity } from './entities/constructor.entity';
import { Repository } from 'typeorm';
import { PriceCalculatorService } from './price-calculator.service';
import { DesignUploadService } from '../upload/design.service';
import { CreateConstructorDto } from './dto/create-constructor.dto';

@Injectable()
export class ConstructorService {
  private readonly logger = new Logger(ConstructorService.name);

  constructor(
    @InjectRepository(ConstructorEntity)
    private readonly repo: Repository<ConstructorEntity>,
    private readonly priceCalculator: PriceCalculatorService,
    private readonly designUpload: DesignUploadService,
  ) {}

  async createDraft(userId: number, dto: CreateConstructorDto, files?: Express.Multer.File[]) {
    // validate dto consistency (example: tiers)
    if (dto.tiers && dto.tiers > 5) {
      throw new BadRequestException('Maximum tiers is 5');
    }

    // upload images (if any) via DesignUploadService
    const uploaded = [];
    if (files && files.length) {
      for (const f of files) {
        const url = await this.designUpload.uploadFile(f);
        uploaded.push(url);
      }
    }

    // calculate price via dedicated service
    const price = await this.priceCalculator.calculate(dto);

    const entity = this.repo.create({
      userId,
      name: dto.name,
      productType: dto.productType,
      options: dto.options || {},
      designImages: uploaded,
      price,
      status: 'draft',
      metadata: dto.metadata || {},
    });

    return this.repo.save(entity);
  }

  async finalizeDraft(draftId: number) {
    const draft = await this.repo.findOne({ where: { id: draftId } });
    if (!draft) throw new BadRequestException('Draft not found');
    draft.status = 'pending_payment';
    return this.repo.save(draft);
  }

  // other methods: updateDraft, getDraftsForUser, fetchById etc.
}
