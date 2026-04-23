import client from './client';

export type PaymentMethod = 'MOCK' | 'CARD' | 'EASY_PAY';

export type PaymentCreateRequest = {
  bookingId: number;
  paymentMethod: PaymentMethod;
};

export type PaymentCreateResponse = {
  paymentId: number;
  orderId: string;
  paymentStatus: string;
  paymentMethod: PaymentMethod;
  amount: string;
};

export async function createPayment(
  req: PaymentCreateRequest,
): Promise<PaymentCreateResponse> {
  return client.post<PaymentCreateResponse, PaymentCreateResponse>(
    '/api/payments',
    req,
  );
}

export type PaymentConfirmRequest = {
  paymentKey: string;
  orderId: string;
  amount: number;
};

export type PaymentResponse = {
  paymentId: number;
  bookingId: number;
  amount: string;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  paymentKey: string | null;
  paidAt: string | null;
  cancelledAt: string | null;
};

export async function confirmPayment(
  req: PaymentConfirmRequest,
): Promise<PaymentResponse> {
  return client.post<PaymentResponse, PaymentResponse>(
    '/api/payments/confirm',
    req,
  );
}

export async function failPayment(paymentId: number): Promise<PaymentResponse> {
  return client.post<PaymentResponse, PaymentResponse>(
    `/api/payments/${paymentId}/fail`,
  );
}

export async function getPaymentByBooking(
  bookingId: number,
): Promise<PaymentResponse> {
  return client.get<PaymentResponse, PaymentResponse>(
    `/api/bookings/${bookingId}/payment`,
  );
}
