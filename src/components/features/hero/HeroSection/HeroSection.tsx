import React, { useState, useEffect, useRef } from 'react';
import Button from '@components/common/Button/Button';
import Card from '@components/common/Card/Card';
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

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate = new Date(),
  maxDate,
  placeholder = 'Select date',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close datepicker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setView('days');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange(date);
      setIsOpen(false);
      setView('days');
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const goToToday = () => {
    const today = new Date();
    if (!isDateDisabled(today)) {
      onChange(today);
      setIsOpen(false);
    }
    setCurrentMonth(new Date());
    setView('days');
  };

  const selectMonth = (month: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(month);
    setCurrentMonth(newDate);
    setView('days');
  };

  const selectYear = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setView('months');
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className={`${styles.datePickerContainer} ${className}`} ref={datePickerRef}>
      <div
        className={`${styles.datePickerInput} ${isOpen ? styles.datePickerInputFocused : ''} ${value ? styles.datePickerHasValue : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.datePickerValue : styles.datePickerPlaceholder}>
          {value ? formatDate(value) : placeholder}
        </span>
        <div className={styles.datePickerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={styles.datePickerPopup}>
          {/* Header with navigation */}
          <div className={styles.datePickerHeader}>
            <button
              type="button"
              className={styles.datePickerNavButton}
              onClick={() => view === 'days' ? navigateMonth('prev') : setView('days')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 19L8 12L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={styles.datePickerMonthYear}>
              {view === 'days' && (
                <button
                  type="button"
                  className={styles.datePickerViewToggle}
                  onClick={() => setView('months')}
                >
                  {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
                </button>
              )}
              {view === 'months' && (
                <button
                  type="button"
                  className={styles.datePickerViewToggle}
                  onClick={() => setView('years')}
                >
                  {currentMonth.getFullYear()}
                </button>
              )}
              {view === 'years' && (
                <span className={styles.datePickerYearRange}>
                  {years[0]} - {years[years.length - 1]}
                </span>
              )}
            </div>

            <button
              type="button"
              className={styles.datePickerNavButton}
              onClick={() => view === 'days' ? navigateMonth('next') : setView('days')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Calendar Grid */}
          {view === 'days' && (
            <>
              <div className={styles.datePickerGrid}>
                {weekDays.map(day => (
                  <div key={day} className={styles.datePickerWeekDay}>
                    {day}
                  </div>
                ))}

                {calendarDays.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.datePickerDay} ${date ? (
                      value && date.toDateString() === value.toDateString()
                        ? styles.datePickerSelected
                        : isDateDisabled(date)
                          ? styles.datePickerDisabled
                          : styles.datePickerAvailable
                    ) : styles.datePickerEmpty
                      } ${date && date.getDate() === new Date().getDate() &&
                        date.getMonth() === new Date().getMonth() &&
                        date.getFullYear() === new Date().getFullYear() ? styles.datePickerToday : ''}`}
                    onClick={() => date && handleDateSelect(date)}
                    disabled={!date || isDateDisabled(date)}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                ))}
              </div>

              <div className={styles.datePickerFooter}>
                <button
                  type="button"
                  className={styles.datePickerTodayButton}
                  onClick={goToToday}
                >
                  Today
                </button>
              </div>
            </>
          )}

          {/* Months View */}
          {view === 'months' && (
            <div className={styles.datePickerMonthsGrid}>
              {months.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  className={`${styles.datePickerMonth} ${currentMonth.getMonth() === index ? styles.datePickerSelected : ''
                    }`}
                  onClick={() => selectMonth(index)}
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          {/* Years View */}
          {view === 'years' && (
            <div className={styles.datePickerYearsGrid}>
              {years.map(year => (
                <button
                  key={year}
                  type="button"
                  className={`${styles.datePickerYear} ${currentMonth.getFullYear() === year ? styles.datePickerSelected : ''
                    }`}
                  onClick={() => selectYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main HeroSection Component
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
  };

  const handleCheckAvailability = () => {
    const { destination, checkIn, checkOut } = searchParams;

    if (!destination || !checkIn || !checkOut) {
      alert('Please fill in all fields');
      return;
    }

    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }

    console.log('Search parameters:', {
      destination,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString()
    });
  };

  const handleInputChange = (field: keyof SearchParams, value: string | Date | null) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));

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