
import { ApiResponse } from './common';

export interface PaymentRequest {
    bookingId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentIntentId?: string;
}

export interface PaymentResponse {
    id: string;
    bookingId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'succeeded' | 'failed' | 'refunded';
    paymentMethod: string;
    transactionId: string;
    paidAt: string;
    receiptUrl: string;
}

export interface PaymentValidation {
    isValid: boolean;
    errors: string[];
}

export interface PaymentData {
    cardHolderName: string;
    cardNumber: string;
    bank: string;
    expiry: string;
    cvv: string;
}

export interface PaymentService {
    processPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>>;
    verifyPayment(paymentIntentId: string): Promise<ApiResponse<PaymentResponse>>;
    refundPayment(bookingId: string): Promise<ApiResponse<PaymentResponse>>;
}