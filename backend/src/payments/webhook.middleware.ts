// backend/src/payments/webhook.middleware.ts
import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class WebhookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers['x-signature'] || req.headers['x-ya-signature'] || req.headers['x-tinkoff-sign'];
    const rawBody = (req as any).rawBody || JSON.stringify(req.body || {});

    // The secret should be payment provider secret; support env var
    const secret = process.env.PAYMENT_WEBHOOK_SECRET || process.env.YOOKASSA_SECRET || '';

    if (!secret) {
      // If no secret configured - fail-safe: forbid
      throw new ForbiddenException('Webhook secret is not configured');
    }

    // Example: HMAC-SHA256 verification
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

    if (signature && expected !== signature.toString()) {
      throw new ForbiddenException('Invalid webhook signature');
    }

    // pass
    next();
  }
}
