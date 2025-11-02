import { SearchDestination, PriceEstimate, SearchParams } from '../components/types/common';

// Configuration for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class SearchService {
    private async fetchAPI(endpoint: string, options: RequestInit = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    async getDestinations(query?: string): Promise<SearchDestination[]> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const endpoint = query ? `/destinations?q=${encodeURIComponent(query)}` : '/destinations';
            // const response = await this.fetchAPI(endpoint);
            // return response.data || response;

            await new Promise(resolve => setTimeout(resolve, 300));

            const destinations: SearchDestination[] = [
                { id: "1", name: "Cape Town, South Africa", type: "city" },
                { id: "2", name: "Johannesburg, South Africa", type: "city" },
                { id: "3", name: "Durban, South Africa", type: "city" },
                { id: "4", name: "Mbombela, South Africa", type: "city" },
                { id: "5", name: "Pretoria, South Africa", type: "city" },
                { id: "6", name: "Port Elizabeth, South Africa", type: "city" },
                { id: "7", name: "Kimberley, South Africa", type: "city" },
                { id: "8", name: "Sun City, South Africa", type: "resort" }
            ];

            if (query) {
                return destinations.filter(dest =>
                    dest.name.toLowerCase().includes(query.toLowerCase())
                );
            }

            return destinations;
        } catch (error) {
            console.error('Error fetching destinations:', error);
            return [];
        }
    }

    async calculatePrice(params: {
        destinationId: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms?: number;
    }): Promise<PriceEstimate> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await this.fetchAPI('/prices/estimate', {
            //   method: 'POST',
            //   body: JSON.stringify(params),
            // });
            // return response.data || response;

            await new Promise(resolve => setTimeout(resolve, 500));

            const nights = Math.ceil((new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) / (1000 * 60 * 60 * 24));
            const basePrice = 800;
            const total = basePrice * nights * (params.rooms || 1);

            return {
                minPrice: total * 0.8,
                maxPrice: total * 1.2,
                averagePrice: total,
                currency: 'ZAR'
            };
        } catch (error) {
            console.error('Error calculating price:', error);
            throw new Error('Failed to calculate price estimate');
        }
    }

    async searchHotels(params: SearchParams): Promise<any> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await this.fetchAPI('/hotels/search', {
            //   method: 'POST',
            //   body: JSON.stringify(params),
            // });
            // return response.data || response;

            await new Promise(resolve => setTimeout(resolve, 800));

            // Mock search results
            return {
                hotels: [
                    {
                        id: "1",
                        name: "The Fly Stay",
                        location: params.destination,
                        price: 1200,
                        rating: 4.5,
                        available: true
                    }
                ],
                total: 1,
                page: 1