import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../src/admin/admin.controller';
import { AdminService } from '../src/admin/admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../src/orders/order.entity';
import { Filling } from '../src/recipes/fillings.entity';
import { Product } from '../src/recipes/products.entity';
import { CACHE_MANAGER } from '@nestjs/common';

describe('AdminController', () => {
  let controller: AdminController;
  const mockAdminService = {
    getFillings: jest.fn().mockResolvedValue([{ id: 1, name: 'cream', cost: 100 }]),
    createFilling: jest.fn().mockResolvedValue({ id: 2, name: 'fruit', cost: 150 }),
    getProducts: jest.fn().mockResolvedValue([{ id: 1, type: 'torte', maxTiers: 3, maxFillings: 4 }]),
  };
  const mockRepo = { find: jest.fn(), save: jest.fn() };
  const mockCache = { get: jest.fn(), set: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        { provide: AdminService, useValue: mockAdminService },
        { provide: getRepositoryToken(Order), useValue: mockRepo },
        { provide: getRepositoryToken(Filling), useValue: mockRepo },
        { provide: getRepositoryToken(Product), useValue: mockRepo },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();
    controller = module.get<AdminController>(AdminController);
  });

  it('should allow admin to get fillings', async () => {
    const result = await controller.getFillings();
    expect(result).toEqual([{ id: 1, name: 'cream', cost: 100 }]);
    expect(mockAdminService.getFillings).toHaveBeenCalled();
  });

  it('should allow baker to create filling', async () => {
    const dto = { name: 'fruit', cost: 150 };
    const result = await controller.createFilling(dto);
    expect(result).toEqual({ id: 2, name: 'fruit', cost: 150 });
    expect(mockAdminService.createFilling).toHaveBeenCalledWith(dto);
  });

  it('should allow admin to get products', async () => {
    const result = await controller.getProducts();
    expect(result).toEqual([{ id: 1, type: 'torte', maxTiers: 3, maxFillings: 4 }]);
    expect(mockAdminService.getProducts).toHaveBeenCalled();
  });
});
