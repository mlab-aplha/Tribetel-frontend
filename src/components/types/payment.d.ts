// src/components/types/payment.d.ts
export interface PaymentData {
    cardNumber: string;
    bank: string;
    expiry: string;
    cvv: string;
    method: string;
    cardHolderName: string;
}

export interface PaymentRequest {
    bookingId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentDetails: {
        cardNumber: string;
        bank: string;
        expiry: string;
        cvv: string;
        cardHolderName: string;
    };
    metadata?: {
        roomTitle: string;
        nights: number;
        checkIn: string;
        checkOut: string;
    };
}

export interface PaymentResponse {
    id: string;
    bookingId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'succeeded' | 'failed';
    paymentMethod: string;
    transactionId: string;
    paidAt: string;
    receiptUrl?: string;
}

export interface PaymentValidation {
    isValid: boolean;
    errors: string[];
}

