import { useState, useEffect, useCallback } from 'react';
import {
    SearchDestination,
    SearchParams,
    PriceEstimate
} from '../components/types/common';

export interface UseSearchBarReturn {
    destination: string;
    filteredDestinations: SearchDestination[];
    isLoading: boolean;
    showDestinationDropdown: boolean;
    handleDestinationSelect: (dest: SearchDestination) => void;
    handleDestinationChange: (value: string) => void;
    handleDestinationFocus: () => void;
    closeDropdown: () => void;
    checkIn: string;
    setCheckIn: (date: string) => void;
    checkOut: string;
    setCheckOut: (date: string) => void;
    getMinCheckOutDate: () => string;
    guests: number;
    setGuests: (guests: number) => void;
    rooms: number;
    setRooms: (rooms: number) => void;
    priceEstimate: PriceEstimate | null;
    isCalculatingPrice: boolean;
    nights: number;
    formatPrice: (price: number, currency?: string) => string;
    handleSearch: (onSearch: (params: SearchParams) => void) => void;
}

export interface UseSearchBarProps {
    destinations?: SearchDestination[];
    initialDestinationId?: string;
    showRooms?: boolean;
    enablePriceEstimation?: boolean;
    fetchDestinations?: () => Promise<SearchDestination[]>;
    calculatePrice?: (params: {
        destinationId: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms?: number;
    }) => Promise<PriceEstimate>;
    onPriceEstimate?: (estimate: PriceEstimate | null) => void;
}
export const useDestinations = (
    initialDestinations: SearchDestination[] = [],
    initialDestinationId?: string,
    fetchDestinations?: () => Promise<SearchDestination[]>
) => {
    const [destination, setDestination] = useState('');
    const [destinationId, setDestinationId] = useState<string>('');
    const [availableDestinations, setAvailableDestinations] = useState<SearchDestination[]>(initialDestinations);
    const [filteredDestinations, setFilteredDestinations] = useState<SearchDestination[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
    useEffect(() => {
        const loadDestinations = async () => {
            if (fetchDestinations && availableDestinations.length === 0) {
                try {
                    setIsLoading(true);
                    const fetchedDestinations = await fetchDestinations();
                    setAvailableDestinations(fetchedDestinations);
                } catch (error) {
                    console.error('Failed to fetch destinations:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadDestinations();
    }, [fetchDestinations, availableDestinations.length]);
    useEffect(() => {
        if (initialDestinationId && availableDestinations.length > 0) {
            const initialDest = availableDestinations.find(dest => dest.id === initialDestinationId);
            if (initialDest) {
                setDestination(initialDest.name);
                setDestinationId(initialDest.id);
            }
        }
    }, [initialDestinationId, availableDestinations]);
    useEffect(() => {
        if (destination.trim() === '') {
            setFilteredDestinations(availableDestinations.slice(0, 5));
        } else {
            const filtered = availableDestinations.filter(dest =>
                dest.name.toLowerCase().includes(destination.toLowerCase()) ||
                dest.country?.toLowerCase().includes(destination.toLowerCase())
            ).slice(0, 5);
            setFilteredDestinations(filtered);
        }
    }, [destination, availableDestinations]);

    const handleDestinationSelect = useCallback((dest: SearchDestination) => {
        setDestination(dest.name);
        setDestinationId(dest.id);
        setShowDestinationDropdown(false);
    }, []);

    const handleDestinationChange = useCallback((value: string) => {
        setDestination(value);
        setDestinationId('');
        setShowDestinationDropdown(true);
    }, []);

    const handleDestinationFocus = useCallback(() => {
        setShowDestinationDropdown(true);
    }, []);

    const closeDropdown = useCallback(() => {
        setShowDestinationDropdown(false);
    }, []);

    return {
        destination,
        destinationId,
        setDestination,
        setDestinationId,
        availableDestinations,
        filteredDestinations,
        isLoading,
        showDestinationDropdown,
        setShowDestinationDropdown,
        handleDestinationSelect,
        handleDestinationChange,
        handleDestinationFocus,
        closeDropdown
    };
};

// Hook for price estimation
export const usePriceEstimation = (
    enablePriceEstimation: boolean,
    destinationId: string,
    checkIn: string,
    checkOut: string,
    guests: number,
    rooms: number,
    showRooms: boolean,
    calculatePrice?: (params: {
        destinationId: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms?: number;
    }) => Promise<PriceEstimate>,
    onPriceEstimate?: (estimate: PriceEstimate | null) => void
) => {
    const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
    const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);

    useEffect(() => {
        const estimatePrice = async () => {
            if (!enablePriceEstimation || !destinationId || !checkIn || !checkOut || !calculatePrice) {
                setPriceEstimate(null);
                onPriceEstimate?.(null);
                return;
            }

            try {
                setIsCalculatingPrice(true);
                const estimate = await calculatePrice({
                    destinationId,
                    checkIn,
                    checkOut,
                    guests,
                    rooms: showRooms ? rooms : undefined
                });
                setPriceEstimate(estimate);
                onPriceEstimate?.(estimate);
            } catch (error) {
                console.error('Price calculation failed:', error);
                setPriceEstimate(null);
                onPriceEstimate?.(null);
            } finally {
                setIsCalculatingPrice(false);
            }
        };

        const timeoutId = setTimeout(estimatePrice, 500);
        return () => clearTimeout(timeoutId);
    }, [
        enablePriceEstimation,
        destinationId,
        checkIn,
        checkOut,
        guests,
        rooms,
        showRooms,
        calculatePrice,
        onPriceEstimate
    ]);

    const resetPriceEstimate = useCallback(() => {
        setPriceEstimate(null);
        onPriceEstimate?.(null);
    }, [onPriceEstimate]);

    return {
        priceEstimate,
        isCalculatingPrice,
        resetPriceEstimate
    };
};
export const useSearchForm = (
    initialGuests: number = 2,
    initialRooms: number = 1
) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(initialGuests);
    const [rooms, setRooms] = useState(initialRooms);

    const getMinCheckOutDate = useCallback(() => {
        return checkIn || new Date().toISOString().split('T')[0];
    }, [checkIn]);

    const calculateNights = useCallback((): number => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const timeDiff = end.getTime() - start.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }, [checkIn, checkOut]);

    const resetForm = useCallback(() => {
        setCheckIn('');
        setCheckOut('');
        setGuests(initialGuests);
        setRooms(initialRooms);
    }, [initialGuests, initialRooms]);

    return {
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        rooms,
        setRooms,
        getMinCheckOutDate,
        calculateNights,
        resetForm
    };
};
export const useSearchBar = (props: UseSearchBarProps): UseSearchBarReturn => {
    const {
        destinations = [],
        initialDestinationId,
        showRooms = false,
        enablePriceEstimation = false,
        fetchDestinations,
        calculatePrice,
        onPriceEstimate
    } = props;
    const destinationsHook = useDestinations(destinations, initialDestinationId, fetchDestinations);
    const searchFormHook = useSearchForm(2, 1);
    const priceEstimationHook = usePriceEstimation(
        enablePriceEstimation,
        destinationsHook.destinationId,
        searchFormHook.checkIn,
        searchFormHook.checkOut,
        searchFormHook.guests,
        searchFormHook.rooms,
        showRooms,
        calculatePrice,
        onPriceEstimate
    );
    const nights = searchFormHook.calculateNights();
    const formatPrice = useCallback((price: number, currency: string = 'ZAR'): string => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }, []);
    const handleSearch = useCallback((onSearch: (params: SearchParams) => void) => {
        if (!destinationsHook.destination.trim()) {
            alert('Please select a destination');
            return;
        }

        if (!searchFormHook.checkIn || !searchFormHook.checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }

        const searchParams: SearchParams = {
            destination: destinationsHook.destination.trim(),
            destinationId: destinationsHook.destinationId,
            checkIn: searchFormHook.checkIn,
            checkOut: searchFormHook.checkOut,
            guests: searchFormHook.guests,
            ...(showRooms && { rooms: searchFormHook.rooms }),
            ...(priceEstimationHook.priceEstimate && { estimatedPrice: priceEstimationHook.priceEstimate })
        };

        onSearch(searchParams);
    }, [destinationsHook, searchFormHook, priceEstimationHook, showRooms]);

    return {
        destination: destinationsHook.destination,
        filteredDestinations: destinationsHook.filteredDestinations,
        isLoading: destinationsHook.isLoading,
        showDestinationDropdown: destinationsHook.showDestinationDropdown,
        handleDestinationSelect: destinationsHook.handleDestinationSelect,
        handleDestinationChange: destinationsHook.handleDestinationChange,
        handleDestinationFocus: destinationsHook.handleDestinationFocus,
        closeDropdown: destinationsHook.closeDropdown,
        checkIn: searchFormHook.checkIn,
        setCheckIn: searchFormHook.setCheckIn,
        checkOut: searchFormHook.checkOut,
        setCheckOut: searchFormHook.setCheckOut,
        guests: searchFormHook.guests,
        setGuests: searchFormHook.setGuests,
        rooms: searchFormHook.rooms,
        setRooms: searchFormHook.setRooms,
        getMinCheckOutDate: searchFormHook.getMinCheckOutDate,
        priceEstimate: priceEstimationHook.priceEstimate,
        isCalculatingPrice: priceEstimationHook.isCalculatingPrice,
        nights,
        formatPrice,
        handleSearch
    };
};

