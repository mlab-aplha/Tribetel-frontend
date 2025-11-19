import React, { useState, useEffect } from 'react';
import styles from './SearchResults.module.css';
import { SearchResultsProps, Hotel } from '@components/types/common';
import { hotelService } from '../../../../services/hotelService';
import LoadingSpinner from '@components/common/Loader/Loader';

export const SearchResults: React.FC<SearchResultsProps> = ({
    results,
    currentPage,
    totalPages,
    totalResults,
    onPageChange,
    onHotelVisit,
    loading = false,
    filters = [],
    onFilterChange,
    sortOptions = [],
    onSortChange
}) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('');
    useEffect(() => {
        results.forEach(hotel => {
            hotelService.trackHotelView(hotel.id).catch(console.error);
        });
    }, [results]);

    const handleFilterClick = (filterId: string) => {
        const newFilters = selectedFilters.includes(filterId)
            ? selectedFilters.filter(id => id !== filterId)
            : [...selectedFilters, filterId];

        setSelectedFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const handleSortChange = (sortId: string) => {
        setSelectedSort(sortId);
        onSortChange?.(sortId);
    };

    const handleHotelVisit = async (hotelId: string) => {
        try {
            await hotelService.trackHotelClick(hotelId);
            onHotelVisit(hotelId);
        } catch (error) {
            console.error('Error tracking hotel click:', error);
            onHotelVisit(hotelId);
        }
    };

    const renderPagination = () => {
        const pages = [];
        pages.push(1);
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        if (currentPage <= 3) {
            endPage = Math.min(totalPages - 1, 4);
        }
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(2, totalPages - 3);
        }
        if (startPage > 2) {
            pages.push('ellipsis-start');
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages - 1) {
            pages.push('ellipsis-end');
        }
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return (
            <div className={styles.pagination}>
                {pages.map((page, index) => {
                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                        return (
                            <div key={`ellipsis-${index}`} className={styles.ellipsis}>
                                ...
                            </div>
                        );
                    }

                    const isCurrent = page === currentPage;
                    return (
                        <button
                            key={page}
                            className={`${styles.pageButton} ${isCurrent ? styles.currentPage : ''}`}
                            onClick={() => onPageChange(page as number)}
                            disabled={isCurrent || loading}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderImageGallery = (hotel: Hotel) => {
        return (
            <div className={styles.imageGallery}>
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className={styles.mainImage}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-hotel.jpg';
                    }}
                />
                <div className={styles.imageOverlay}>
                    <div className={styles.imageIndicators}>
                        {(hotel.images || [hotel.image]).slice(0, 5).map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.imageIndicator} ${index === 0 ? styles.active : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <LoadingSpinner />
                <p>Searching for the perfect stays...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <div className={styles.resultsInfo}>
                    Showing {results.length} of {totalResults} hotels
                </div>

                <div className={styles.controls}>
                    {/* Filters */}
                    {filters.length > 0 && (
                        <div className={styles.filters}>
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    className={`${styles.filterPill} ${selectedFilters.includes(filter.id) ? styles.activeFilter : ''
                                        }`}
                                    onClick={() => handleFilterClick(filter.id)}
                                    disabled={loading}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Sort Dropdown */}
                    {sortOptions.length > 0 && (
                        <div className={styles.sortContainer}>
                            <select
                                className={styles.sortDropdown}
                                value={selectedSort}
                                onChange={(e) => handleSortChange(e.target.value)}
                                disabled={loading}
                            >
                                <option value="">Sort by</option>
                                {sortOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </header>

            {/* Results Grid */}
            <div className={styles.resultsGrid}>
                {results.map((hotel) => (
                    <article key={hotel.id} className={styles.hotelCard}>
                        {/* Image Section */}
                        <div className={styles.imageSection}>
                            {renderImageGallery(hotel)}
                        </div>

                        {/* Content Section */}
                        <div className={styles.contentSection}>
                            <div className={styles.hotelHeader}>
                                <h2 className={styles.hotelName}>{hotel.name}</h2>
                                <div className={styles.hotelMeta}>
                                    <span className={styles.location}>{hotel.location}</span>
                                    {hotel.rating && (
                                        <span className={styles.rating}>
                                            {hotel.rating} ({hotel.reviewCount} reviews)
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className={styles.description}>{hotel.description}</p>

                            {/* Amenities */}
                            {hotel.amenities && hotel.amenities.length > 0 && (
                                <div className={styles.amenities}>
                                    {hotel.amenities.slice(0, 3).map((amenity: string, index: number) => (
                                        <span key={index} className={styles.amenity}>
                                            {amenity}
                                        </span>
                                    ))}
                                    {hotel.amenities.length > 3 && (
                                        <span className={styles.moreAmenities}>
                                            +{hotel.amenities.length - 3} more
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Price and CTA */}
                            <div className={styles.hotelFooter}>
                                <div className={styles.priceSection}>
                                    <div className={styles.startingPrice}>
                                        Starting at {hotel.priceStarting} ZAR
                                    </div>
                                    <div className={styles.priceNote}>incl. tax and fees</div>
                                </div>

                                <button
                                    className={styles.visitButton}
                                    onClick={() => handleHotelVisit(hotel.id)}
                                    disabled={loading}
                                >
                                    Visit
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* No Results State */}
            {results.length === 0 && !loading && (
                <div className={styles.noResults}>
                    <h3>No hotels found</h3>
                    <p>Try adjusting your search criteria or filters to find more results.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <footer className={styles.paginationContainer}>
                    {renderPagination()}
                </footer>
            )}
        </div>
    );
};

export default SearchResults;


