import axios from "axios";

export type PaymentMethod = "MOCK" | "CARD" | "EASY_PAY";

export type PaymentCreateRequest = {
    bookingId: number;
    paymentMethod: PaymentMethod;
};

export type PaymentCreateResponse = {
    paymentId: number;
    paymentStatus: string;
    paymentMethod: PaymentMethod;
    amount: string;
};

export async function createPayment(req: PaymentCreateRequest){
    const res = await axios.post<PaymentCreateResponse>("/api/payments", req);
    return res.data;
}

export type PaymentConfirmRequest = {
    paymentKey: string;
}

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

export async function confirmPayment(paymentId: number, req: PaymentConfirmRequest){
    const res = await axios.post<PaymentResponse>(`/api/payments/${paymentId}/confirm`, req);
    return res.data;
}

export async function failPayment(paymentId: number){
    const res = await axios.post<PaymentResponse>(`/api/payments/${paymentId}/fail`);
    return res.data;
}