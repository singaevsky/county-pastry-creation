import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  const mockRepo = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };
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

  it('should register user with valid role', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({ email: 'test', password: 'hashed', role: 'client' });
    mockRepo.save.mockResolvedValue({ id: 1, email: 'test', role: 'client' });
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);

    const result = await service.register({ email: 'test@example.com', password: 'password', role: 'client' });
    expect(result).toEqual({ accessToken: 'token' });
    expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining({ role: 'client' }));
  });

  it('should register baker with geo coordinates', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({ email: 'baker', password: 'hashed', role: 'baker', geoLat: 55.7558, geoLong: 37.6173 });
    mockRepo.save.mockResolvedValue({ id: 2, email: 'baker', role: 'baker' });
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);

    const result = await service.register({ email: 'baker@example.com', password: 'password', role: 'baker' });
    expect(result).toEqual({ accessToken: 'token' });
    expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining({ role: 'baker' }));
  });

  it('should fail registration with invalid role', async () => {
    await expect(service.register({ email: 'test', password: 'pass', role: 'invalid' as any }))
      .rejects.toThrow('Validation failed');
  });

  it('should login and return token with role', async () => {
    mockRepo.findOneBy.mockResolvedValue({ id: 1, email: 'test', password: 'hashed', role: 'admin' });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    const result = await service.login({ email: 'test', password: 'pass' });
    expect(result).toEqual({ accessToken: 'token' });
    expect(mockJwt.sign).toHaveBeenCalledWith(expect.objectContaining({ role: 'admin' }));
  });
});
