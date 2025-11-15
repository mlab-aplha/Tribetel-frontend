import { Hotel, HotelSearchParams, HotelSearchResponse, ApiResponse } from '../components/types/common';

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

export const hotelService = {
    async getHotels(searchParams?: HotelSearchParams): Promise<ApiResponse<HotelSearchResponse>> {
        try {
            // const response = await fetch(`${API_BASE_URL}/hotels?${new URLSearchParams(searchParams as any)}`);
            // const data = await response.json();
            // return data;

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

    async getFeaturedHotels(): Promise<ApiResponse<Hotel[]>> {
        try {
            // const response = await fetch(`${API_BASE_URL}/hotels/featured`);
            // const data = await response.json();
            // return data;

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

    async getHotelById(id: string): Promise<ApiResponse<Hotel>> {
        try {
            // const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
            // const data = await response.json();
            // return data;

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

