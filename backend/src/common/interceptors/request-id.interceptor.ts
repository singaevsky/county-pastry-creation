// backend/src/common/interceptors/request-id.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const requestId = request.headers['x-request-id'] || uuidv4();

    request.requestId = requestId;
    response.setHeader('X-Request-Id', requestId);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const method = request.method;
        const url = request.url;
        // eslint-disable-next-line no-console
        console.log(`[${requestId}] ${method} ${url} - ${Date.now() - now}ms`);
      }),
    );
  }
}
