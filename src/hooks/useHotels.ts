import { useState, useEffect } from 'react';
import { Hotel } from '../components/features/HotelListings/HotelListings';
import { hotelService, SearchParams, ApiResponse } from '../services/hotelService';

interface UseHotelsReturn {
    hotels: Hotel[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    searchHotels: (params: SearchParams) => Promise<void>;
}

export const useHotels = (initialParams?: SearchParams): UseHotelsReturn => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHotels = async (params?: SearchParams) => {
        try {
            setLoading(true);
            setError(null);
            const response: ApiResponse<Hotel[]> = await hotelService.getHotels(params);

            if (response.success) {
                setHotels(response.data);
            } else {
                setError(response.message || 'Failed to fetch hotels');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setHotels(getSampleHotels());
        } finally {
            setLoading(false);
        }
    };

    const searchHotels = async (params: SearchParams) => {
        try {
            setLoading(true);
            setError(null);
            const response: ApiResponse<Hotel[]> = await hotelService.searchHotels(params);

            if (response.success) {
                setHotels(response.data);
            } else {
                setError(response.message || 'Search failed');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels(initialParams);
    }, []);

    return {
        hotels,
        loading,
        error,
        refetch: () => fetchHotels(initialParams),
        searchHotels,
    };
};

const getSampleHotels = (): Hotel[] => [
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