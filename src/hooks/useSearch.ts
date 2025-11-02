import { useState, useCallback } from 'react';
import { SearchDestination, PriceEstimate, SearchParams } from '../components/common/SearchBar/searchBar';
import { searchService } from '../services/searchService';

export const useSearch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDestinations = useCallback(async (query?: string): Promise<SearchDestination[]> => {
        try {
            setLoading(true);
            setError(null);
            const destinations = await searchService.getDestinations(query);
            return destinations;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch destinations';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const calculatePrice = useCallback(async (params: {
        destinationId: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms?: number;
    }): Promise<PriceEstimate> => {
        try {
            setLoading(true);
            setError(null);
            const estimate = await searchService.calculatePrice(params);
            return estimate;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Price calculation failed';
            setError(errorMessage);

            const nights = Math.ceil(
                (new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) / (1000 * 3600 * 24)
            );

            return {
                min: 500 * nights,
                max: 1500 * nights,
                currency: 'ZAR',
                nights,
                isEstimated: true
            };
        } finally {
            setLoading(false);
        }
    }, []);

    const searchHotels = useCallback(async (params: SearchParams): Promise<any> => {
        try {
            setLoading(true);
            setError(null);
            const results = await searchService.searchHotels(params);
            return results;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Search failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        fetchDestinations,
        calculatePrice,
        searchHotels,
        clearError: () => setError(null)
    };
};