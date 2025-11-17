import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./Search_ResultsPage.module.css";
import type { HotelSummary } from "../../../src/components/types/common";

const SearchBar = ({ onSearch, disabled, initialDestination }: any) => {
    const [searchQuery, setSearchQuery] = useState(initialDestination || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch && searchQuery.trim()) {
            onSearch({
                destination: searchQuery,
                checkIn: "2025-12-15",
                checkOut: "2025-12-18",
                guests: 2
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, hotels, or locations..."
                    disabled={disabled}
                    className={styles.searchInput}
                />
            </div>
            <button
                type="submit"
                disabled={disabled}
                className={styles.searchButton}
            >
                {disabled ? (
                    <div className={styles.loadingSpinner}></div>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                {disabled ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

const sampleHotels: HotelSummary[] = [
    {
        id: "1",
        name: "The Grand Suite",
        location: "Lanseria",
        rating: 5.8,
        reviews: 1000,
        description: "This suite is perfect for a romantic getaway. It is spacious and comes fully equipped with a kitchen and a private balcony.",
        pricePerNight: 550,
        image: "/images/grand-suite.jpg",
        distanceKm: 2.1,
        tags: ["Free parking", "Kitchen", "Luxury"],
        amenities: ["Free WiFi", "Swimming Pool", "Kitchen", "Air Conditioning"]
    },
    {
        id: "2",
        name: "Ebumnandini Resort",
        location: "Lanseria",
        rating: 7.9,
        reviews: 1000,
        description: "This suite is perfect for a relaxing vacation. It is spacious and comes fully equipped with a kitchen and a private balcony.",
        pricePerNight: 700,
        image: "/images/ebumnandini.jpg",
        distanceKm: 3.7,
        tags: ["Pool", "Breakfast", "Spa"],
        amenities: ["Free WiFi", "Swimming Pool", "Breakfast Included", "Spa"]
    },
    {
        id: "3",
        name: "Urban Oasis Hotel",
        location: "Lanseria",
        rating: 6.5,
        reviews: 850,
        description: "Modern hotel in the heart of the city with stunning views and premium amenities for business and leisure travelers.",
        pricePerNight: 450,
        image: "/images/urban-oasis.jpg",
        distanceKm: 1.2,
        tags: ["City Center", "Gym", "Restaurant"],
        amenities: ["Free WiFi", "Fitness Center", "Restaurant", "Business Center"]
    },
];

interface SearchParams {
    destination: string;
    checkIn: string;
    checkOut: string;
}

const SearchResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [urlSearchParams, setUrlSearchParams] = useState<SearchParams | null>(null);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<"recommended" | "distance" | "price">("recommended");
    const [priceMin, setPriceMin] = useState<number | "">("");
    const [priceMax, setPriceMax] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [amenitiesFilter, setAmenitiesFilter] = useState({
        freeParking: false,
        pool: false,
        breakfast: false,
        wifi: false,
        spa: false
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const destination = searchParams.get('destination');
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');

        if (destination && checkIn && checkOut) {
            setUrlSearchParams({
                destination,
                checkIn,
                checkOut
            });
            setQuery(destination);
        }
    }, [location.search, navigate]);

    const handleSearch = (searchParams: any) => {
        setLoading(true);
        setQuery(searchParams.destination);

        const newSearchParams = new URLSearchParams();
        newSearchParams.set('destination', searchParams.destination);
        newSearchParams.set('checkIn', searchParams.checkIn);
        newSearchParams.set('checkOut', searchParams.checkOut);

        navigate(`/search?${newSearchParams.toString()}`);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleAmenityChange = (amenity: keyof typeof amenitiesFilter) => {
        setAmenitiesFilter(prev => ({
            ...prev,
            [amenity]: !prev[amenity]
        }));
    };

    const handleBookNow = (hotelId: string) => {
        if (urlSearchParams) {
            navigate(`/booking?hotelId=${hotelId}&checkIn=${urlSearchParams.checkIn}&checkOut=${urlSearchParams.checkOut}`);
        } else {
            navigate(`/booking?hotelId=${hotelId}`);
        }
    };

    const clearFilters = () => {
        setPriceMin("");
        setPriceMax("");
        setAmenitiesFilter({
            freeParking: false,
            pool: false,
            breakfast: false,
            wifi: false,
            spa: false
        });
        setSortBy("recommended");
    };

    const filtered = sampleHotels
        .filter((h) =>
            query
                ? h.location.toLowerCase().includes(query.toLowerCase()) ||
                h.name.toLowerCase().includes(query.toLowerCase()) ||
                (h.tags ?? []).some((t) =>
                    t.toLowerCase().includes(query.toLowerCase())
                )
                : true
        )
        .filter((h) => (priceMin !== "" ? h.pricePerNight >= Number(priceMin) : true))
        .filter((h) => (priceMax !== "" ? h.pricePerNight <= Number(priceMax) : true))
        .filter((h) => {
            if (amenitiesFilter.freeParking && !h.amenities.some(a => a.toLowerCase().includes('parking'))) return false;
            if (amenitiesFilter.pool && !h.amenities.some(a => a.toLowerCase().includes('pool'))) return false;
            if (amenitiesFilter.breakfast && !h.amenities.some(a => a.toLowerCase().includes('breakfast'))) return false;
            if (amenitiesFilter.wifi && !h.amenities.some(a => a.toLowerCase().includes('wifi'))) return false;
            if (amenitiesFilter.spa && !h.amenities.some(a => a.toLowerCase().includes('spa'))) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "distance") return (a.distanceKm ?? 0) - (b.distanceKm ?? 0);
            if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
            return b.rating - a.rating;
        });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 8) return '#10b981';
        if (rating >= 6) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerContent}>
                        <h1 className={styles.title}>
                            {urlSearchParams ? (
                                <>
                                    Stays in <span className={styles.highlight}>{urlSearchParams.destination}</span>
                                    <span className={styles.dates}>
                                        {formatDate(urlSearchParams.checkIn)} - {formatDate(urlSearchParams.checkOut)}
                                    </span>
                                </>
                            ) : (
                                "Find Your Perfect Stay"
                            )}
                        </h1>
                        <p className={styles.subtitle}>
                            Discover amazing hotels and resorts for your next trip
                        </p>
                    </div>

                    <div className={styles.searchWrap}>
                        <SearchBar
                            onSearch={handleSearch}
                            disabled={loading}
                            initialDestination={urlSearchParams?.destination}
                        />
                    </div>
                </div>
            </header>

            <section className={styles.content}>
                <aside className={styles.filters}>
                    <div className={styles.filtersHeader}>
                        <h3>Filters</h3>
                        <button onClick={clearFilters} className={styles.clearFilters}>
                            Clear All
                        </button>
                    </div>

                    <div className={styles.filterCard}>
                        <h4 className={styles.filterTitle}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.filterIcon}>
                                <path d="M3 4H21M3 8H15M3 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Price Range (ZAR)
                        </h4>
                        <div className={styles.rangeRow}>
                            <div className={styles.inputGroup}>
                                <label>Min</label>
                                <input
                                    className={styles.inputSmall}
                                    type="number"
                                    placeholder="0"
                                    value={priceMin === "" ? "" : String(priceMin)}
                                    onChange={(e) => setPriceMin(e.target.value === "" ? "" : Number(e.target.value))}
                                    aria-label="Minimum price"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Max</label>
                                <input
                                    className={styles.inputSmall}
                                    type="number"
                                    placeholder="2000"
                                    value={priceMax === "" ? "" : String(priceMax)}
                                    onChange={(e) => setPriceMax(e.target.value === "" ? "" : Number(e.target.value))}
                                    aria-label="Maximum price"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.filterCard}>
                        <h4 className={styles.filterTitle}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.filterIcon}>
                                <path d="M10 14L16 8M7 20L17 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Sort By
                        </h4>
                        <select
                            className={styles.select}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            aria-label="Sort results"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="distance">Distance</option>
                            <option value="price">Price (Low to High)</option>
                        </select>
                    </div>

                    <div className={styles.filterCard}>
                        <h4 className={styles.filterTitle}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={styles.filterIcon}>
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Amenities
                        </h4>
                        <div className={styles.amenitiesList}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={amenitiesFilter.wifi}
                                    onChange={() => handleAmenityChange('wifi')}
                                />
                                <span className={styles.checkmark}></span>
                                Free WiFi
                            </label>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={amenitiesFilter.pool}
                                    onChange={() => handleAmenityChange('pool')}
                                />
                                <span className={styles.checkmark}></span>
                                Swimming Pool
                            </label>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={amenitiesFilter.breakfast}
                                    onChange={() => handleAmenityChange('breakfast')}
                                />
                                <span className={styles.checkmark}></span>
                                Breakfast Included
                            </label>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={amenitiesFilter.freeParking}
                                    onChange={() => handleAmenityChange('freeParking')}
                                />
                                <span className={styles.checkmark}></span>
                                Free Parking
                            </label>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={amenitiesFilter.spa}
                                    onChange={() => handleAmenityChange('spa')}
                                />
                                <span className={styles.checkmark}></span>
                                Spa Services
                            </label>
                        </div>
                    </div>
                </aside>

                <section className={styles.results}>
                    <div className={styles.resultsHeader}>
                        <div className={styles.resultsInfo}>
                            <h2 className={styles.resultsCount}>
                                {filtered.length} {filtered.length === 1 ? 'Stay' : 'Stays'} Found
                            </h2>
                            <div className={styles.sortHint}>
                                Sorted by: <strong>{sortBy.replace(/\b\w/g, l => l.toUpperCase())}</strong>
                            </div>
                        </div>
                        <div className={styles.resultsStats}>
                            <span className={styles.stat}>
                                <strong>Price range:</strong> R{priceMin || 0} - R{priceMax || '∞'}
                            </span>
                        </div>
                    </div>

                    {loading ? (
                        <div className={styles.loadingState}>
                            <div className={styles.loadingSpinnerLarge}></div>
                            <p>Finding the best stays for you...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className={styles.noResults}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L3 3M10.5 10.5C8.01472 10.5 6 12.5147 6 15C6 17.4853 8.01472 19.5 10.5 19.5C12.9853 19.5 15 17.4853 15 15C15 12.5147 12.9853 10.5 10.5 10.5Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <h3>No stays found</h3>
                            <p>Try adjusting your filters or search terms</p>
                            <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {filtered.map((hotel) => (
                                <article key={hotel.id} className={styles.card}>
                                    <div className={styles.cardImage}>
                                        <img
                                            src={hotel.image || "/images/placeholder.jpg"}
                                            alt={hotel.name}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                                            }}
                                        />
                                        <div className={styles.imageOverlay}>
                                            <button className={styles.wishlistBtn}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                                                        fill="currentColor" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <div className={styles.cardHeader}>
                                            <div>
                                                <h2 className={styles.hotelName}>{hotel.name}</h2>
                                                <div className={styles.location}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                                                            stroke="currentColor" strokeWidth="2" />
                                                        <path d="M12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5Z"
                                                            stroke="currentColor" strokeWidth="2" />
                                                    </svg>
                                                    {hotel.location}
                                                </div>
                                                <div className={styles.distance}>
                                                    {hotel.distanceKm} km from city center
                                                </div>
                                            </div>
                                            <div className={styles.rating} style={{ borderColor: getRatingColor(hotel.rating) }}>
                                                <div className={styles.score} style={{ color: getRatingColor(hotel.rating) }}>
                                                    {hotel.rating}
                                                </div>
                                                <div className={styles.reviews}>{hotel.reviews} reviews</div>
                                            </div>
                                        </div>

                                        <p className={styles.description}>{hotel.description}</p>

                                        <div className={styles.amenities}>
                                            {hotel.tags?.slice(0, 3).map((tag, index) => (
                                                <span key={index} className={styles.tag}>
                                                    {tag}
                                                </span>
                                            ))}
                                            {hotel.tags && hotel.tags.length > 3 && (
                                                <span className={styles.moreTags}>+{hotel.tags.length - 3} more</span>
                                            )}
                                        </div>

                                        <div className={styles.cardFooter}>
                                            <div className={styles.priceSection}>
                                                <div className={styles.price}>R{hotel.pricePerNight}</div>
                                                <span className={styles.perNight}>per night</span>
                                                <div className={styles.taxInfo}>Includes taxes & fees</div>
                                            </div>
                                            <button
                                                className={styles.bookBtn}
                                                onClick={() => handleBookNow(hotel.id)}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <div className={styles.buttonSpinner}></div>
                                                ) : (
                                                    <>
                                                        Book Now
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                            <path d="M5 12H19M19 12L12 5M19 12L12 19"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
};

export default SearchResultsPage;