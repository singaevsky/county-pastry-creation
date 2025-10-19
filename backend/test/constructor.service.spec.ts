import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConstructorService } from '../src/constructor/constructor.service';
import { Product } from '../src/recipes/products.entity';
import { BadRequestException } from '@nestjs/common';

describe('ConstructorService', () => {
  let service: ConstructorService;
  const mockRepo = {
    findOneBy: jest.fn().mockResolvedValue({ maxTiers: 3, maxFillings: 4 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConstructorService,
        { provide: getRepositoryToken(Product), useValue: mockRepo },
      ],
    }).compile();
    service = module.get<ConstructorService>(ConstructorService);
  });

  it('should validate params based on product type', async () => {
    const dto = { productType: 'torte', colors: ['#FF0000'], fillings: ['cream', 'fruit'], tiers: 2 };
    const result = await service.validateParams(dto);
    expect(result).toBe(JSON.stringify(dto));
  });

  it('should throw on invalid tiers', async () => {
    const dto = { productType: 'torte', colors: [], fillings: [], tiers: 4 };
    await expect(service.validateParams(dto)).rejects.toThrow(BadRequestException);
  });
});
