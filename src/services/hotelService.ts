import { Hotel, HotelSearchParams, HotelSearchResponse, ApiResponse } from '../components/types/common';
import { apiClient } from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
//  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hotel-backend-hub-dyfd.onrender.com/api';
const mockHotels: Hotel[] = [
    {
        id: "1",
        name: "The Fly Stay",
        location: "Cape Town, South Africa",
        description: "Located in the heart of Cape Town, The Fly Stay offers a luxurious experience with stunning views of Table Mountain.",
        priceStarting: 750,
        image: "/images/fly-stay.jpg",
        rating: 4.5,
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Gym"]
    },
    {
        id: "2",
        name: "Elangeni",
        location: "Mbombela, South Africa",
        description: "Elangeni is a beachfront hotel in Durban, perfect for a relaxing getaway with top-notch amenities.",
        priceStarting: 500,
        image: "/images/bellagen.jpg",
        rating: 4.2,
        amenities: ["Beach Access", "Restaurant", "Bar", "Free Parking"]
    },
    {
        id: "3",
        name: "Diamond Crown",
        location: "Johannesburg, South Africa",
        description: "Diamond Crown provides a royal experience in Johannesburg with elegant rooms and exceptional service.",
        priceStarting: 600,
        image: "/images/diamond-crown.jpg",
        rating: 4.7,
        amenities: ["Luxury Suites", "Fine Dining", "Conference Room", "Spa"]
    },
];

const mockService = {
    async getHotels(searchParams?: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        let filteredHotels = [...mockHotels];

        if (searchParams?.destination) {
            filteredHotels = filteredHotels.filter(hotel =>
                hotel.location.toLowerCase().includes(searchParams.destination!.toLowerCase())
            );
        }

        if (searchParams?.minPrice) {
            filteredHotels = filteredHotels.filter(hotel =>
                hotel.priceStarting >= searchParams.minPrice!
            );
        }

        if (searchParams?.maxPrice) {
            filteredHotels = filteredHotels.filter(hotel =>
                hotel.priceStarting <= searchParams.maxPrice!
            );
        }

        const page = searchParams?.page || 1;
        const limit = searchParams?.limit || 10;
        const startIndex = (page - 1) * limit;
        const paginatedHotels = filteredHotels.slice(startIndex, startIndex + limit);

        return {
            success: true,
            message: 'Hotels fetched successfully',
            data: {
                hotels: paginatedHotels,
                total: filteredHotels.length,
                page,
                limit,
                hasMore: startIndex + limit < filteredHotels.length
            }
        };
    },

    async getFeaturedHotels(): Promise<ApiResponse<Hotel[]>> {
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            success: true,
            message: 'Featured hotels fetched successfully',
            data: mockHotels.slice(0, 3)
        };
    },

    async getHotelById(id: string): Promise<ApiResponse<Hotel>> {
        await new Promise(resolve => setTimeout(resolve, 500));

        const hotel = mockHotels.find(h => h.id === id);
        if (hotel) {
            return {
                success: true,
                message: 'Hotel fetched successfully',
                data: hotel
            };
        } else {
            return {
                success: false,
                message: 'Hotel not found',
                data: {} as Hotel
            };
        }
    },

    async trackHotelView(hotelId: string): Promise<void> {
        console.log('Tracking hotel view:', hotelId);
        await new Promise(resolve => setTimeout(resolve, 100));
    },

    async trackHotelClick(hotelId: string): Promise<void> {
        console.log('Tracking hotel click:', hotelId);
        await new Promise(resolve => setTimeout(resolve, 100));
    },

    async searchHotels(params: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        return this.getHotels(params);
    }
};

