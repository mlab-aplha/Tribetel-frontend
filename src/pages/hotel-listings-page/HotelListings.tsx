import React, { useState, useEffect } from 'react';
import styles from './HotelListings.module.css';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';
import { useHotels } from '../../hooks/useHotels';
import { Hotel, HotelListingsProps } from '../../components/types/common';

const defaultHotels: Hotel[] = [
  {
    id: "1",
    name: "The Fly Stay",
    location: "Cape Town, South Africa",
    description: "Located in the heart of Cape Town, The Fly Stay offers a luxurious experience with stunning views of Table Mountain.",
    priceStarting: 750,
    image: "/images/fly-stay.jpg",
    rating: 4.5,
    amenities: ["Free WiFi", "Swimming Pool", "Spa"]
  },
  {
    id: "2",
    name: "Elangeni",
    location: "Mbombela, South Africa",
    description: "Elangeni is a beachfront hotel in Durban, perfect for a relaxing getaway with top-notch amenities.",
    priceStarting: 500,
    image: "/images/bellagen.jpg",
    rating: 4.2,
    amenities: ["Beach Access", "Restaurant", "Bar"]
  },
  {
    id: "3",
    name: "Diamond Crown",
    location: "Johannesburg, South Africa",
    description: "Diamond Crown provides a royal experience in Johannesburg with elegant rooms and exceptional service.",
    priceStarting: 600,
    image: "/images/diamond-crown.jpg",
    rating: 4.7,
    amenities: ["Luxury Suites", "Fine Dining", "Conference Room"]
  },
];

export const HotelListings: React.FC<HotelListingsProps> = ({
  hotels: externalHotels,
  title = "Our hotels",
  subtitle = "We strive to give the best stays at the click of a button. See our range of stays, book and enjoy.",
  showPromo = true,
  enableBackend = false,
  searchParams,
  onHotelClick,
  onBookNow,
  onLoad
}) => {
  // Use backend hook if enabled, otherwise use local state
  const { hotels: backendHotels, loading, error, searchHotels } = useHotels(searchParams);
  const [localHotels, setLocalHotels] = useState<Hotel[]>(externalHotels || defaultHotels);

  // Determine which hotels to display
  const displayHotels = enableBackend ? backendHotels : localHotels;

  // Notify parent when hotels are loaded
  useEffect(() => {
    if (onLoad && displayHotels.length > 0) {
      onLoad(displayHotels);
    }
  }, [displayHotels, onLoad]);

  // Update local hotels if external hotels prop changes
  useEffect(() => {
    if (externalHotels) {
      setLocalHotels(externalHotels);
    }
  }, [externalHotels]);

  const handleVisitClick = (hotel: Hotel) => {
    if (onHotelClick) {
      onHotelClick(hotel);
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    }
  };

  const handleRetry = () => {
    if (enableBackend) {
      searchHotels(searchParams || {});
    } else {
      setLocalHotels(externalHotels || defaultHotels);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <section className={styles.results}>
        {/* Loading State */}
        {loading && (
          <div className={styles.loadingContainer}>
            <Loader size="large" />
            <p>Loading hotels...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
              <ErrorMessage
                message={error}
                variant="error"
                size="large"
                fullWidth
              />
              <Button
                onClick={handleRetry}
                variant="primary"
                className={styles.retryButton}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            <div className={styles.grid}>
              {displayHotels.length > 0 ? (
                displayHotels.map((hotel) => (
                  <article key={hotel.id} className={styles.card}>
                    <div
                      className={styles.thumb}
                      style={{ backgroundImage: `url(${hotel.image || "/images/placeholder.jpg"})` }}
                      role="img"
                      aria-label={hotel.name}
                    />
                    <div className={styles.cardBody}>
                      <h2 className={styles.hotelName}>{hotel.name}</h2>
                      <p className={styles.location}>{hotel.location}</p>
                      <p className={styles.description}>{hotel.description}</p>

                      {hotel.rating && (
                        <div className={styles.rating}>
                          Rating: {hotel.rating}/5
                        </div>
                      )}

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

                      <div className={styles.row}>
                        <div className={styles.price}>
                          From <span className={styles.priceValue}>R{hotel.priceStarting}</span>
                        </div>
                        <Button
                          className={styles.visitBtn}
                          onClick={() => handleVisitClick(hotel)}
                          disabled={hotel.available === false}
                        >
                          {hotel.available === false ? 'Unavailable' : 'Visit'}
                        </Button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className={styles.noResults}>
                  <h3>No hotels found</h3>
                  <p>Try adjusting your search criteria</p>
                  <Button onClick={handleRetry}>Show All Hotels</Button>
                </div>
              )}
            </div>

            {showPromo && (
              <div className={styles.promo}>
                <h3>Over 50 Luxury stays</h3>
                <p>Book your next stay with us and enjoy exclusive offers and discounts.</p>
                <Button className={styles.cta} onClick={handleBookNow}>
                  Book now
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default HotelListings;