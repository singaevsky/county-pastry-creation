import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filling } from './fillings.entity';

@Injectable()
export class FillingsService {
  constructor(@InjectRepository(Filling) private readonly fillingRepo: Repository<Filling>) {}

  async findAll() {
    return this.fillingRepo.find({ where: { isActive: true } });
  }
}
