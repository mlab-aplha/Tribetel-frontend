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

export interface BookingRequest {
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    specialRequests?: string;
    totalPrice: number;
    paymentMethod?: string;
}

export interface BookingResponse {
    id: string;
    roomId: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    specialRequests: string;
    createdAt: string;
    updatedAt: string;
}

export interface PriceBreakdown {
    roomRate: number;
    subtotal: number;
    discount?: number;
    taxes: number;
    serviceFee: number;
    total: number;
    nights: number;
}

export interface BookingConfirmationData {
    id: string;
    roomId: string;
    bookingNumber: string;
    fullName: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    total: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    email: string;
    confirmedAt: string;
    specialRequests: string;
    customerPhone: string;
}

export interface BookingCardProps {
    booking: BookingConfirmation;
    onAction: (bookingId: string, action: "cancel" | "modify") => Promise<void>;
    showActions: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface HotelSummary {
    id: string;
    name: string;
    location: string;
    rating: number;
    price: number;
    image: string;
    amenities: string[];
    tags?: string[];
}
