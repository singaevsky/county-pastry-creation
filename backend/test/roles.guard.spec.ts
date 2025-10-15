import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from '../src/common/roles.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  let jwtService: JwtService;

  const mockExecutionContext = (headers: any, roles: string[]): ExecutionContext => ({
    switchToHttp: () => ({
      getRequest: () => ({ headers }),
    }),
    getHandler: () => {},
  } as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        { provide: Reflector, useValue: { get: jest.fn() } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should allow access with correct role', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['admin', 'baker']);
    jest.spyOn(jwtService, 'verify').mockReturnValue({ role: 'admin' });
    const context = mockExecutionContext({ authorization: 'Bearer token' }, ['admin', 'baker']);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny access with incorrect role', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['sales_manager']);
    jest.spyOn(jwtService, 'verify').mockReturnValue({ role: 'client' });
    const context = mockExecutionContext({ authorization: 'Bearer token' }, ['sales_manager']);
    expect(guard.canActivate(context)).toBe(false);
  });

  it('should throw UnauthorizedException if no token', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
    const context = mockExecutionContext({}, ['admin']);
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if invalid token', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['logistics_manager']);
    jest.spyOn(jwtService, 'verify').mockImplementation(() => { throw new Error('Invalid token'); });
    const context = mockExecutionContext({ authorization: 'Bearer token' }, ['logistics_manager']);
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should allow access if no roles specified', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(undefined);
    const context = mockExecutionContext({ authorization: 'Bearer token' }, []);
    expect(guard.canActivate(context)).toBe(true);
  });
});
