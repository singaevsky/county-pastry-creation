import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { Vacancy } from './entities/vacancy.entity';
import { Benefit } from './entities/benefit.entity';
import { CareersSection } from './entities/careers-section.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy, Benefit, CareersSection])
  ],
  controllers: [CareersController],
  providers: [CareersService],
  exports: [CareersService]
})
export class CareersModule {}
