// backend/src/app.module.ts
import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import * as redisStore from 'cache-manager-redis-store';

import { ProductsController } from './recipes/products.controller';
import { ProductsService } from './recipes/products.service';
import { Product } from './recipes/products.entity';

// Domain modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ConstructorModule } from './constructor/constructor.module';
import { PaymentsModule } from './payments/payments.module';

import { FillingsController } from './recipes/fillings.controller';
import { FillingsService } from './recipes/fillings.service';
import { Filling } from './recipes/fillings.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
        return {
          store: redisStore,
          url: redisUrl,
          ttl: 60,
        } as any;
      },
      inject: [ConfigService],
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('THROTTLE_TTL') || 60,
        limit: configService.get<number>('THROTTLE_LIMIT') || 10,
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST'),
        port: Number(cfg.get('DB_PORT') || 5432),
        username: cfg.get('DB_USER'),
        password: cfg.get('DB_PASS'),
        database: cfg.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false, // MUST be false in production
        logging: cfg.get('TYPEORM_LOGGING') === 'true',
      }),
      inject: [ConfigService],
    }),

    // Domain modules
    AuthModule,
    UsersModule,
    OrdersModule,
    ConstructorModule,
    PaymentsModule,

    // Feature module for products
    TypeOrmModule.forFeature([Product, Filling]),

  ],
controllers: [ProductsController, FillingsController],
providers: [ProductsService, FillingsService],
})
export class AppModule {}

// backend/src/app.module.ts
