// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RequestIdInterceptor } from './common/interceptors/request-id.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Security
  app.use(helmet());

  // CORS — читать из env, по умолчанию разрешаем none (безопаснее).
  const allowedOrigin = process.env.CORS_ORIGIN || '';
  if (allowedOrigin) {
    app.enableCors({
      origin: allowedOrigin.split(','),
      credentials: true,
    });
    logger.log(`CORS enabled for: ${allowedOrigin}`);
  } else {
    logger.log('CORS not enabled (CORS_ORIGIN not set)');
  }

  // Global pipes and filters
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new RequestIdInterceptor());

  // Swagger (only in non-production)
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('County Pastry API')
      .setDescription('API for pastry constructor and orders')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log('Swagger available at /api/docs');
  }

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Bootstrap error', err);
  process.exit(1);
});
