// backend/src/recipes/fillings.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filling } from './fillings.entity';

@Injectable()
export class FillingsService {
  constructor(
    @InjectRepository(Filling)
    private readonly repo: Repository<Filling>,
  ) {}

  async findAll(): Promise<Filling[]> {
    return this.repo.find({ where: { isActive: true } });
  }

  async findById(id: number): Promise<Filling> {
    return this.repo.findOne({ where: { id, isActive: true } });
  }
}
