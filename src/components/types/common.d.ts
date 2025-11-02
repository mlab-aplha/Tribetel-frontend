import { ReactNode } from 'react';

// ============ COMMON UI =============

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

export interface CardProps {
    children: ReactNode;
    className?: string;
}

export interface ErrorMessageProps {
    message: string;
    variant?: 'error' | 'warning' | 'info' | 'success';
    size?: 'small' | 'medium' | 'large';
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
    fullWidth?: boolean;
}

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

export interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    className?: string;
}

export interface RoomCardProps {
    title?: string;
    price?: string;
    imageUrl?: string;
    description?: string;
    className?: string;
    onClick?: () => void;
}

export interface ServiceCardProps {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    isNew?: boolean;
    onViewOffer?: () => void;
}

// ============ AUTH TYPES ============

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

export interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    redirectTo?: string;
    fallback?: ReactNode;
}

export interface SignInFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
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

export interface SignInLayoutProps {
    children: ReactNode;
    logo?: string;
    brandName?: string;
    className?: string;
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

// ============ USER & PROFILE TYPES ============

export interface User {
    id?: string;
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

// ============ HOTEL & ROOM TYPES ============

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
    type?: string;
}

export interface RoomSummary {
    id: string;
    title: string;
    pricePerNight: number;
    image?: string;
    maxGuests: number;
    features: string[];
    type: string;
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

// ============ SEARCH & FILTER TYPES ============

export interface SearchParams {
    destination?: string;
    checkIn?: string | Date | null;
    checkOut?: string | Date | null;
    guests?: number;
    rooms?: number;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    page?: number;
    limit?: number;
}

export interface HotelSearchParams extends SearchParams {
}

export interface DateRange {
    checkIn: string;
    checkOut: string;
    start?: Date | null;
    end?: Date | null;
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

// ============ BOOKING TYPES ============

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

export interface BookingFormData {
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests?: string;
    paymentMethod?: string;
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

export interface ActiveBookingsProps {
    bookings?: BookingData[];
    onCancelBooking?: (bookingId: string) => Promise<void> | void;
    isLoading?: boolean;
}

// ============ PAYMENT TYPES ============

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

// ============ REVIEW TYPES ============

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

// ============ HOTEL LISTINGS TYPES ============

export interface HotelListingsProps {
    hotels?: Hotel[];
    title?: string;
    subtitle?: string;
    showPromo?: boolean;
    enableBackend?: boolean;
    searchParams?: SearchParams;
    onHotelClick?: (hotel: Hotel) => void;
    onBookNow?: () => void;
    onLoad?: (hotels: Hotel[]) => void;
}

// ============ SEARCH RESULTS TYPES ============

export interface FilterOption {
    id: string;
    label: string;
    type: 'pill' | 'dropdown';
}

export interface SortOption {
    id: string;
    label: string;
}

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

// ============ PAGE DESCRIPTION TYPES ============

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

// ============ BOOKING SUMMARY TYPES ============

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
    form: BookingFormData;
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

// ============ API RESPONSE TYPES ============

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    pagination?: PaginationInfo;
}

export interface ApiError {
    message: string;
    code: string;
    details?: any;
}

export interface HotelSearchResponse {
    hotels: Hotel[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    filters?: HotelFilters;
}

export interface AvailabilityResponse {
    available: boolean;
    hotels?: HotelAvailability[];
    message?: string;
    totalResults?: number;
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

// ============  FILTER TYPES ============

export interface PaginationInfo {
    page: number;
    totalPages: number;
    totalResults: number;
    hasMore: boolean;
}

export interface HotelFilters {
    priceRange: [number, number];
    amenities: string[];
    rating: number;
}

// ============ ENHANCED TYPES ============

export interface EndHotel extends Hotel {
    contactInfo?: {
        phone: string;
        email: string;
        address: string;
    };
    policies?: {
        checkIn: string;
        checkOut: string;
        cancellation: string;
        pets: boolean;
        smoking: boolean;
    };
    nearbyAttractions?: string[];
    transportation?: string[];
}

export interface EndRoom extends Room {
    size?: string;
    bedType?: string;
    view?: string;
    bathroom?: string;
    includedAmenities?: string[];
    images?: string[];
}

export interface SearchState {
    params: SearchParams;
    results: Hotel[];
    loading: boolean;
    error: string | null;
    filters: {
        priceRange: [number, number];
        amenities: string[];
        rating: number;
    };
    sortBy: string;
}

// Booking state management
export interface BookingState {
    step: 'selection' | 'details' | 'payment' | 'confirmation';
    room: Room | null;
    form: BookingFormData;
    payment: PaymentData | null;
    loading: boolean;
    error: string | null;
}

// User session state
export interface UserSession {
    user: User | null;
    token: string | null;
    expiresAt: number | null;
    permissions: string[];
}

// Cache types 
export interface CacheItem<T> {
    data: T;
    timestamp: number;
    expiresIn: number;
}

export interface CacheStore {
    hotels: CacheItem<Hotel[]>;
    searchResults: CacheItem<HotelSearchResponse>;
    user: CacheItem<User>;
}

//
// Add these interfaces to your existing types
export interface BookingResponse {
    id: string;
    roomId: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    specialRequests?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
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
//
export interface Room {
    id: string;
    title: string;
    description: string;
    pricePerNight: number;
    image: string;
    location: string;
    rating?: number;
    amenities: string[];
    maxGuests: number;
    available: boolean;
    features?: string[];
    type?: string;
    images?: string[];
    size?: string;
    bedType?: string;
    reviews?: Review[];
}

export interface RoomSearchParams {
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    minPrice?: number;
    maxPrice?: number;
    type?: string;
    amenities?: string[];
    page?: number;
    limit?: number;
    sortBy?: 'price' | 'rating' | 'name';
    sortOrder?: 'asc' | 'desc';
}

export interface RoomSearchResponse {
    rooms: Room[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    verified?: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}


export interface BookingConfirmation {
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
    status: 'confirmed' | 'pending' | 'cancelled';
    paymentStatus: 'paid' | 'pending' | 'failed';
    email: string;
    confirmedAt: string;
    specialRequests?: string;
    customerPhone?: string;
}

export interface BookingRequest {
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    totalPrice: number;
    specialRequests?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
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
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    bookingDate: string;
    createdAt: string;
    specialRequests?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
}