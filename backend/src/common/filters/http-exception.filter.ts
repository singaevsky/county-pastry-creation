// backend/src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any = {
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      // normalize response
      if (typeof res === 'string') {
        errorResponse.message = res;
      } else if (typeof res === 'object' && res !== null) {
        errorResponse = { ...(res as object) };
      }
    } else if (exception instanceof Error) {
      errorResponse.message = exception.message;
    }

    const payload = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...errorResponse,
    };

    // structured logging; replace with Winston + requestId if configured
    this.logger.error({
      message: payload.message,
      status,
      path: request.url,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json(payload);
  }
}
