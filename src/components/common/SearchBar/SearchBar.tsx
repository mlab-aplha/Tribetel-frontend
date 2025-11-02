import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

export interface SearchDestination {
    id: string;
    name: string;
    type: 'city' | 'region' | 'hotel';
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

export const SearchBar: React.FC<SearchBarProps> = ({
    destinations = [],
    initialDestinationId,
    onSearch,
    className = '',
    disabled = false,
    showGuests = true,
    showRooms = false,
    compact = false,
    enablePriceEstimation = false,
    onPriceEstimate,
    fetchDestinations,
    calculatePrice
}) => {
    const [destination, setDestination] = useState('');
    const [destinationId, setDestinationId] = useState<string>('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    const [rooms, setRooms] = useState(1);
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
    const [filteredDestinations, setFilteredDestinations] = useState<SearchDestination[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
    const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
    const [availableDestinations, setAvailableDestinations] = useState<SearchDestination[]>(destinations);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const destinationInputRef = useRef<HTMLInputElement>(null);

    // Fetch destinations 
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

    // Set initial destination 
    useEffect(() => {
        if (initialDestinationId && availableDestinations.length > 0) {
            const initialDest = availableDestinations.find(dest => dest.id === initialDestinationId);
            if (initialDest) {
                setDestination(initialDest.name);
                setDestinationId(initialDest.id);
            }
        }
    }, [initialDestinationId, availableDestinations]);

    // Filter destinations 
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

    // Calculate price 
    useEffect(() => {
        const estimatePrice = async () => {
            if (!enablePriceEstimation || !destinationId || !checkIn || !checkOut || !calculatePrice) {
                setPriceEstimate(null);
                if (onPriceEstimate) onPriceEstimate(null);
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
                if (onPriceEstimate) onPriceEstimate(estimate);
            } catch (error) {
                console.error('Price calculation failed:', error);
                setPriceEstimate(null);
                if (onPriceEstimate) onPriceEstimate(null);
            } finally {
                setIsCalculatingPrice(false);
            }
        };

        // Debounce price calculation
        const timeoutId = setTimeout(estimatePrice, 500);
        return () => clearTimeout(timeoutId);
    }, [destinationId, checkIn, checkOut, guests, rooms, enablePriceEstimation, calculatePrice, onPriceEstimate, showRooms]);

    // Close dropdown 
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDestinationDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDestinationSelect = (dest: SearchDestination) => {
        setDestination(dest.name);
        setDestinationId(dest.id);
        setShowDestinationDropdown(false);
    };

    const handleSearch = () => {
        if (!destination.trim()) {
            alert('Please select a destination');
            return;
        }

        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }

        const searchParams: SearchParams = {
            destination: destination.trim(),
            destinationId,
            checkIn,
            checkOut,
            guests,
            ...(showRooms && { rooms }),
            ...(priceEstimate && { estimatedPrice: priceEstimate })
        };

        onSearch(searchParams);
    };

    const getMinCheckOutDate = () => {
        return checkIn || new Date().toISOString().split('T')[0];
    };

    const handleDestinationFocus = () => {
        setShowDestinationDropdown(true);
    };

    const handleDestinationChange = (value: string) => {
        setDestination(value);
        setDestinationId('');
        setShowDestinationDropdown(true);
        setPriceEstimate(null);
        if (onPriceEstimate) onPriceEstimate(null);
    };

    const calculateNights = (): number => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const timeDiff = end.getTime() - start.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const formatPrice = (price: number, currency: string = 'ZAR'): string => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const nights = calculateNights();

    return (
        <div className={`${styles.searchBar} ${className} ${compact ? styles.compact : ''}`}>
            <div className={styles.searchFields}>
                {/* Destination Field */}
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Destination</label>
                    <div className={styles.destinationWrapper} ref={dropdownRef}>
                        <div className={styles.inputWithLoader}>
                            {/* Custom input for destination with focus handling */}
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => handleDestinationChange(e.target.value)}
                                onFocus={handleDestinationFocus}
                                placeholder="Where are you going?"
                                className={`${styles.destinationInput} ${styles.customInput}`}
                                disabled={disabled || isLoading}
                                ref={destinationInputRef}
                            />
                            {isLoading && (
                                <div className={styles.inputLoader}>
                                    <Loader size="small" />
                                </div>
                            )}
                        </div>
                        {showDestinationDropdown && filteredDestinations.length > 0 && (
                            <div className={styles.destinationDropdown}>
                                {filteredDestinations.map((dest) => (
                                    <div
                                        key={dest.id}
                                        className={styles.dropdownItem}
                                        onClick={() => handleDestinationSelect(dest)}
                                    >
                                        <div className={styles.destinationInfo}>
                                            <div className={styles.destinationName}>{dest.name}</div>
                                            {dest.country && (
                                                <div className={styles.destinationCountry}>{dest.country}</div>
                                            )}
                                            <div className={styles.destinationType}>{dest.type}</div>
                                        </div>
                                        {dest.priceRange && (
                                            <div className={styles.destinationPrice}>
                                                {formatPrice(dest.priceRange.min)} - {formatPrice(dest.priceRange.max)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Check-in Date */}
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Check-in</label>
                    {/* Use native input for date type */}
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`${styles.dateInput} ${styles.customInput}`}
                        disabled={disabled}
                    />
                </div>

                {/* Check-out Date */}
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Check-out</label>
                    {/* Use native input for date type */}
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={getMinCheckOutDate()}
                        className={`${styles.dateInput} ${styles.customInput}`}
                        disabled={disabled}
                    />
                    {nights > 0 && (
                        <div className={styles.nightsCounter}>
                            {nights} {nights === 1 ? 'night' : 'nights'}
                        </div>
                    )}
                </div>

                {/* Guests Field */}
                {showGuests && (
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Guests</label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className={styles.selectInput}
                            disabled={disabled}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'guest' : 'guests'}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Rooms Field */}
                {showRooms && (
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Rooms</label>
                        <select
                            value={rooms}
                            onChange={(e) => setRooms(Number(e.target.value))}
                            className={styles.selectInput}
                            disabled={disabled}
                        >
                            {[1, 2, 3, 4].map(num => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'room' : 'rooms'}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Price Estimate Display */}
                {enablePriceEstimation && priceEstimate && (
                    <div className={styles.priceEstimateGroup}>
                        <label className={styles.fieldLabel}>Estimated Price</label>
                        <div className={styles.priceEstimate}>
                            {isCalculatingPrice ? (
                                <div className={styles.priceLoading}>
                                    <Loader size="small" />
                                    <span>Calculating...</span>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.priceRange}>
                                        {formatPrice(priceEstimate.min)} - {formatPrice(priceEstimate.max)}
                                    </div>
                                    <div className={styles.priceNote}>
                                        for {nights} {nights === 1 ? 'night' : 'nights'}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Search Button */}
                <div className={styles.searchButtonGroup}>
                    <Button
                        variant="primary"
                        size={compact ? "medium" : "large"}
                        onClick={handleSearch}
                        disabled={disabled || isLoading}
                        className={styles.searchButton}
                        fullWidth
                    >
                        {isLoading ? 'Loading...' : 'Search'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;