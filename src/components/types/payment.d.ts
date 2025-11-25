export interface PaymentData {
    amount: number;
    currency: string;
    paymentMethod: string;
    bookingId: string;
    customerEmail?: string;
    customerName?: string;
    cardHolderName?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    bank?: string;
}

export interface PaymentValidation {
    isValid: boolean;
    errors: string[];
}

export interface PaymentRequest {
    bookingId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    customerEmail?: string;
    customerName?: string;
    paymentDetails?: {
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
    status: 'pending' | 'succeeded' | 'failed' | 'refunded';
    paymentMethod: string;
    transactionId: string;
    paidAt: string;
    receiptUrl: string;
}

export interface CheckoutSessionResponse {
    url: string;
    sessionId: string;
}

export interface PaymentVerificationResponse {
    success: boolean;
    booking: {
        id: string;
        status: string;
        payment_status: string;
        payment_intent_id: string;
    };
}