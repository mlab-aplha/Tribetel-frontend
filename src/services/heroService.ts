// services/heroService.ts
import {
    HotelAvailability,
    SearchParams,
    AvailabilityResponse,
    User,
    HotelSearchParams
} from '../components/types/common';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface SearchFilters {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    priceRange?: {
        min: number;
        max: number;
    };
    amenities?: string[];
}

export const searchHotels = async (searchParams: SearchParams, filters?: SearchFilters): Promise<HotelAvailability[]> => {
    try {
        // Validate required parameters
        if (!searchParams.destination) {
            throw new Error('Destination is required');
        }

        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.append('destination', searchParams.destination);

        if (searchParams.checkIn) queryParams.append('checkIn', searchParams.checkIn);
        if (searchParams.checkOut) queryParams.append('checkOut', searchParams.checkOut);
        if (searchParams.guests) queryParams.append('guests', searchParams.guests.toString());
        if (searchParams.rooms) queryParams.append('rooms', searchParams.rooms.toString());

        // Add filter parameters if provided
        if (filters) {
            if (filters.priceRange) {
                queryParams.append('minPrice', filters.priceRange.min.toString());
                queryParams.append('maxPrice', filters.priceRange.max.toString());
            }
            if (filters.amenities && filters.amenities.length > 0) {
                queryParams.append('amenities', filters.amenities.join(','));
            }
        }

        // Simulate API call - replace with actual API endpoint
        const response = await fetch(`${API_BASE_URL}/api/hotels?${queryParams}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the API response to match HotelAvailability type
        return data.hotels.map((hotel: any) => ({
            id: hotel.id,
            name: hotel.name,
            location: hotel.location || searchParams.destination!, // Use non-null assertion since we validated
            rating: hotel.rating,
            reviews: hotel.reviewCount || hotel.reviews,
            description: hotel.description,
            pricePerNight: hotel.price,
            image: hotel.imageUrl || hotel.image,
            distanceKm: hotel.distance,
            tags: hotel.tags,
            amenities: hotel.amenities,
            available: hotel.available !== false
        }));

    } catch (error) {
        console.error('Error searching hotels:', error);
        throw error;
    }
};

export const getHotelDetails = async (hotelId: string): Promise<HotelAvailability> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        throw error;
    }
};

export const heroService = {
    async checkAvailability(searchParams: SearchParams): Promise<AvailabilityResponse> {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Add null check for destination
            const destination = searchParams.destination?.toLowerCase() || '';

            if (destination.includes('cape town') ||
                destination.includes('johannesburg') ||
                destination.includes('durban')) {
                return {
                    available: true,
                    totalResults: 12,
                    hotels: [
                        {
                            id: "1",
                            name: "The Fly Stay",
                            location: searchParams.destination || 'Unknown Location',
                            pricePerNight: 250,
                            available: true,
                            rating: 4.5,
                            reviews: 120,
                            description: "Luxury accommodation with premium amenities",
                            image: "/images/fly-stay.jpg",
                            amenities: ["Free WiFi", "Pool", "Spa"]
                        }
                    ]
                };
            }

            return {
                available: false,
                message: "No hotels available for the selected criteria"
            };
        } catch (error) {
            console.error('Error checking availability:', error);
            throw new Error('Failed to check hotel availability');
        }
    },

    async getUserData(): Promise<User> {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (isLoggedIn) {
                return {
                    isLoggedIn: true,
                    name: localStorage.getItem('userName') || 'Guest',
                    email: localStorage.getItem('userEmail') || '',
                    preferences: {
                        favoriteDestinations: ['Cape Town', 'Johannesburg', 'Durban'],
                        roomPreferences: ['King Bed', 'Ocean View'],
                        specialRequests: 'Early check-in preferred'
                    }
                };
            }

            return {
                isLoggedIn: false,
                name: 'Guest'
            };
        } catch (error) {
            console.error('Error fetching user data:', error);
            return {
                isLoggedIn: false,
                name: 'Guest'
            };
        }
    },

    async getPopularDestinations(): Promise<string[]> {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            return [
                "Cape Town, South Africa",
                "Johannesburg, South Africa",
                "Durban, South Africa",
                "Mbombela, South Africa",
                "Kimberley, South Africa",
                "Pretoria, South Africa",
                "Port Elizabeth, South Africa"
            ];
        } catch (error) {
            console.error('Error fetching destinations:', error);
            return [];
        }
    },

    async trackSearch(searchParams: SearchParams): Promise<void> {
        try {
            console.log('Search tracked:', searchParams);
        } catch (error) {
            console.error('Error tracking search:', error);
        }
    },

    async getUnavailableDates(destination: string): Promise<Date[]> {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const unavailableDates: Date[] = [];
            const today = new Date();
            for (let i = 0; i < 5; i++) {
                const randomDay = new Date(today);
                randomDay.setDate(today.getDate() + Math.floor(Math.random() * 30));
                unavailableDates.push(randomDay);
            }

            return unavailableDates;
        } catch (error) {
            console.error('Error fetching unavailable dates:', error);
            return [];
        }
    }
};

export const hotelService = {
    searchHotels,
    getHotelDetails,
};