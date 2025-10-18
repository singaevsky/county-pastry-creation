import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminService } from '../src/admin/admin.service';
import { Order } from '../src/orders/entities/order.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common';

describe('AdminService', () => {
  let service: AdminService;
  const mockOrdersRepo = {
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([{ date: '2025-10-01', total: '1000' }]),
    }),
    count: jest.fn().mockResolvedValue(10),
  };
  const mockCache = {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: getRepositoryToken(Order), useValue: mockOrdersRepo },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should return sales data', async () => {
    const result = await service.getSalesData();
    expect(result).toEqual([{ date: '2025-10-01', total: 1000 }]);
    expect(mockCache.set).toHaveBeenCalled();
  });

  // Аналогичные тесты для fillings и conversion
});
