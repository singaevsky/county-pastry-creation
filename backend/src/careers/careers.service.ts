import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { Benefit } from './entities/benefit.entity';
import { CareersSection } from './entities/careers-section.entity';
import { CreateVacancyDto, UpdateVacancyDto, CreateBenefitDto, UpdateBenefitDto } from './dto/careers.dto';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    @InjectRepository(Benefit)
    private benefitRepository: Repository<Benefit>,
    @InjectRepository(CareersSection)
    private careersSectionRepository: Repository<CareersSection>,
  ) {}

  async getCareersData() {
    const [vacancies, benefits, section] = await Promise.all([
      this.vacancyRepository.find({ where: { isActive: true } }),
      this.benefitRepository.find({ where: { isActive: true } }),
      this.careersSectionRepository.findOne({ where: { id: 1 } })
    ]);

    return {
      section: section || {
        heroTitle: 'Вакансии',
        heroDescription: 'Присоединяйтесь к команде профессионалов!',
        contactTitle: 'Не нашли подходящую вакансию?',
        contactDescription: 'Отправьте нам свое резюме!',
        contactButtonText: 'Связаться с нами',
        contactButtonLink: '/contact'
      },
      vacancies,
      benefits
    };
  }

  async updateCareersData(updateData: any) {
    let section = await this.careersSectionRepository.findOne({ where: { id: 1 } });
    
    if (!section) {
      section = this.careersSectionRepository.create({
        id: 1,
        ...updateData.section
      });
    } else {
      Object.assign(section, updateData.section);
    }

    return this.careersSectionRepository.save(section);
  }

  async getVacancies(active?: boolean) {
    const where = active !== undefined ? { isActive: active } : {};
    return this.vacancyRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async createVacancy(createVacancyDto: CreateVacancyDto) {
    const vacancy = this.vacancyRepository.create(createVacancyDto);
    return this.vacancyRepository.save(vacancy);
  }

  async updateVacancy(id: string, updateVacancyDto: UpdateVacancyDto) {
    const vacancy = await this.vacancyRepository.findOne({ where: { id } });
    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена');
    }

    Object.assign(vacancy, updateVacancyDto);
    return this.vacancyRepository.save(vacancy);
  }

  async deleteVacancy(id: string) {
    const vacancy = await this.vacancyRepository.findOne({ where: { id } });
    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена');
    }

    await this.vacancyRepository.remove(vacancy);
    return { message: 'Вакансия удалена' };
  }

  async toggleVacancyStatus(id: string) {
    const vacancy = await this.vacancyRepository.findOne({ where: { id } });
    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена');
    }

    vacancy.isActive = !vacancy.isActive;
    return this.vacancyRepository.save(vacancy);
  }

  async getBenefits() {
    return this.benefitRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createBenefit(createBenefitDto: CreateBenefitDto) {
    const benefit = this.benefitRepository.create(createBenefitDto);
    return this.benefitRepository.save(benefit);
  }

  async updateBenefit(id: string, updateBenefitDto: UpdateBenefitDto) {
    const benefit = await this.benefitRepository.findOne({ where: { id } });
    if (!benefit) {
      throw new NotFoundException('Преимущество не найдено');
    }

    Object.assign(benefit, updateBenefitDto);
    return this.benefitRepository.save(benefit);
  }

  async deleteBenefit(id: string) {
    const benefit = await this.benefitRepository.findOne({ where: { id } });
    if (!benefit) {
      throw new NotFoundException('Преимущество не найдено');
    }

    await this.benefitRepository.remove(benefit);
    return { message: 'Преимущество удалено' };
  }
}
