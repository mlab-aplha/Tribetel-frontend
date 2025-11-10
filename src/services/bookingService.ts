import { BookingRequest, BookingResponse, BookingConfirmationData, ApiResponse } from '../components/types/booking';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tribetel-frontend.onrender.com/api';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_URL;

const mockBookings: BookingConfirmationData[] = [
    {
        id: "1",
        roomId: "1",
        bookingNumber: "BK-TR-2024-001",
        fullName: "John Smith",
        roomTitle: "Luxury Suite with Ocean View",
        checkIn: "2024-12-15",
        checkOut: "2024-12-18",
        nights: 3,
        guests: 2,
        total: 3600,
        status: "confirmed",
        paymentStatus: "paid",
        email: "john.smith@tritel.co.za",
        confirmedAt: "2024-11-20T10:30:00Z",
        specialRequests: "Early check-in requested if possible",
        customerPhone: "+27 76 123 4567"
    },
];

const datesOverlap = (start1: string, end1: string, start2: string, end2: string): boolean => {
    const d1 = new Date(start1);
    const d2 = new Date(end1);
    const d3 = new Date(start2);
    const d4 = new Date(end2);
    return d1 < d4 && d2 > d3;
};

const apiClient = {
    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add authorization header
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    },

    get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    },

    post<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    put<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    },
};

