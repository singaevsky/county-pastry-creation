// backend/src/payments/webhook.middleware.ts
import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class WebhookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers['x-signature'] || '';
    const rawBody = (req as any).rawBody || JSON.stringify(req.body || {});
    const secret = process.env.PAYMENT_WEBHOOK_SECRET || '';

    if (!secret) throw new ForbiddenException('Webhook secret is not configured');

    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

    if (signature !== expected) throw new ForbiddenException('Invalid webhook signature');

    next();
  }
}
