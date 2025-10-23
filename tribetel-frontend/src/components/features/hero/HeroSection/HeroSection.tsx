import React, { useState, useEffect } from 'react';
import Button from '../../../common/Button/Button';
import Card from '../../../common/Card/Card';
import styles from './HeroSection.module.css';

import heroImage from '../../../../assets/hero-image.png';
import service1 from '../../../../assets/service1.png';
import service2 from '../../../../assets/service2.png';
import service3 from '../../../../assets/service3.png';

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

const isDateInPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
};

const HeroSection: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activeDateField, setActiveDateField] = useState<'checkIn' | 'checkOut' | null>(null);
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

    const handleDateSelect = (date: Date) => {
        if (activeDateField === 'checkIn') {
            setCheckInDate(date);
            setActiveDateField('checkOut');
        } else {
            setCheckOutDate(date);
            setShowDatePicker(false);
            setActiveDateField(null);
        }
    };

    const generateCalendarDays = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days: (Date | null)[] = [];
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentSlide(index);
    };

    const calendarDays = generateCalendarDays();

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
                <div className={styles.contentWrapper}>
                    <h1 className={styles.mainTitle}>
                        Your perfect stay - One click away
                    </h1>
                    <p className={styles.subtitle}>
                        We find the best rooms at the best prices. Simple, fast, reliable.
                    </p>
                    <Button
                        variant="primary"
                        size="large"
                        className={styles.exploreButton}
                        onClick={handleExploreClick}
                    >
                        Explore
                    </Button>
                </div>
            </div>

            <div className={styles.searchCard}>
                <Card className={styles.searchCardContent}>
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

                    <div className={styles.searchField}>
                        <div className={styles.fieldContent}>
                            <label className={styles.fieldLabel}>Dates</label>
                            <div className={styles.dateInputs}>
                                <button
                                    type="button"
                                    className={`${styles.dateInput} ${checkInDate ? styles.hasValue : ''}`}
                                    onClick={() => {
                                        setShowDatePicker(true);
                                        setActiveDateField('checkIn');
                                    }}
                                >
                                    {checkInDate ? formatDate(checkInDate) : 'Check-in'}
                                </button>
                                <span className={styles.dateSeparator}>-</span>
                                <button
                                    type="button"
                                    className={`${styles.dateInput} ${checkOutDate ? styles.hasValue : ''}`}
                                    onClick={() => {
                                        if (checkInDate) {
                                            setShowDatePicker(true);
                                            setActiveDateField('checkOut');
                                        } else {
                                            alert('Please select check-in date first');
                                        }
                                    }}
                                >
                                    {checkOutDate ? formatDate(checkOutDate) : 'Check-out'}
                                </button>
                            </div>
                        </div>
                        <div className={styles.fieldIcon}>
                            <div
                                className={styles.calendarIcon}
                                onClick={() => setShowDatePicker(!showDatePicker)}
                            ></div>
                        </div>
                    </div>

                    {showDatePicker && (
                        <div className={styles.datePicker}>
                            <div className={styles.datePickerHeader}>
                                <h4>Select {activeDateField === 'checkIn' ? 'Check-in' : 'Check-out'} Date</h4>
                                <button
                                    type="button"
                                    className={styles.closeButton}
                                    onClick={() => setShowDatePicker(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className={styles.calendar}>
                                <div className={styles.calendarHeader}>
                                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </div>
                                <div className={styles.calendarGrid}>
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className={styles.calendarDayHeader}>
                                            {day}
                                        </div>
                                    ))}
                                    {calendarDays.map((date, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`${styles.calendarDay} ${date && checkInDate && date.getTime() === checkInDate.getTime() ? styles.selected : ''
                                                } ${date && checkOutDate && date.getTime() === checkOutDate.getTime() ? styles.selected : ''
                                                } ${date && isDateInPast(date) ? styles.disabled : ''
                                                }`}
                                            onClick={() => date && handleDateSelect(date)}
                                            disabled={date ? isDateInPast(date) : false}
                                        >
                                            {date ? date.getDate() : ''}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search Button */}
                    <Button
                        variant="primary"
                        size="large"
                        className={styles.availabilityButton}
                        onClick={handleCheckAvailability}
                    >
                        Check Availability
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