const mockService = {
    async getBookingConfirmation(id: string): Promise<ApiResponse<{ booking: BookingConfirmationData }>> {
        await new Promise(resolve => setTimeout(resolve, 600));

        const booking = mockBookings.find(booking =>
            booking.id === id ||
            booking.bookingNumber === id ||
            booking.email.includes(id)
        );

        if (booking) {
            return {
                success: true,
                message: 'Booking confirmation fetched successfully',
                data: { booking }
            };
        } else {
            return {
                success: false,
                message: 'Booking not found',
                data: {
                    booking: {
                        id: '',
                        roomId: '',
                        bookingNumber: '',
                        fullName: '',
                        roomTitle: '',
                        checkIn: '',
                        checkOut: '',
                        nights: 0,
                        guests: 0,
                        total: 0,
                        status: 'pending',
                        paymentStatus: 'pending',
                        email: '',
                        confirmedAt: '',
                        specialRequests: '',
                        customerPhone: ''
                    } as BookingConfirmationData
                }
            };
        }
    },

    async getBookingsByEmail(email: string): Promise<ApiResponse<BookingConfirmationData[]>> {
        await new Promise(resolve => setTimeout(resolve, 500));

        const userBookings = mockBookings.filter(booking =>
            booking.email.toLowerCase() === email.toLowerCase()
        );

        return {
            success: true,
            message: 'Bookings fetched successfully',
            data: userBookings
        };
    },

    async createBooking(bookingRequest: BookingRequest): Promise<ApiResponse<BookingResponse>> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const customerEmail = bookingRequest.customerEmail ||
            `${bookingRequest.customerName.toLowerCase().replace(/\s+/g, '.')}@tritel.co.za`;

        const newBooking: BookingResponse = {
            id: Math.random().toString(36).substr(2, 9),
            roomId: bookingRequest.roomId,
            roomTitle: 'Mock Room Title',
            checkIn: bookingRequest.checkIn,
            checkOut: bookingRequest.checkOut,
            guests: bookingRequest.guests,
            nights: bookingRequest.nights,
            totalAmount: bookingRequest.totalPrice,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            specialRequests: bookingRequest.specialRequests || '',
            customerName: bookingRequest.customerName,
            customerEmail: customerEmail,
            customerPhone: bookingRequest.customerPhone || ''
        };

        const confirmation: BookingConfirmationData = {
            id: newBooking.id,
            roomId: newBooking.roomId,
            bookingNumber: `BK-TR-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            fullName: bookingRequest.customerName,
            roomTitle: newBooking.roomTitle,
            checkIn: newBooking.checkIn,
            checkOut: newBooking.checkOut,
            nights: newBooking.nights,
            guests: newBooking.guests,
            total: newBooking.totalAmount,
            status: newBooking.status,
            paymentStatus: 'pending',
            email: customerEmail,
            confirmedAt: new Date().toISOString(),
            specialRequests: newBooking.specialRequests || '',
            customerPhone: newBooking.customerPhone || ''
        };
        mockBookings.push(confirmation);

        return {
            success: true,
            message: 'Booking created successfully',
            data: newBooking
        };
    },

    async getUserBookings(userId: string): Promise<ApiResponse<BookingConfirmationData[]>> {
        await new Promise(resolve => setTimeout(resolve, 700));

        const userBookings = mockBookings.filter(booking =>
            booking.email.includes(userId) || booking.id === userId
        );

        return {
            success: true,
            message: 'User bookings fetched successfully',
            data: userBookings
        };
    },

    async cancelBooking(bookingId: string): Promise<ApiResponse<{ message: string }>> {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Cancelling booking:', bookingId);

        const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            mockBookings[bookingIndex].status = 'cancelled';
            mockBookings[bookingIndex].paymentStatus = 'failed';
            return {
                success: true,
                message: 'Booking cancelled successfully',
                data: { message: `Booking ${bookingId} has been cancelled` }
            };
        }

        return {
            success: false,
            message: 'Booking not found',
            data: { message: 'Booking not found' }
        };
    },

    async updateBooking(bookingId: string, updates: Partial<BookingRequest>): Promise<ApiResponse<BookingConfirmationData>> {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Updating booking:', bookingId, updates);

        const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            const updatedBooking = {
                ...mockBookings[bookingIndex],
                fullName: updates.customerName || mockBookings[bookingIndex].fullName,
                customerPhone: updates.customerPhone || mockBookings[bookingIndex].customerPhone,
                specialRequests: updates.specialRequests || mockBookings[bookingIndex].specialRequests
            };

            mockBookings[bookingIndex] = updatedBooking;

            return {
                success: true,
                message: 'Booking updated successfully',
                data: updatedBooking
            };
        }

        return {
            success: false,
            message: 'Booking not found',
            data: {
                id: '',
                roomId: '',
                bookingNumber: '',
                fullName: '',
                roomTitle: '',
                checkIn: '',
                checkOut: '',
                nights: 0,
                guests: 0,
                total: 0,
                status: 'pending',
                paymentStatus: 'pending',
                email: '',
                confirmedAt: '',
                specialRequests: '',
                customerPhone: ''
            } as BookingConfirmationData
        };
    },

    async checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<ApiResponse<{ available: boolean; conflictingBookings?: string[] }>> {
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log('Checking availability for room:', roomId, 'from', checkIn, 'to', checkOut);

        const conflictingBookings = mockBookings.filter(booking =>
            booking.roomId === roomId &&
            booking.status !== 'cancelled' &&
            datesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut)
        );

        const isAvailable = conflictingBookings.length === 0;

        return {
            success: true,
            message: 'Availability checked successfully',
            data: {
                available: isAvailable,
                conflictingBookings: isAvailable ? undefined : conflictingBookings.map(b => b.bookingNumber)
            }
        };
    }
};

const apiService = {
    async getBookingConfirmation(id: string): Promise<ApiResponse<{ booking: BookingConfirmationData }>> {
        return await apiClient.get<ApiResponse<{ booking: BookingConfirmationData }>>(`/bookings/${id}/confirmation`);
    },

    async getBookingsByEmail(email: string): Promise<ApiResponse<BookingConfirmationData[]>> {
        return await apiClient.get<ApiResponse<BookingConfirmationData[]>>(`/bookings?email=${encodeURIComponent(email)}`);
    },

    async createBooking(bookingRequest: BookingRequest): Promise<ApiResponse<BookingResponse>> {
        return await apiClient.post<ApiResponse<BookingResponse>>('/bookings', bookingRequest);
    },

    async getUserBookings(userId: string): Promise<ApiResponse<BookingConfirmationData[]>> {
        return await apiClient.get<ApiResponse<BookingConfirmationData[]>>(`/users/${userId}/bookings`);
    },

    async cancelBooking(bookingId: string): Promise<ApiResponse<{ message: string }>> {
        return await apiClient.delete<ApiResponse<{ message: string }>>(`/bookings/${bookingId}`);
    },

    async updateBooking(bookingId: string, updates: Partial<BookingRequest>): Promise<ApiResponse<BookingConfirmationData>> {
        return await apiClient.put<ApiResponse<BookingConfirmationData>>(`/bookings/${bookingId}`, updates);
    },

    async checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<ApiResponse<{ available: boolean; conflictingBookings?: string[] }>> {
        return await apiClient.get<ApiResponse<{ available: boolean; conflictingBookings?: string[] }>>(
            `/rooms/${roomId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`
        );
    }
};

export const bookingService = {
    async getBookingConfirmation(id: string): Promise<ApiResponse<{ booking: BookingConfirmationData }>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getBookingConfirmation(id);
            }
            return await apiService.getBookingConfirmation(id);
        } catch (error) {
            console.error('Error in getBookingConfirmation:', error);
            return await mockService.getBookingConfirmation(id);
        }
    },

    async getBookingsByEmail(email: string): Promise<ApiResponse<BookingConfirmationData[]>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getBookingsByEmail(email);
            }
            return await apiService.getBookingsByEmail(email);
        } catch (error) {
            console.error('Error in getBookingsByEmail:', error);
            return await mockService.getBookingsByEmail(email);
        }
    },

    async createBooking(bookingRequest: BookingRequest): Promise<ApiResponse<BookingResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.createBooking(bookingRequest);
            }
            return await apiService.createBooking(bookingRequest);
        } catch (error) {
            console.error('Error in createBooking:', error);
            return await mockService.createBooking(bookingRequest);
        }
    },

    async getUserBookings(userId: string): Promise<ApiResponse<BookingConfirmationData[]>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getUserBookings(userId);
            }
            return await apiService.getUserBookings(userId);
        } catch (error) {
            console.error('Error in getUserBookings:', error);
            return await mockService.getUserBookings(userId);
        }
    },

    async cancelBooking(bookingId: string): Promise<ApiResponse<{ message: string }>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.cancelBooking(bookingId);
            }
            return await apiService.cancelBooking(bookingId);
        } catch (error) {
            console.error('Error in cancelBooking:', error);
            return await mockService.cancelBooking(bookingId);
        }
    },

    async updateBooking(bookingId: string, updates: Partial<BookingRequest>): Promise<ApiResponse<BookingConfirmationData>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.updateBooking(bookingId, updates);
            }
            return await apiService.updateBooking(bookingId, updates);
        } catch (error) {
            console.error('Error in updateBooking:', error);
            return await mockService.updateBooking(bookingId, updates);
        }
    },

    async checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<ApiResponse<{ available: boolean; conflictingBookings?: string[] }>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.checkAvailability(roomId, checkIn, checkOut);
            }
            return await apiService.checkAvailability(roomId, checkIn, checkOut);
        } catch (error) {
            console.error('Error in checkAvailability:', error);
            return await mockService.checkAvailability(roomId, checkIn, checkOut);
        }
    }
};

export const bookingConfig = {
    isUsingMockData: USE_MOCK_DATA,
    apiBaseUrl: API_BASE_URL,

    useRealAPI() {
        console.log('Switching to real API mode');
        localStorage.setItem('use_real_api', 'true');
    },

    useMockAPI() {
        console.log('Switching to mock API mode');
        localStorage.setItem('use_real_api', 'false');
    }
};

export const getBookingConfirmation = bookingService.getBookingConfirmation;
export const getBookingsByEmail = bookingService.getBookingsByEmail;
export const createBooking = bookingService.createBooking;
export const getUserBookings = bookingService.getUserBookings;
export const cancelBooking = bookingService.cancelBooking;
export const updateBooking = bookingService.updateBooking;
export const checkAvailability = bookingService.checkAvailability;