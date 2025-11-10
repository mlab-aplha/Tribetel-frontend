import { SearchDestination, PriceEstimate, SearchParams } from '../components/types/common';

export class SearchService {
    async getDestinations(query?: string): Promise<SearchDestination[]> {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const destinations: SearchDestination[] = [
                { id: "1", name: "Cape Town, South Africa", type: "city" as const },
                { id: "2", name: "Johannesburg, South Africa", type: "city" as const },
                { id: "3", name: "Durban, South Africa", type: "city" as const },
                { id: "4", name: "Mbombela, South Africa", type: "city" as const },
                { id: "5", name: "Pretoria, South Africa", type: "city" as const },
                { id: "6", name: "Port Elizabeth, South Africa", type: "city" as const },
                { id: "7", name: "Kimberley, South Africa", type: "city" as const },
                { id: "8", name: "Sun City, South Africa", type: "resort" as const }
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
            await new Promise(resolve => setTimeout(resolve, 500));

            const nights = Math.ceil((new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) / (1000 * 60 * 60 * 24));
            const basePrice = 800;
            const total = basePrice * nights * (params.rooms || 1);

            return {
                min: total * 0.8,
                max: total * 1.2,
                currency: 'ZAR',
                nights: nights,
                isEstimated: true
            };
        } catch (error) {
            console.error('Error calculating price:', error);
            throw new Error('Failed to calculate price estimate');
        }
    }

    async searchHotels(params: SearchParams): Promise<any> {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

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
                page: 1,
                hasMore: false
            };
        } catch (error) {
            console.error('Error searching hotels:', error);
            throw new Error('Failed to search hotels');
        }
    }
}

export const searchService = new SearchService();