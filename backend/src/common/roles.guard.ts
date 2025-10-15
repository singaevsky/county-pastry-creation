import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No token');

    const token = authHeader.split(' ')[1];
    const user = this.jwtService.verify(token);
    if (!user) throw new UnauthorizedException('Invalid token');

    return requiredRoles.includes(user.role); // Поддержка новых ролей: client, baker, sales_manager, logistics_manager, admin
  }
}
