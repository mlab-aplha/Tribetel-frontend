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

export interface SearchParams {
    destination: string;
    destinationId?: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms?: number;
    estimatedPrice?: PriceEstimate;
}

export interface PriceEstimate {
    min: number;
    max: number;
    currency: string;
    nights: number;
    isEstimated: boolean;
}

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

export interface RoomSearchParams {
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
    sortBy?: 'price' | 'rating' | 'name';
    sortOrder?: 'asc' | 'desc';
}

export interface DateRange {
    checkIn: string;
    checkOut: string;
    start?: Date | null;
    end?: Date | null;
}

export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isInRange: boolean;
    isDisabled: boolean;
    isCheckIn: boolean;
    isCheckOut: boolean;
}

export interface DateValidation {
    isValid: boolean;
    errors: string[];
    nights: number;
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

export interface FilterOption {
    id: string;
    label: string;
    type: 'pill' | 'dropdown';
}

export interface SortOption {
    id: string;
    label: string;
}

export interface SearchState {
    params: SearchParams;
    results: Hotel[];
    loading: boolean;
    error: string | null;
    filters: {
        priceRange: [number, number];
        amenities: string[];
        rating: number;
    };
    sortBy: string;
}

export interface HotelFilters {
    priceRange: [number, number];
    amenities: string[];
    rating: number;
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

export interface SearchResultsProps {
    results: Hotel[];
    currentPage: number;
    totalPages: number;
    totalResults: number;
    onPageChange: (page: number) => void;
    onHotelVisit: (hotelId: string) => void;
    loading?: boolean;
    filters?: FilterOption[];
    onFilterChange?: (filters: string[]) => void;
    sortOptions?: SortOption[];
    onSortChange?: (sortBy: string) => void;
}