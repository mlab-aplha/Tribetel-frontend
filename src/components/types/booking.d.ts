export interface Booking {
    id: string;
    user_id: string;
    room_id: string;
    check_in_date: string;
    check_out_date: string;
    number_of_rooms: number;
    number_of_guests: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    special_requests?: string;
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
    created_at?: string;
    updated_at?: string;
    room?: any;
    user?: any;
}

export interface BookingRequest {
    room_id: string;
    check_in_date: string;
    check_out_date: string;
    number_of_rooms: number;
    number_of_guests: number;
    special_requests?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
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

export interface BookingResponse {
    booking: Booking;
    payment_required: boolean;
    payment_amount?: number;
}

export interface BookingSearchParams {
    id?: string;
    user_id?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export interface BookingConfirmation {
    id: string;
    bookingNumber: string;
    fullName: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    status: 'confirmed' | 'cancelled' | 'pending' | 'completed';
    totalAmount: number;
    currency: string;
    roomId?: string;
    nights?: number;
    guests?: number;
    paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
    email?: string;
    confirmedAt?: string;
    specialRequests?: string;
    customerPhone?: string;
}

export interface BookingCardProps {
    booking: BookingConfirmation;
    onAction: (bookingId: string, action: "cancel" | "modify") => Promise<void>;
    showActions: boolean;
}

export interface BookingFormData {
    fullName: string;
    email: string;
    phone: string;
    region: string;
    guests: number;
    specialRequests: string;
    checkIn: string;
    checkOut: string;
    paymentMethod?: string;
}

export interface PriceBreakdown {
    roomRate: number;
    subtotal: number;
    discount?: number;
    taxes: number;
    serviceFee: number;
    total: number;
    nights: number;
    currency: string;
}

export interface DateRange {
    checkIn: string;
    checkOut: string;
}

export interface DateValidation {
    isValid: boolean;
    errors: string[];
    nights: number;
}