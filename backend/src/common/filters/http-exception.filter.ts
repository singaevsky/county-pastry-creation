*** Begin Patch
*** Add File: backend/src/common/filters/http-exception.filter.ts
+import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
+import { Request, Response } from 'express';
+
+@Catch()
+export class HttpExceptionFilter implements ExceptionFilter {
+  catch(exception: unknown, host: ArgumentsHost) {
+    const ctx = host.switchToHttp();
+    const response = ctx.getResponse<Response>();
+    const request = ctx.getRequest<Request>();
+
+    let status = HttpStatus.INTERNAL_SERVER_ERROR;
+    let message = 'Internal server error';
+
+    if (exception instanceof HttpException) {
+      status = exception.getStatus();
+      const res = exception.getResponse();
+      message = (res as any).message || res;
+    } else if ((exception as any).message) {
+      message = (exception as any).message;
+    }
+
+    const payload = {
+      statusCode: status,
+      timestamp: new Date().toISOString(),
+      path: request.url,
+      message,
+      // optionally: requestId, details, etc.
+    };
+
+    // In production you may hide stack traces
+    response.status(status).json(payload);
+  }
+}
*** End Patch