const apiService = {
    async getHotels(searchParams?: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        try {
            // Build query parameters
            const queryParams = new URLSearchParams();
            
            if (searchParams?.destination) {
                queryParams.append('city', searchParams.destination);
            }
            if (searchParams?.minPrice) {
                queryParams.append('minPrice', searchParams.minPrice.toString());
            }
            if (searchParams?.maxPrice) {
                queryParams.append('maxPrice', searchParams.maxPrice.toString());
            }
            if (searchParams?.page) {
                queryParams.append('page', searchParams.page.toString());
            }
            if (searchParams?.limit) {
                queryParams.append('limit', searchParams.limit.toString());
            }

            const endpoint = `/hotels${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            
            const response = await apiClient.get<ApiResponse<HotelSearchResponse>>(endpoint);
            return response;
        } catch (error) {
            console.error('API Error fetching hotels:', error);
            throw error;
        }
    },

    async getFeaturedHotels(): Promise<ApiResponse<Hotel[]>> {
        try {

            const response = await apiClient.get<ApiResponse<HotelSearchResponse>>('/hotels');
            
            if (response.success) {
                const featuredHotels = response.data.hotels
                    .filter(hotel => hotel.rating && hotel.rating >= 4.5)
                    .slice(0, 3);
                
                return {
                    success: true,
                    message: 'Featured hotels fetched successfully',
                    data: featuredHotels
                };
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('API Error fetching featured hotels:', error);
            throw error;
        }
    },

    async getHotelById(id: string): Promise<ApiResponse<Hotel>> {
        try {
            const response = await apiClient.get<ApiResponse<Hotel>>(`/hotels/${id}`);
            return response;
        } catch (error) {
            console.error('API Error fetching hotel:', error);
            throw error;
        }
    },

    async trackHotelView(hotelId: string): Promise<void> {
        try {
            // If you have analytics endpoint, use it here
            console.log('Tracking hotel view via API:', hotelId);
            await apiClient.post('/analytics/hotel-view', { hotelId });
        } catch (error) {
            console.error('API Error tracking hotel view:', error);
            // Don't throw for analytics errors
        }
    },

    async trackHotelClick(hotelId: string): Promise<void> {
        try {
            // If you have analytics endpoint, use it here
            console.log('Tracking hotel click via API:', hotelId);
            await apiClient.post('/analytics/hotel-click', { hotelId });
        } catch (error) {
            console.error('API Error tracking hotel click:', error);
            // Don't throw for analytics errors
        }
    },

    async searchHotels(params: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        try {
            // Use the search endpoint if available, otherwise use getHotels with params
            const queryParams = new URLSearchParams();
            
            if (params.destination) {
                queryParams.append('search', params.destination);
            }
            if (params.minPrice) {
                queryParams.append('minPrice', params.minPrice.toString());
            }
            if (params.maxPrice) {
                queryParams.append('maxPrice', params.maxPrice.toString());
            }
            if (params.page) {
                queryParams.append('page', params.page.toString());
            }
            if (params.limit) {
                queryParams.append('limit', params.limit.toString());
            }

            const endpoint = `/hotels${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            
            const response = await apiClient.get<ApiResponse<HotelSearchResponse>>(endpoint);
            return response;
        } catch (error) {
            console.error('API Error searching hotels:', error);
            throw error;
        }
    }
};

export const hotelService = {
    async getHotels(searchParams?: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getHotels(searchParams);
            }
            return await apiService.getHotels(searchParams);
        } catch (error) {
            console.error('Error in getHotels:', error);
            // Fallback to mock data on error
            return await mockService.getHotels(searchParams);
        }
    },

    async getFeaturedHotels(): Promise<ApiResponse<Hotel[]>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getFeaturedHotels();
            }
            return await apiService.getFeaturedHotels();
        } catch (error) {
            console.error('Error in getFeaturedHotels:', error);
            return await mockService.getFeaturedHotels();
        }
    },

    async getHotelById(id: string): Promise<ApiResponse<Hotel>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getHotelById(id);
            }
            return await apiService.getHotelById(id);
        } catch (error) {
            console.error('Error in getHotelById:', error);
            return await mockService.getHotelById(id);
        }
    },

    async trackHotelView(hotelId: string): Promise<void> {
        try {
            if (USE_MOCK_DATA) {
                await mockService.trackHotelView(hotelId);
            } else {
                await apiService.trackHotelView(hotelId);
            }
        } catch (error) {
            console.error('Error in trackHotelView:', error);
          
        }
    },

    async trackHotelClick(hotelId: string): Promise<void> {
        try {
            if (USE_MOCK_DATA) {
                await mockService.trackHotelClick(hotelId);
            } else {
                await apiService.trackHotelClick(hotelId);
            }
        } catch (error) {
            console.error('Error in trackHotelClick:', error);
      
        }
    },

    async searchHotels(params: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.searchHotels(params);
            }
            return await apiService.searchHotels(params);
        } catch (error) {
            console.error('Error in searchHotels:', error);
            return await mockService.searchHotels(params);
        }
    },


    async getHotelsByCity(city: string): Promise<ApiResponse<HotelSearchResponse>> {
        return this.getHotels({ destination: city });
    },

    async getHotelsByPriceRange(minPrice: number, maxPrice: number): Promise<ApiResponse<HotelSearchResponse>> {
        return this.getHotels({ minPrice, maxPrice });
    }
};

// Export individual functions for convenience
export const getHotels = hotelService.getHotels;
export const getFeaturedHotels = hotelService.getFeaturedHotels;
export const getHotelById = hotelService.getHotelById;
export const searchHotels = hotelService.searchHotels;
export const trackHotelView = hotelService.trackHotelView;
export const trackHotelClick = hotelService.trackHotelClick;

export default hotelService;

