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

export async function createPayment(req: PaymentCreateRequest) {
  const response = (await client.post(
    '/api/payments',
    req,
  )) as PaymentCreateResponse;
  return response;
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

export async function confirmPayment(req: PaymentConfirmRequest) {
  const response = (await client.post(
    '/api/payments/confirm',
    req,
  )) as PaymentResponse;
  return response;
}

export async function failPayment(paymentId: number) {
  const response = (await client.post(
    `/api/payments/${paymentId}/fail`,
  )) as PaymentResponse;
  return response;
}
