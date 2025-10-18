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

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any = {
      statusCode: status,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const excResp = exception.getResponse();
      // excResp can be string or object
      if (typeof excResp === 'string') {
        errorResponse = { statusCode: status, message: excResp };
      } else {
        errorResponse = {
          statusCode: status,
          ...((excResp as object) || {}),
        };
      }
    } else if (exception && (exception as any).message) {
      errorResponse = {
        statusCode: status,
        message: (exception as any).message,
      };
    }

    const payload = {
      statusCode: errorResponse.statusCode,
      message: errorResponse.message || 'Unexpected error',
      details: errorResponse.details || null,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
    };

    // Log full exception for internal debugging
    this.logger.error({
      message: payload.message,
      path: req.url,
      method: req.method,
      stack: (exception as any).stack || null,
    });

    res.status(payload.statusCode).json(payload);
  }
}
