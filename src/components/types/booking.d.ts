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
    roomTitle?: string;
}
export interface BookingRequest {
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    specialRequests?: string;
    roomTitle?: string;
}

export interface BookingResponse {
    id: string;
    roomId: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    bookingNumber: string;
    confirmedAt: string;
    createdAt: string;
    updatedAt: string;
    specialRequests: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
}

export interface PaymentResponse {
    id: string;
    status: 'failed' | 'succeeded' | 'pending' | 'refunded';
    amount: number;
    currency: string;
    paymentMethod: string;
    transactionId: string;
    bookingId: string;
    paidAt: string;
    receiptUrl: string;
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
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    email: string;
    confirmedAt: string;
    specialRequests: string;
    customerPhone: string;
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
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    specialRequests: string;
    bookingNumber: string;
    confirmedAt: string;
    createdAt: string;
    updatedAt: string;
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

export interface BookingConfirmation {
    id: string;
    bookingNumber: string;
    fullName: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    status: 'confirmed' | 'cancelled' | 'pending';
    roomId?: string;
    nights?: number;
    guests?: number;
    total?: number;
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

export interface PriceBreakdown {
    roomRate: number;
    subtotal: number;
    discount?: number;
    taxes: number;
    serviceFee: number;
    total: number;
    nights: number;
}

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
    metadata: {
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
    status: 'succeeded' | 'failed' | 'pending' | 'refunded';
    paymentMethod: string;
    transactionId: string;
    paidAt: string;
    receiptUrl: string;
}

export interface Room {
    id: string;
    title: string;
    type?: string;
    image: string;
    pricePerNight: number;
    maxGuests?: number;
    features?: string[];
    description?: string;
    amenities?: string[];
    available?: boolean;
}

export interface RoomSummary {
    id: string;
    title: string;
    type: string;
    image: string;
    pricePerNight: number;
    maxGuests: number;
    features: string[];
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
    description?: string;
    totalRooms?: number;
    availableRooms?: number;
}

export interface DateRange {
    checkIn: string;
    checkOut: string;
}

export type DateChange = DateRange;

export interface DateValidation {
    isValid: boolean;
    errors: string[];
    nights: number;
}

export interface DateRangePickerProps {
    checkIn: string;
    checkOut: string;
    onChange: (dates: DateRange) => void;
    onValidationChange?: (isValid: boolean, errors: string[]) => void;
    minDate?: string;
    maxDate?: string;
    disabledDates?: string[];
    minNights?: number;
    maxNights?: number;
    isLoading?: boolean;
    required?: boolean;
}

export interface BookingFormProps {
    room: Room;
    onBookingSuccess: (booking: BookingResponse) => void;
    onBookingError: (error: string) => void;
    isDisabled?: boolean;
}

export interface BookingSummaryData {
    fullName: string;
    email: string;
    phone: string;
    region: string;
    guests: number;
    specialRequests: string;
    checkIn: string;
    checkOut: string;
}

export interface BookingSummaryProps {
    form: BookingSummaryData;
    room: RoomSummary;
    nights: number;
    onConfirm: () => void;
    onEdit?: () => void;
    isLoading?: boolean;
    isConfirmed?: boolean;
    policies?: {
        cancellation: string;
        checkIn: string;
        checkOut: string;
    };
}

export interface PaymentFormProps {
    onPaymentSuccess?: () => void;
    onPaymentError?: (error: string) => void;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface FormErrors {
    [key: string]: string;
}

export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
}