// components/types/common.d.ts
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
    register: (userData: RegisterRequest) => Promise<AuthResponse>;
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

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone?: string;
    preferences?: {
        favoriteDestinations: string[];
        roomPreferences: string[];
        specialRequests?: string;
    };
    bookings: BookingConfirmation[];
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    country?: string;
    preferences?: {
        newsletter?: boolean;
    };
}

export interface AuthResponse {
    user: User;
    token: string;
    expiresIn: number;
}

export interface UserSession {
    user: User | null;
    token: string | null;
    expiresAt: number | null;
    permissions: string[];
}

// ============ SEARCH & FILTER TYPES ============

export interface SearchDestination {
    id: string;
    name: string;
    type: 'city' | 'region' | 'hotel' | 'resort';
    country?: string;
    priceRange?: {
        min: number;
        max: number;
        currency: string;
    };
}

export interface SearchParams {
    destination: string;
    destinationId?: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms?: number;
    estimatedPrice?: PriceEstimate;
}

// FIXED: Single consistent PriceEstimate definition
export interface PriceEstimate {
    min: number;
    max: number;
    currency: string;
    nights: number;
    isEstimated: boolean;
}

export interface SearchBarProps {
    destinations?: SearchDestination[];
    initialDestinationId?: string;
    onSearch: (searchParams: SearchParams) => void;
    className?: string;
    disabled?: boolean;
    showGuests?: boolean;
    showRooms?: boolean;
    compact?: boolean;
    enablePriceEstimation?: boolean;
    onPriceEstimate?: (estimate: PriceEstimate | null) => void;
    fetchDestinations?: () => Promise<SearchDestination[]>;
    calculatePrice?: (params: {
        destinationId: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms?: number;
    }) => Promise<PriceEstimate>;
}

export interface HotelSearchParams {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    page?: number;
    limit?: number;
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

export interface FilterOption {
    id: string;
    label: string;
    type: 'pill' | 'dropdown';
}

export interface SortOption {
    id: string;
    label: string;
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

export interface HotelSummary {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    description: string;
    pricePerNight: number;
    image: string;
    distanceKm?: number;
    tags?: string[];
    amenities: string[];
}

export interface HotelAvailability {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    description: string;
    pricePerNight: number;
    image: string;
    distanceKm?: number;
    tags?: string[];
    amenities?: string[];
    available?: boolean;
}

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
    view?: string;
    bathroom?: string;
    includedAmenities?: string[];
    reviews?: Review[];
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

export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    verified?: boolean;
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

export interface ActiveBookingsProps {
    bookings?: BookingData[];
    onCancelBooking?: (bookingId: string) => Promise<void> | void;
    isLoading?: boolean;
}

export interface BookingState {
    step: 'selection' | 'details' | 'payment' | 'confirmation';
    room: Room | null;
    form: BookingFormData;
    payment: PaymentData | null;
    loading: boolean;
    error: string | null;
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

// ============ COMPONENT PROPS TYPES ============

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

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
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

export interface RoomSearchResponse {
    rooms: Room[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
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

// ============ FILTER & PAGINATION TYPES ============

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

// ============ CACHE TYPES ============

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