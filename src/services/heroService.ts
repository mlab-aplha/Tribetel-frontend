import {
    HotelAvailability,
    SearchParams,
    AvailabilityResponse,
    User
} from '../components/types/common';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tribetel-frontend.onrender.com/api';

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
        if (!searchParams.destination) {
            throw new Error('Destination is required');
        }
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
        const response = await fetch(`${API_BASE_URL}/hotels?${queryParams}`);

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
        const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}`);
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
                destination.includes('durban') ||
                destination.includes('mbombela') ||
                destination.includes('pretoria')) {

                const mockHotels: HotelAvailability[] = [
                    {
                        id: "1",
                        name: "The Fly Stay",
                        location: searchParams.destination || 'Cape Town, South Africa',
                        pricePerNight: 250,
                        available: true,
                        rating: 4.5,
                        reviews: 120,
                        description: "Luxury accommodation with premium amenities",
                        image: "/images/fly-stay.jpg",
                        amenities: ["Free WiFi", "Pool", "Spa", "Gym"],
                        distanceKm: 2.5,
                        tags: ["Luxury", "Beachfront", "Spa"]
                    },
                    {
                        id: "2",
                        name: "Elangeni Hotel",
                        location: searchParams.destination || 'Mbombela, South Africa',
                        pricePerNight: 180,
                        available: true,
                        rating: 4.2,
                        reviews: 89,
                        description: "Comfortable stay in the heart of the city",
                        image: "/images/elangeni.jpg",
                        amenities: ["Free WiFi", "Restaurant", "Parking"],
                        distanceKm: 1.2,
                        tags: ["City Center", "Business", "Comfort"]
                    },
                    {
                        id: "3",
                        name: "Diamond Crown",
                        location: searchParams.destination || 'Johannesburg, South Africa',
                        pricePerNight: 320,
                        available: true,
                        rating: 4.7,
                        reviews: 156,
                        description: "Premium luxury experience with exceptional service",
                        image: "/images/diamond-crown.jpg",
                        amenities: ["Free WiFi", "Pool", "Spa", "Fine Dining", "Concierge"],
                        distanceKm: 5.8,
                        tags: ["Luxury", "5-Star", "Executive"]
                    }
                ];

                return {
                    available: true,
                    totalResults: mockHotels.length,
                    hotels: mockHotels
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

            // Get user data from localStorage with proper fallbacks
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userStr = localStorage.getItem('user');

            if (isLoggedIn && userStr) {
                try {
                    const userData = JSON.parse(userStr);
                    return {
                        id: userData.id || '',
                        email: userData.email || '',
                        name: userData.name || 'Guest',
                        isLoggedIn: true,
                        preferences: {
                            favoriteDestinations: ['Cape Town', 'Johannesburg', 'Durban'],
                            roomPreferences: ['King Bed', 'Ocean View'],
                            specialRequests: 'Early check-in preferred'
                        }
                    };
                } catch (parseError) {
                    console.error('Error parsing user data:', parseError);
                }
            }

            // Return default guest user
            return {
                id: '',
                email: '',
                name: 'Guest',
                isLoggedIn: false
            };
        } catch (error) {
            console.error('Error fetching user data:', error);
            return {
                id: '',
                email: '',
                name: 'Guest',
                isLoggedIn: false
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
                "Port Elizabeth, South Africa",
                "Bloemfontein, South Africa"
            ];
        } catch (error) {
            console.error('Error fetching destinations:', error);
            return [];
        }
    },

    async trackSearch(searchParams: SearchParams): Promise<void> {
        try {
            // Log search for analytics - in a real app, send to analytics service
            console.log('Search tracked:', {
                destination: searchParams.destination,
                checkIn: searchParams.checkIn,
                checkOut: searchParams.checkOut,
                guests: searchParams.guests,
                rooms: searchParams.rooms,
                timestamp: new Date().toISOString()
            });

            // Store recent searches in localStorage
            const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            recentSearches.unshift({
                ...searchParams,
                timestamp: new Date().toISOString()
            });

            // Keep only last 5 searches
            const limitedSearches = recentSearches.slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));

        } catch (error) {
            console.error('Error tracking search:', error);
        }
    },

    async getUnavailableDates(destination: string): Promise<Date[]> {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            // Use the destination parameter to determine unavailable dates
            console.log('Checking unavailable dates for:', destination);

            const unavailableDates: Date[] = [];
            const today = new Date();

            // Generate some random unavailable dates based on destination
            const baseUnavailableDays = destination.toLowerCase().includes('cape town') ? 3 :
                destination.toLowerCase().includes('johannesburg') ? 2 : 4;

            for (let i = 0; i < baseUnavailableDays; i++) {
                const randomDay = new Date(today);
                randomDay.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
                unavailableDates.push(randomDay);
            }

            // Add some fixed unavailable dates (weekends might be busy)
            const nextWeekend1 = new Date(today);
            nextWeekend1.setDate(today.getDate() + (7 - today.getDay())); // Next Saturday
            unavailableDates.push(nextWeekend1);

            const nextWeekend2 = new Date(nextWeekend1);
            nextWeekend2.setDate(nextWeekend1.getDate() + 1); // Next Sunday
            unavailableDates.push(nextWeekend2);

            return unavailableDates;
        } catch (error) {
            console.error('Error fetching unavailable dates:', error);
            return [];
        }
    },

    // Additional helper method to get search suggestions
    async getSearchSuggestions(query: string): Promise<string[]> {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const allDestinations = await this.getPopularDestinations();
            return allDestinations.filter(dest =>
                dest.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5); // Return top 5 matches
        } catch (error) {
            console.error('Error getting search suggestions:', error);
            return [];
        }
    }
};

export const hotelService = {
    searchHotels,
    getHotelDetails,
};