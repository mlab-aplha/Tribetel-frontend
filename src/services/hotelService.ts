import { Hotel, HotelSearchParams, HotelSearchResponse, ApiResponse } from './types';

const /**API_BASE_URL**/ = /**process.env.REACT_APP_API_URL**/;


export const hotelService = {
    /**
     * Fetch hotels with search parameters
     *  backend API call
     */
    async getHotels(searchParams?: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        try {

            // const response = await fetch(`${API_BASE_URL}/hotels?${new URLSearchParams(searchParams as any)}`);
            // const data = await response.json();
            // return data;

            // Mock implementation for now
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

            let filteredHotels = [...mockHotels];

            // Mock filtering based on search params
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
        } catch (error) {
            console.error('Error fetching hotels:', error);
            return {
                success: false,
                message: 'Failed to fetch hotels',
                data: {
                    hotels: [],
                    total: 0,
                    page: 1,
                    limit: 10,
                    hasMore: false
                }
            };
        }
    },

    /**actual backend API call
     */
    async getFeaturedHotels(): Promise<ApiResponse<Hotel[]>> {
        try {

            // const response = await fetch(`${API_BASE_URL}/hotels/featured`);
            // const data = await response.json();
            // return data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 500));

            return {
                success: true,
                message: 'Featured hotels fetched successfully',
                data: mockHotels.slice(0, 3)
            };
        } catch (error) {
            console.error('Error fetching featured hotels:', error);
            return {
                success: false,
                message: 'Failed to fetch featured hotels',
                data: []
            };
        }
    },

    /** backend API call
     */
    async getHotelById(id: string): Promise<ApiResponse<Hotel>> {
        try {

            // const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
            // const data = await response.json();
            // return data;

            // Mock implementation
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
        } catch (error) {
            console.error('Error fetching hotel:', error);
            return {
                success: false,
                message: 'Failed to fetch hotel',
                data: {} as Hotel
            };
        }
    },
}