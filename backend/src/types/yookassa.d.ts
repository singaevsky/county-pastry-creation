declare module 'yookassa' {
  export interface YooKassaOptions {
    shopId: string;
    secretKey: string;
  }

  export interface Amount {
    value: string;
    currency: string;
  }

  export interface Confirmation {
    type: 'redirect';
    return_url: string;
  }

  export interface CreatePaymentOptions {
    amount: Amount;
    confirmation: Confirmation;
    capture?: boolean;
    description?: string;
    metadata?: Record<string, string>;
  }

  export interface Payment {
    id: string;
    status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
    paid: boolean;
    amount: Amount;
    metadata: Record<string, string>;
  }

  export default class YooKassa {
    constructor(options: YooKassaOptions);
    createPayment(options: CreatePaymentOptions): Promise<Payment>;
    getPayment(paymentId: string): Promise<Payment>;
  }
}
