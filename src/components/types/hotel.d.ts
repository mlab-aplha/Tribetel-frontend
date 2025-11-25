export interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    priceStarting: number;
    image: string;
    rating: number;
    amenities: string[];
    address?: string;
    city?: string;
    country?: string;
    star_rating?: number;
    latitude?: number;
    longitude?: number;
    check_in_time?: string;
    check_out_time?: string;
    policies?: string;
    average_rating?: number;
    total_reviews?: number;
    hotel_images?: string[];
    hotel_facilities?: string[];
    available?: boolean;
    distanceKm?: number;
    tags?: string[];
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

export interface HotelSearchParams {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    amenities?: string[];
    rating?: number;
}

export interface HotelSearchResponse {
    hotels: Hotel[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface HotelFilters {
    priceRange?: {
        min: number;
        max: number;
    };
    amenities?: string[];
    rating?: number;
    distance?: number;
}

export interface HotelAvailability {
    id: string;
    name: string;
    location: string;
    pricePerNight: number;
    available: boolean;
    rating: number;
    reviews: number;
    description: string;
    image: string;
    amenities: string[];
    distanceKm?: number;
    tags?: string[];
}