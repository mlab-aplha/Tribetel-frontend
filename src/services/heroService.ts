import { SearchParams, AvailabilityResponse, User } from '../components/types/common';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const heroService = {
    async checkAvailability(searchParams: SearchParams): Promise<AvailabilityResponse> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/hotels/availability`, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     destination: searchParams.destination,
            //     checkIn: searchParams.checkIn?.toISOString(),
            //     checkOut: searchParams.checkOut?.toISOString(),
            //     guests: searchParams.guests || 1,
            //     rooms: searchParams.rooms || 1
            //   })
            // });
            // 
            // if (!response.ok) {
            //   throw new Error('Failed to check availability');
            // }
            // 
            // return await response.json();

            await new Promise(resolve => setTimeout(resolve, 1500));

            if (searchParams.destination.toLowerCase().includes('cape town') ||
                searchParams.destination.toLowerCase().includes('johannesburg') ||
                searchParams.destination.toLowerCase().includes('durban')) {
                return {
                    available: true,
                    totalResults: 12,
                    hotels: [
                        {
                            id: "1",
                            name: "The Fly Stay",
                            location: searchParams.destination,
                            price: 250,
                            availableRooms: 5,
                            image: "/images/fly-stay.jpg",
                            rating: 4.5,
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
            // TODO: Replace with actual API call
            // const response = await fetch(`${API_BASE_URL}/user/profile`, {
            //   headers: {
            //     'Authorization': `Bearer ${token}`
            //   }
            // });
            // 
            // if (!response.ok) {
            //   throw new Error('Failed to fetch user data');
            // }
            // 
            // return await response.json();

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
            // TODO: Replace with actual API call
            // const response = await fetch(`${API_BASE_URL}/destinations/popular`);
            // if (!response.ok) {
            //   throw new Error('Failed to fetch destinations');
            // }
            // const data = await response.json();
            // return data.destinations;

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
            // TODO: Replace with actual API call
            // await fetch(`${API_BASE_URL}/analytics/search`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     ...searchParams,
            //     timestamp: new Date().toISOString(),
            //     userAgent: navigator.userAgent
            //   })
            // });

            console.log('Search tracked:', searchParams);
        } catch (error) {
            console.error('Error tracking search:', error);
        }
    },

    async getUnavailableDates(destination: string): Promise<Date[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`${API_BASE_URL}/availability/unavailable-dates?destination=${encodeURIComponent(destination)}`);
            // if (!response.ok) {
            //   throw new Error('Failed to fetch unavailable dates');
            // }
            // const data = await response.json();
            // return data.unavailableDates.map((dateStr: string) => new Date(dateStr));

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