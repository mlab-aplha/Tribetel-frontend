export interface Room {
    id: string;
    hotel_id: string;
    room_type: string;
    capacity: number;
    price_per_night: number;
    total_rooms: number;
    available_rooms: number;
    description: string;
    amenities: string[];
    images?: string[];
    size?: string;
    bed_type?: string;
    title?: string;
    image?: string;
    location?: string;
    rating?: number;
    maxGuests?: number;
    available?: boolean;
    features?: string[];
    type?: string;
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

export interface RoomAvailability {
    room_id: string;
    date: string;
    available_rooms: number;
    price: number;
}

export interface RoomSearchParams {
    hotel_id?: string;
    check_in?: string;
    check_out?: string;
    guests?: number;
    rooms?: number;
    min_price?: number;
    max_price?: number;
    location?: string;
    type?: string;
    amenities?: string[];
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
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