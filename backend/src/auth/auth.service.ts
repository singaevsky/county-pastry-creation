// backend/src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const matched = await bcrypt.compare(pass, user.passwordHash);
    if (!matched) {
      // optional: track failed attempts here
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.isBanned) {
      throw new UnauthorizedException('User is banned');
    }
    // return minimal payload
    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    // user is validated object
    const payload = { username: user.email, sub: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES', '15m'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES', '7d'),
    });

    // store refresh token hash in DB for logout/invalidation
    const refreshHash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.saveRefreshTokenHash(user.id, refreshHash);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  async refreshTokens(userId: number, incomingRefreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh session');
    }
    const ok = await bcrypt.compare(incomingRefreshToken, user.refreshTokenHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    // generate new tokens
    return this.login(user);
  }

  async logout(userId: number) {
    // remove refresh token hash
    await this.usersService.clearRefreshTokenHash(userId);
  }
}
