// components/types/room.ts
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
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}