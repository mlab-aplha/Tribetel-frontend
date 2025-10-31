import { ReactNode } from 'react';

// Button
export interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'outlineSecondary' | 'ghost' | 'join' | 'signIn' | 'location';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    style?: React.CSSProperties;
}

// Card
export interface CardProps {
    children: ReactNode;
    className?: string;
}

// ErrorMessage
export interface ErrorMessageProps {
    message: string;
    variant?: 'error' | 'warning' | 'info' | 'success';
    size?: 'small' | 'medium' | 'large';
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
    fullWidth?: boolean;
}

// Loader
export interface LoaderProps {
    type?: 'spinner' | 'dots';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    text?: string;
    overlay?: boolean;
    fullscreen?: boolean;
    inline?: boolean;
    className?: string;
}

// Input
export interface InputProps {
    type?: 'text' | 'email' | 'password' | 'textarea' | 'select';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    id?: string;
    required?: boolean;
    maxLength?: number;
    rows?: number;
    className?: string;
    error?: string;
    disabled?: boolean;
    options?: { value: string; label: string }[];
}

// Modal
export interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    className?: string;
}

// RoomCard
export interface RoomCardProps {
    title?: string;
    price?: string;
    imageUrl?: string;
    description?: string;
    className?: string;
    onClick?: () => void;
}

// ServiceCard
export interface ServiceCardProps {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    isNew?: boolean;
    onViewOffer?: () => void;
}
export interface BookingData {
    id: string;
    guestName: string;
    bookingCode: string;
    checkInDate: string;
    checkOutDate: string;
    hotelName: string;
    hotelAddress: string;
    guestCount: number;
    imageUrl: string;
    status: 'confirmed' | 'cancelled' | 'pending';
    totalAmount?: number;
    currency?: string;
}

export interface ActiveBookingsProps {
    bookings?: BookingData[];
    onCancelBooking?: (bookingId: string) => Promise<void> | void;
    isLoading?: boolean;
}

export interface ReviewFormData {
    rating: number;
    comment: string;
    title: string;
    hotelId?: string;
    bookingId?: string;
    userId?: string;
}

export interface AddReviewProps {
    onSubmit?: (data: ReviewFormData) => Promise<void>;
    initialRating?: number;
    hotelId?: string;
    bookingId?: string;
    userId?: string;
    maxCommentLength?: number;
    maxTitleLength?: number;
}
export interface AdminLayoutProps {
    children: React.ReactNode;
    logo?: string;
    brandName?: string;
    className?: string;
    showBranding?: boolean;
    backgroundImage?: string;
    theme?: 'default';
}
export interface AdminSignInFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface AdminSignInFormProps {
    onSubmit?: (data: AdminSignInFormData) => Promise<void>;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    allowedDomains?: string[];
    redirectPath?: string;
    isLoading?: boolean;
}
export interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    redirectTo?: string;
    fallback?: ReactNode;
}

export interface AuthContextType {
    user: any | null;
    admin: any | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (userData: any) => void;
    logout: () => void;
    adminLogin: (adminData: any) => void;
    adminLogout: () => void;
}
export interface SignInFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface SignInLayoutProps {
    children: ReactNode;
    logo?: string;
    brandName?: string;
    className?: string;
}
// Room types
export interface Room {
    id: string;
    image: string;
    title: string;
    location: string;
    description: string;
    features: string[];
    pricePerNight: number;
    maxGuests: number;
    available: boolean;
}

// Booking types
export interface BookingFormData {
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests?: string;
}

export interface BookingRequest extends BookingFormData {
    roomId: string;
    totalPrice: number;
    userId?: string;
}

export interface BookingResponse {
    id: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    bookingDate: string;
    specialRequests?: string;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    code: string;
    details?: any;
}

// Add these to your existing types

export interface BookingConfirmation {
    id: string;
    bookingNumber: string;
    fullName: string;
    roomTitle: string;
    nights: number;
    checkIn: string;
    checkOut: string;
    confirmedAt: string;
    total: number;
    email: string;
    roomId: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    guests: number;
    specialRequests?: string;
    paymentStatus: 'paid' | 'pending' | 'failed';
    paymentMethod?: string;
}

