// src/components/types/hotel.d.ts
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