export interface SearchParams {
    destination: string;
    destinationId?: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms?: number;
    estimatedPrice?: PriceEstimate;
}

export interface SearchFilters {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    priceRange?: {
        min: number;
        max: number;
    };
    amenities?: string[];
    rating?: number;
    distance?: number;
}

export interface SearchDestination {
    id: string;
    name: string;
    type: 'city' | 'region' | 'hotel' | 'resort';
    country?: string;
    priceRange?: {
        min: number;
        max: number;
        currency: string;
    };
}

export interface SearchSuggestion {
    id: string;
    name: string;
    type: 'hotel' | 'city' | 'landmark';
    country?: string;
}

export interface SearchHistory {
    id: string;
    query: string;
    timestamp: string;
    resultCount: number;
}

export interface PriceEstimate {
    min: number;
    max: number;
    currency: string;
    nights: number;
    isEstimated: boolean;
}

export interface AvailabilityResponse {
    available: boolean;
    totalResults?: number;
    hotels?: Hotel[];
    message?: string;
}

export interface HotelSearchParams {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    page?: number;
    limit?: number;
}

// Component Props
export interface SearchBarProps {
    destinations?: SearchDestination[];
    initialDestinationId?: string;
    onSearch: (searchParams: SearchParams) => void;
    className?: string;
    disabled?: boolean;
    showGuests?: boolean;
    showRooms?: boolean;
    compact?: boolean;
    enablePriceEstimation?: boolean;
    onPriceEstimate?: (estimate: PriceEstimate | null) => void;
    fetchDestinations?: () => Promise<SearchDestination[]>;
    calculatePrice?: (params: {
        destinationId: string;
        checkIn: string;
        checkOut: string;
        guests: number;
        rooms?: number;
    }) => Promise<PriceEstimate>;
}

export interface DateRangePickerProps {
    checkIn: string;
    checkOut: string;
    onChange: (dates: DateRange) => void;
    onValidationChange?: (isValid: boolean, errors: string[]) => void;
    minDate?: string;
    maxDate?: string;
    disabledDates?: string[];
    minNights?: number;
    maxNights?: number;
    isLoading?: boolean;
    required?: boolean;
}

export interface HotelListingsProps {
    hotels?: Hotel[];
    title?: string;
    subtitle?: string;
    showPromo?: boolean;
    enableBackend?: boolean;
    searchParams?: SearchParams;
    onHotelClick?: (hotel: Hotel) => void;
    onBookNow?: () => void;
    onLoad?: (hotels: Hotel[]) => void;
}