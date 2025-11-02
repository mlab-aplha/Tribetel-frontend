import { Room, ApiResponse, RoomSearchParams, RoomSearchResponse } from '../components/types/common';

// Configuration for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const mockRooms: Room[] = [
    {
        id: "1",
        title: "Luxury Suite with Ocean View",
        description: "Spacious suite with breathtaking ocean views, king-sized bed, and premium amenities.",
        pricePerNight: 1200,
        image: "/images/luxury-suite.jpg",
        location: "Cape Town, South Africa",
        rating: 4.8,
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Ocean View", "Mini Bar", "Air Conditioning"],
        maxGuests: 3,
        available: true,
        features: ["King Size Bed", "Ocean View", "Private Balcony", "Jacuzzi"],
        type: "Suite"
    },
    {
        id: "2",
        title: "Deluxe Room with Mountain View",
        description: "Comfortable room with stunning mountain views, perfect for nature lovers.",
        pricePerNight: 800,
        image: "/images/deluxe-room.jpg",
        location: "Drakensberg, South Africa",
        rating: 4.5,
        amenities: ["Free WiFi", "Mountain View", "Breakfast Included", "Parking"],
        maxGuests: 2,
        available: true,
        features: ["Queen Size Bed", "Mountain View", "Work Desk", "Coffee Maker"],
        type: "Deluxe"
    },
    {
        id: "3",
        title: "Executive Business Room",
        description: "Modern room designed for business travelers with dedicated workspace and high-speed internet.",
        pricePerNight: 950,
        image: "/images/executive-room.jpg",
        location: "Johannesburg, South Africa",
        rating: 4.6,
        amenities: ["Free WiFi", "Business Center", "Airport Shuttle", "Fitness Center"],
        maxGuests: 2,
        available: true,
        features: ["King Size Bed", "Work Desk", "High-Speed WiFi", "Meeting Area"],
        type: "Executive"
    },
    {
        id: "4",
        title: "Family Suite",
        description: "Spacious suite perfect for families, with separate living area and child-friendly amenities.",
        pricePerNight: 1500,
        image: "/images/family-suite.jpg",
        location: "Sun City, South Africa",
        rating: 4.7,
        amenities: ["Free WiFi", "Swimming Pool", "Kids Club", "Family Activities"],
        maxGuests: 5,
        available: false,
        features: ["Two Bedrooms", "Living Area", "Kitchenette", "Child Safety"],
        type: "Family Suite"
    }
];

export const roomService = {
    async getRoomById(id: string): Promise<ApiResponse<Room>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/rooms/${id}`);
            // const data = await response.json();
            // return data;

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

    async getRooms(searchParams?: RoomSearchParams): Promise<ApiResponse<RoomSearchResponse>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const queryParams = new URLSearchParams(searchParams as any);
            // const response = await fetch(`${API_BASE_URL}/rooms?${queryParams}`);
            // const data = await response.json();
            // return data;

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

            return {
                success: true,
                message: 'Rooms fetched successfully',
                data: {
                    rooms: paginatedRooms,
                    total: filteredRooms.length,
                    page,
                    limit,
                    hasMore: startIndex + limit < filteredRooms.length
                }
            };
        } catch (error) {
            console.error('Error fetching rooms:', error);
            return {
                success: false,
                message: 'Failed to fetch rooms',
                data: {
                    rooms: [],
                    total: 0,
                    page: 1,
                    limit: 12,
                    hasMore: false
                }
            };
        }
    },

    async getFeaturedRooms(): Promise<ApiResponse<Room[]>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/rooms/featured`);
            // const data = await response.json();
            // return data;

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

    async checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<ApiResponse<{ available: boolean; message?: string }>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/availability`, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ checkIn, checkOut }),
            // });
            // const data = await response.json();
            // return data;

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
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/similar?limit=${limit}`);
            // const data = await response.json();
            // return data;

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
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/rooms/types`);
            // const data = await response.json();
            // return data;

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
    }
};

export const getRoomById = roomService.getRoomById;
export const getRooms = roomService.getRooms;
export const getFeaturedRooms = roomService.getFeaturedRooms;
export const checkAvailability = roomService.checkAvailability;
export const getSimilarRooms = roomService.getSimilarRooms;
export const getRoomTypes = roomService.getRoomTypes;