export interface ConfirmationApiResponse {
    booking: BookingConfirmation;
    qrCode?: string;
    cancellationPolicy: string;
    contactInfo: {
        phone: string;
        email: string;
        address: string;
    };
}
// Add these to your existing types

export interface RoomSummary {
    id: string;
    title: string;
    pricePerNight: number;
    image?: string;
    maxGuests: number;
    features: string[];
    type: string;
}

export interface BookingSummaryData {
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests?: string;
    paymentMethod?: string;
}

export interface PriceBreakdown {
    roomRate: number;
    nights: number;
    subtotal: number;
    taxes: number;
    serviceFee: number;
    discount?: number;
    total: number;
}

export interface BookingSummaryProps {
    form: BookingSummaryData;
    room: RoomSummary;
    priceBreakdown: PriceBreakdown;
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

export interface DateRange {
    checkIn: string;
    checkOut: string;
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

export interface DateValidation {
    isValid: boolean;
    errors: string[];
    nights: number;
}


export interface DateRange {
    checkIn: string;
    checkOut: string;
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

export interface DateValidation {
    isValid: boolean;
    errors: string[];
    nights: number;
}

export interface Booking {
    id?: string;
    roomTitle: string;
    total: number;
    fullName: string;
    nights: number;
    checkIn: string;
    checkOut: string;
    email: string;
    roomId: string;
    guests: number;
    specialRequests?: string;
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
    metadata?: {
        roomTitle: string;
        nights: number;
        checkIn: string;
        checkOut: string;
    };
}

export interface PaymentResponse {
    id: string;
    status: 'succeeded' | 'pending' | 'failed';
    transactionId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paidAt: string;
    receiptUrl?: string;
}

export interface PaymentValidation {
    isValid: boolean;
    errors: string[];
}
// Hotel Listing Types
export interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    priceStarting: number;
    image: string;
    rating?: number;
    reviewCount?: number;
    amenities?: string[];
    available?: boolean;
    slug?: string;
    images?: string[];
    distance?: string;
}

export interface HotelSearchParams {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    page?: number;
    limit?: number;
}

export interface HotelSearchResponse {
    hotels: Hotel[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    filters?: HotelFilters;
}

export interface HotelFilters {
    priceRange: [number, number];
    amenities: string[];
    rating: number;
}

export interface PaginationInfo {
    page: number;
    totalPages: number;
    totalResults: number;
    hasMore: boolean;
}

// Page Description Types
export interface PageDescriptionProps {
    title: string;
    description: string;
    backgroundImage?: string;
    overlayColor?: string;
    textColor?: string;
    accentColor?: string;
    height?: string;
    reverseLayout?: boolean;
}

// Search Results Types
export interface SearchResultsProps {
    results: Hotel[];
    currentPage: number;
    totalPages: number;
    totalResults: number;
    onPageChange: (page: number) => void;
    onHotelVisit: (hotelId: string) => void;
    loading?: boolean;
    filters?: FilterOption[];
    onFilterChange?: (filters: string[]) => void;
    sortOptions?: SortOption[];
    onSortChange?: (sortBy: string) => void;
}

export interface FilterOption {
    id: string;
    label: string;
    type: 'pill' | 'dropdown';
}

export interface SortOption {
    id: string;
    label: string;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    pagination?: PaginationInfo;
}
export interface User {
    isLoggedIn: boolean;
    name: string;
    email?: string;
    preferences?: UserPreferences;
}

export interface UserPreferences {
    favoriteDestinations?: string[];
    roomPreferences?: string[];
    specialRequests?: string;
}

export interface SearchParams {
    destination: string;
    checkIn: Date | null;
    checkOut: Date | null;
    guests?: number;
    rooms?: number;
}

export interface AvailabilityResponse {
    available: boolean;
    hotels?: HotelAvailability[];
    message?: string;
    totalResults?: number;
}

export interface HotelAvailability {
    id: string;
    name: string;
    location: string;
    price: number;
    availableRooms: number;
    image: string;
    rating: number;
    amenities: string[];
}

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isInRange: boolean;
    isDisabled: boolean;
    isCheckIn: boolean;
    isCheckOut: boolean;
}

export interface DateRange {
    start: Date | null;
    end: Date | null;
}