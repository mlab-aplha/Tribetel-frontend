// components/common/SearchBar/SearchBar.tsx
import React, { useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { useSearchBar } from '../../../hooks/useSearch';
import { SearchBarProps } from '../../types/common';

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
    const {
        // Destination
        destination,
        filteredDestinations,
        isLoading,
        showDestinationDropdown,
        handleDestinationSelect,
        handleDestinationChange,
        handleDestinationFocus,
        closeDropdown,

        // Dates
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        getMinCheckOutDate,

        // Guests & Rooms
        guests,
        setGuests,
        rooms,
        setRooms,

        // Price estimation
        priceEstimate,
        isCalculatingPrice,

        // Utilities
        nights,
        formatPrice,
        handleSearch
    } = useSearchBar({
        destinations,
        initialDestinationId,
        showRooms,
        enablePriceEstimation,
        fetchDestinations,
        calculatePrice,
        onPriceEstimate
    });

    const dropdownRef = useRef<HTMLDivElement>(null);
    const destinationInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeDropdown]);

    return (
        <div className={`${styles.searchBar} ${className} ${compact ? styles.compact : ''}`}>
            <div className={styles.searchFields}>
                {/* Destination Field */}
                <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Destination</label>
                    <div className={styles.destinationWrapper} ref={dropdownRef}>
                        <div className={styles.inputWithLoader}>
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
                        onClick={() => handleSearch(onSearch)}
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