import React, { useState, useEffect } from 'react';
import Button from '@components/common/Button/Button';
import Card from '@components/common/Card/Card';
import DatePicker from '@components/common/DatePicker/DatePicker';
import styles from './HeroSection.module.css';
import heroImage from '@/assets/hero-image.png';
import service1 from '@/assets/service1.png';
import service2 from '@/assets/service2.png';
import service3 from '@/assets/service3.png';

const mockUser = {
  isLoggedIn: false,
  name: "Wendy"
};

interface SearchParams {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
}

const HeroSection: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: '',
    checkIn: null,
    checkOut: null
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    heroImage,
    service1,
    service2,
    service3,
    heroImage
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleExploreClick = () => {
    console.log('Explore button clicked');
    // Scroll to search section or navigate to listings
  };

  const handleCheckAvailability = () => {
    const { destination, checkIn, checkOut } = searchParams;

    if (!destination || !checkIn || !checkOut) {
      alert('Please fill in all fields');
      return;
    }

    // Validate dates
    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }

    console.log('Search parameters:', {
      destination,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString()
    });

    // Here you would typically navigate to search results or make an API call
    // navigate(`/search?destination=${encodeURIComponent(destination)}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`);
  };

  const handleInputChange = (field: keyof SearchParams, value: string | Date | null) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset checkOut if checkIn changes and is after current checkOut
    if (field === 'checkIn' && value instanceof Date && searchParams.checkOut && value >= searchParams.checkOut) {
      setSearchParams(prev => ({
        ...prev,
        checkOut: null
      }));
    }
  };

  const getMinCheckOutDate = (): Date | undefined => {
    if (!searchParams.checkIn) return undefined;
    const minDate = new Date(searchParams.checkIn);
    minDate.setDate(minDate.getDate() + 1);
    return minDate;
  };

  const getMaxCheckInDate = (): Date | undefined => {
    if (!searchParams.checkOut) return undefined;
    const maxDate = new Date(searchParams.checkOut);
    maxDate.setDate(maxDate.getDate() - 1);
    return maxDate;
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  const isSearchDisabled = !searchParams.destination || !searchParams.checkIn || !searchParams.checkOut;

  return (
    <div className={styles.heroSection}>
      <div className={styles.backgroundSlideshow}>
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          >
            <img
              src={image}
              alt={`Luxury Hotel ${index + 1}`}
              className={styles.heroImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.gradientOverlay}></div>

      <div className={styles.contentSection}>
        <div className={`${styles.contentWrapper} ${mockUser.isLoggedIn ? styles.userWelcome : ''}`}>
          <h1 className={styles.mainTitle}>
            {mockUser.isLoggedIn ? (
              <>
                Hello <span className={styles.welcomeHighlight}>{mockUser.name}</span>
                <div className={styles.tagline}>ready for your next adventure?</div>
              </>
            ) : (
              <>
                Welcome to <span className={styles.welcomeHighlight}>Tribtel</span>
              </>
            )}
          </h1>
          <p className={styles.subtitle}>
            {mockUser.isLoggedIn
              ? `Welcome back! Let's find your perfect getaway, ${mockUser.name}.`
              : 'Experience luxury redefined. Your perfect stay awaits with exceptional service and unforgettable moments.'
            }
          </p>
          <Button
            variant="primary"
            size="large"
            className={styles.exploreButton}
            onClick={handleExploreClick}
          >
            {mockUser.isLoggedIn ? 'Find My Stay' : 'Discover Luxury'}
          </Button>
        </div>
      </div>

      <div className={styles.searchCard}>
        <Card className={styles.searchCardContent}>
          {/* Destination Field */}
          <div className={styles.searchField}>
            <div className={styles.fieldContent}>
              <label className={styles.fieldLabel}>Destination</label>
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchParams.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.fieldIcon}>
              <div className={styles.locationIcon}></div>
            </div>
          </div>

          {/* Check-in Date Field */}
          <div className={styles.searchField}>
            <div className={styles.fieldContent}>
              <label className={styles.fieldLabel}>Check-in Date</label>
              <DatePicker
                value={searchParams.checkIn}
                onChange={(date) => handleInputChange('checkIn', date)}
                minDate={new Date()}
                maxDate={getMaxCheckInDate()}
                placeholder="Select check-in"
                className={styles.datePickerInput}
                format="MMM DD, YYYY"
              />
            </div>
          </div>

          {/* Check-out Date Field */}
          <div className={styles.searchField}>
            <div className={styles.fieldContent}>
              <label className={styles.fieldLabel}>Check-out Date</label>
              <DatePicker
                value={searchParams.checkOut}
                onChange={(date) => handleInputChange('checkOut', date)}
                minDate={getMinCheckOutDate()}
                placeholder="Select check-out"
                className={styles.datePickerInput}
                format="MMM DD, YYYY"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            variant="primary"
            size="large"
            className={styles.availabilityButton}
            onClick={handleCheckAvailability}
            disabled={isSearchDisabled}
          >
            {mockUser.isLoggedIn ? 'Find My Room' : 'Check Availability'}
          </Button>
        </Card>
      </div>

      <div className={styles.carouselIndicators}>
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;