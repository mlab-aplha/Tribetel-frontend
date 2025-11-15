import { Room } from '@/components/types/room';
import { 
    ApiResponse, 
    RoomSearchResponse, 
    PaginationInfo 
} from '@/components/types/api';

const mockRooms: Room[] = [
    {
        id: '1',
        title: 'Luxury Suite with Ocean View',
        description: 'Spacious suite with breathtaking ocean views, king-sized bed, and premium amenities.',
        pricePerNight: 1200,
        image: '/images/luxury-suite.jpg',
        location: 'Cape Town, South Africa',
        rating: 4.8,
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Ocean View', 'Mini Bar', 'Air Conditioning'],
        maxGuests: 3,
        available: true,
        features: ['King Size Bed', 'Ocean View', 'Private Balcony', 'Jacuzzi'],
        type: 'Suite',
        images: ['/images/luxury-suite-1.jpg', '/images/luxury-suite-2.jpg'],
        size: '45m²',
        bedType: 'King',
        view: 'Ocean',
        bathroom: 'Marble'
    },
    {
        id: '2',
        title: 'Deluxe Room with Mountain View',
        description: 'Comfortable room with stunning mountain views, perfect for nature lovers.',
        pricePerNight: 800,
        image: '/images/deluxe-room.jpg',
        location: 'Drakensberg, South Africa',
        rating: 4.5,
        amenities: ['Free WiFi', 'Mountain View', 'Breakfast Included', 'Parking'],
        maxGuests: 2,
        available: true,
        features: ['Queen Size Bed', 'Mountain View', 'Work Desk', 'Coffee Maker'],
        type: 'Deluxe',
        images: ['/images/deluxe-room-1.jpg', '/images/deluxe-room-2.jpg'],
        size: '35m²',
        bedType: 'Queen',
        view: 'Mountain',
        bathroom: 'Standard'
    },
    {
        id: '3',
        title: 'Executive Business Room',
        description: 'Modern room designed for business travelers with dedicated workspace and high-speed internet.',
        pricePerNight: 950,
        image: '/images/executive-room.jpg',
        location: 'Johannesburg, South Africa',
        rating: 4.6,
        amenities: ['Free WiFi', 'Business Center', 'Airport Shuttle', 'Fitness Center'],
        maxGuests: 2,
        available: true,
        features: ['King Size Bed', 'Work Desk', 'High-Speed WiFi', 'Meeting Area'],
        type: 'Executive',
        images: ['/images/executive-room-1.jpg', '/images/executive-room-2.jpg'],
        size: '40m²',
        bedType: 'King',
        view: 'City',
        bathroom: 'Standard'
    },
    {
        id: '4',
        title: 'Family Suite',
        description: 'Spacious suite perfect for families, with separate living area and child-friendly amenities.',
        pricePerNight: 1500,
        image: '/images/family-suite.jpg',
        location: 'Sun City, South Africa',
        rating: 4.7,
        amenities: ['Free WiFi', 'Swimming Pool', 'Kids Club', 'Family Activities'],
        maxGuests: 5,
        available: false,
        features: ['Two Bedrooms', 'Living Area', 'Kitchenette', 'Child Safety'],
        type: 'Family Suite',
        images: ['/images/family-suite-1.jpg', '/images/family-suite-2.jpg'],
        size: '60m²',
        bedType: 'Double',
        view: 'Garden',
        bathroom: 'Family'
    }
];
interface RoomSearchParams {
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

export const roomService = {
    // Get all rooms 
    getAllRooms: async (): Promise<Room[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockRooms);
            }, 500);
        });
    },

    // Get room by ID 
    getRoomById: async (id: string): Promise<Room | null> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const room = mockRooms.find(room => room.id === id);
                resolve(room || null);
            }, 300);
        });
    },

    // Search rooms 
    searchRooms: async (params: {
        location?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: number;
        minPrice?: number;
        maxPrice?: number;
        type?: string;
        amenities?: string[];
    }): Promise<Room[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filteredRooms = [...mockRooms];

                // Filter by location
                if (params.location) {
                    filteredRooms = filteredRooms.filter(room => 
                        room.location.toLowerCase().includes(params.location!.toLowerCase())
                    );
                }

                // Filter by price
                if (params.minPrice !== undefined) {
                    filteredRooms = filteredRooms.filter(room => 
                        room.pricePerNight >= params.minPrice!
                    );
                }
                if (params.maxPrice !== undefined) {
                    filteredRooms = filteredRooms.filter(room => 
                        room.pricePerNight <= params.maxPrice!
                    );
                }

                // Filter by guests
                if (params.guests !== undefined) {
                    filteredRooms = filteredRooms.filter(room => 
                        room.maxGuests >= params.guests!
                    );
                }

                // Filter by type
                if (params.type) {
                    filteredRooms = filteredRooms.filter(room => 
                        room.type === params.type
                    );
                }

                // Filter by amenities
                if (params.amenities && params.amenities.length > 0) {
                    filteredRooms = filteredRooms.filter(room =>
                        params.amenities!.every(amenity => 
                            room.amenities.includes(amenity)
                        )
                    );
                }

                // Only return available rooms
                filteredRooms = filteredRooms.filter(room => room.available);

                resolve(filteredRooms);
            }, 500);
        });
    },
    async getRoomsWithResponse(searchParams?: RoomSearchParams): Promise<ApiResponse<RoomSearchResponse>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            let filteredRooms = [...mockRooms];

            if (searchParams?.location) {
                filteredRooms = filteredRooms.filter(room =>
                    room.location.toLowerCase().includes(searchParams.location!.toLowerCase())
                );
            }

            if (searchParams?.minPrice) {
                filteredRooms = filteredRooms.filter(room =>
                    room.pricePerNight >= searchParams.minPrice!
                );
            }

            if (searchParams?.maxPrice) {
                filteredRooms = filteredRooms.filter(room =>
                    room.pricePerNight <= searchParams.maxPrice!
                );
            }

            if (searchParams?.guests) {
                filteredRooms = filteredRooms.filter(room =>
                    room.maxGuests >= searchParams.guests!
                );
            }

            if (searchParams?.type) {
                filteredRooms = filteredRooms.filter(room =>
                    room.type?.toLowerCase().includes(searchParams.type!.toLowerCase())
                );
            }

            const page = searchParams?.page || 1;
            const limit = searchParams?.limit || 12;
            const startIndex = (page - 1) * limit;
            const paginatedRooms = filteredRooms.slice(startIndex, startIndex + limit);

            const paginationInfo: PaginationInfo = {
                page,
                totalPages: Math.ceil(filteredRooms.length / limit),
                totalResults: filteredRooms.length,
                hasMore: startIndex + limit < filteredRooms.length
            };

            const response: RoomSearchResponse = {
                rooms: paginatedRooms,
                total: filteredRooms.length,
                page,
                limit,
                hasMore: startIndex + limit < filteredRooms.length
            };

            return {
                success: true,
                message: 'Rooms fetched successfully',
                data: response,
                pagination: paginationInfo
            };
        } catch (error) {
            console.error('Error fetching rooms:', error);
            const errorResponse: RoomSearchResponse = {
                rooms: [],
                total: 0,
                page: 1,
                limit: 12,
                hasMore: false
            };
            
            return {
                success: false,
                message: 'Failed to fetch rooms',
                data: errorResponse
            };
        }
    },

    async getRoomByIdWithResponse(id: string): Promise<ApiResponse<Room>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const room = mockRooms.find(room => room.id === id);

            if (room) {
                return {
                    success: true,
                    message: 'Room fetched successfully',
                    data: room
                };
            } else {
                return {
                    success: false,
                    message: 'Room not found',
                    data: {} as Room
                };
            }
        } catch (error) {
            console.error('Error fetching room:', error);
            return {
                success: false,
                message: 'Failed to fetch room details',
                data: {} as Room
            };
        }
    },

    async getFeaturedRoomsWithResponse(): Promise<ApiResponse<Room[]>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const featuredRooms = mockRooms.slice(0, 3);
            return {
                success: true,
                message: 'Featured rooms fetched successfully',
                data: featuredRooms
            };
        } catch (error) {
            console.error('Error fetching featured rooms:', error);
            return {
                success: false,
                message: 'Failed to fetch featured rooms',
                data: []
            };
        }
    },

    async checkAvailabilityWithResponse(roomId: string, checkIn: string, checkOut: string): Promise<ApiResponse<{ available: boolean; message?: string }>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 400));

            const room = mockRooms.find(r => r.id === roomId);

            if (!room) {
                return {
                    success: false,
                    message: 'Room not found',
                    data: { available: false }
                };
            }

            if (roomId === '4') {
                return {
                    success: true,
                    message: 'Availability checked successfully',
                    data: { available: false, message: 'This room is currently undergoing maintenance' }
                };
            }

            const today = new Date();
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            
            if (checkOutDate <= checkInDate) {
                return {
                    success: true,
                    message: 'Availability checked successfully',
                    data: { available: false, message: 'Check-out date must be after check-in date' }
                };
            }

            if (checkInDate < today) {
                return {
                    success: true,
                    message: 'Availability checked successfully',
                    data: { available: false, message: 'Check-in date cannot be in the past' }
                };
            }

            return {
                success: true,
                message: 'Availability checked successfully',
                data: { available: true }
            };
        } catch (error) {
            console.error('Error checking availability:', error);
            return {
                success: false,
                message: 'Failed to check availability',
                data: { available: false }
            };
        }
    },

    async getSimilarRooms(roomId: string, limit: number = 4): Promise<ApiResponse<Room[]>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 600));

            const currentRoom = mockRooms.find(room => room.id === roomId);
            if (!currentRoom) {
                return {
                    success: false,
                    message: 'Room not found',
                    data: []
                };
            }

            const similarRooms = mockRooms
                .filter(room =>
                    room.id !== roomId &&
                    room.type === currentRoom.type &&
                    room.available
                )
                .slice(0, limit);

            return {
                success: true,
                message: 'Similar rooms fetched successfully',
                data: similarRooms
            };
        } catch (error) {
            console.error('Error fetching similar rooms:', error);
            return {
                success: false,
                message: 'Failed to fetch similar rooms',
                data: []
            };
        }
    },

    async getRoomTypes(): Promise<ApiResponse<string[]>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const types = Array.from(new Set(mockRooms.map(room => room.type).filter(Boolean))) as string[];

            return {
                success: true,
                message: 'Room types fetched successfully',
                data: types
            };
        } catch (error) {
            console.error('Error fetching room types:', error);
            return {
                success: false,
                message: 'Failed to fetch room types',
                data: []
            };
        }
    },

    // Get rooms by location
    getRoomsByLocation: async (location: string): Promise<Room[]> => {
        return roomService.searchRooms({ location });
    },

    // Get featured rooms 
    getFeaturedRooms: async (): Promise<Room[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockRooms.filter(room => room.rating && room.rating >= 4.7));
            }, 300);
        });
    },

    // Check room availability 
    checkAvailability: async (roomId: string, checkIn: string, checkOut: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const room = mockRooms.find(r => r.id === roomId);
                
                const today = new Date();
                const checkInDate = new Date(checkIn);
                const checkOutDate = new Date(checkOut);
                
                const isValidDates = checkOutDate > checkInDate && checkInDate >= today;
                
                resolve(!!room && room.available && isValidDates);
            }, 200);
        });
    }
};
export const getRoomById = roomService.getRoomByIdWithResponse;
export const getRooms = roomService.getRoomsWithResponse;
export const getFeaturedRooms = roomService.getFeaturedRoomsWithResponse;
export const checkAvailability = roomService.checkAvailabilityWithResponse;
export const getSimilarRooms = roomService.getSimilarRooms;
export const getRoomTypes = roomService.getRoomTypes;

export default roomService;