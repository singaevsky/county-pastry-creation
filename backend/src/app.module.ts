// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import * as redisStore from 'cache-manager-redis-store';
import * as fs from 'fs';

import {
  ProductsController,
  ProductsService,
  Product,
  FillingsController,
  FillingsService,
  Filling
} from './recipes';

// Domain modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ConstructorModule } from './constructor/constructor.module';
import { PaymentsModule } from './payments/payments.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get<string>('REDIS_URL') || 'redis://localhost:6379',
        ttl: 60,
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('THROTTLE_TTL') || 60,
        limit: configService.get<number>('THROTTLE_LIMIT') || 10,
        skipIf: () => false, // Не пропускать ограничения
        ignoreUserAgents: [], // Не игнорировать user-agents
        throttlers: [{
          ttl: configService.get<number>('THROTTLE_TTL') || 60,
          limit: configService.get<number>('THROTTLE_LIMIT') || 10,
        }],
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => {
        const sslKeyPath = cfg.get('SSL_KEY_PATH');
        const sslCertPath = cfg.get('SSL_CERT_PATH');

        const config = {
          type: 'postgres',
          host: cfg.get('DB_HOST'),
          port: Number(cfg.get('DB_PORT') || 5433),
          username: cfg.get('DB_USER'),
          password: cfg.get('DB_PASS'),
          database: cfg.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          synchronize: false,
          logging: cfg.get('TYPEORM_LOGGING') === 'true',
        } as any;

        // Добавляем SSL только если указаны оба пути к сертификатам
        if (sslKeyPath && sslCertPath) {
          try {
            config.ssl = {
              key: fs.readFileSync(sslKeyPath),
              cert: fs.readFileSync(sslCertPath),
            };
          } catch (error) {
            console.warn('SSL certificates not found, continuing without SSL');
          }
        }

        return config;
      },
      inject: [ConfigService],
    }),

    // Domain modules
    AuthModule,
    UsersModule,
    OrdersModule,
    ConstructorModule,
    PaymentsModule,
    RecipesModule,
  ],
})
export class AppModule {}
