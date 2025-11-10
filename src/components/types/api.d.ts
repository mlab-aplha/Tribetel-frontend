// src/components/types/api.d.ts
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

export interface PaginationInfo {
    page: number;
    totalPages: number;
    totalResults: number;
    hasMore: boolean;
}