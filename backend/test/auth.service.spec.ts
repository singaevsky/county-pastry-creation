import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  const mockRepo = { findOneBy: jest.fn(), create: jest.fn(), save: jest.fn() };
  const mockJwt = { sign: jest.fn().mockReturnValue('token') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should register user', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({ email: 'test', password: 'hashed', role: 'client' });
    mockRepo.save.mockResolvedValue({ id: 1, email: 'test', role: 'client' });
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');

    const result = await service.register({ email: 'test', password: 'pass', role: 'client' });
    expect(result).toEqual({ accessToken: 'token' });
  });

  // Аналогично для login
});
