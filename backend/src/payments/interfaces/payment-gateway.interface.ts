export interface PaymentRequest {
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    return_url: string;
  };
  metadata: {
    orderId: string;
  };
}

export interface IPaymentGateway {
  createPayment(request: PaymentRequest, orderId: string): Promise<any>;
  confirmPayment(paymentId: string): Promise<any>;
  checkPaymentStatus(paymentId: string): Promise<any>;
  cancelPayment(paymentId: string): Promise<any>;
}
