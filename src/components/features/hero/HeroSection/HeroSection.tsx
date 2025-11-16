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

const HeroSection: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
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
  };

  const handleCheckAvailability = () => {
    if (!destination || !checkInDate || !checkOutDate) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Search parameters:', {
      destination,
      checkIn: checkInDate,
      checkOut: checkOutDate
    });
  };

  const getMinCheckOutDate = () => {
    if (!checkInDate) return new Date();
    const minDate = new Date(checkInDate);
    minDate.setDate(minDate.getDate() + 1);
    return minDate;
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

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
                placeholder="City, Region"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
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
                value={checkInDate}
                onChange={setCheckInDate}
                placeholder="Select date"
                className={styles.datePickerInput}
                format="MM/DD/YYYY"
              />
            </div>
          </div>

          {/* Check-out Date Field */}
          <div className={styles.searchField}>
            <div className={styles.fieldContent}>
              <label className={styles.fieldLabel}>Check-out Date</label>
              <DatePicker
                value={checkOutDate}
                onChange={setCheckOutDate}
                minDate={getMinCheckOutDate()}
                placeholder="Select date"
                className={styles.datePickerInput}
                format="MM/DD/YYYY"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button
            variant="primary"
            size="large"
            className={styles.availabilityButton}
            onClick={handleCheckAvailability}
          >
            {mockUser.isLoggedIn ? 'Find My Room' : 'Check Availability'}
          </Button>
        </Card>
      </div>

      <div className={styles.carouselIndicators}>
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;