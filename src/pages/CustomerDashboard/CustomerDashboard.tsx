import React, { useState, useEffect } from 'react';
import ActiveBookings from '../../components/features/active-bookings/active-bookings';
import Offers from '../../components/features/Offers/Offers';
import AddReview from '../../components/features/add-review/add-review';
import HotelLocations from '../../components/features/hotel-locations/HotelLocations';
import styles from './CustomerDashboard.module.css';
import Header from '../../components/layout/Header/Header';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader/Loader';
import {
    DashboardIcon,
    HotelIcon,
    TargetIcon,
    StarIcon,
    CalendarIcon,
    DiamondIcon,
    AwardIcon,
    RocketIcon,
    BookOpenIcon,
    SmartphoneIcon,
    CrownIcon,
    CloudIcon,
    SparklesIcon,
    ArrowRightIcon
} from '../../components/common/Icons/Icons';

interface ReviewData {
    rating: number;
    comment: string;
    title: string;
}

interface UserStats {
    totalBookings: number;
    loyaltyPoints: number;
    memberSince: string;
    favoriteHotel: string;
    upcomingTrips: number;
}

const CustomerDashboard: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'offers' | 'reviews'>('overview');
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUserStats = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setUserStats({
                totalBookings: 12,
                loyaltyPoints: 2450,
                memberSince: '2023',
                favoriteHotel: 'Tribtel Lux - Grand Suite',
                upcomingTrips: 2
            });
            setIsLoading(false);
        };

        loadUserStats();
    }, []);

    const handleReviewSubmit = (reviewData: ReviewData): Promise<void> => {
        console.log('Review submitted:', reviewData);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Review saved successfully!');
                resolve();
            }, 1000);
        });
    };

    const quickActions = [
        {
            icon: <BookOpenIcon size={28} color="#470F51" />,
            label: 'Book Now',
            description: 'Find your perfect stay',
            action: () => console.log('Navigate to booking')
        },
        {
            icon: <SmartphoneIcon size={28} color="#470F51" />,
            label: 'Mobile Key',
            description: 'Access your room digitally',
            action: () => console.log('Show mobile key')
        },
        {
            icon: <TargetIcon size={28} color="#470F51" />,
            label: 'Special Offers',
            description: 'Exclusive deals for you',
            action: () => setActiveTab('offers')
        },
        {
            icon: <CrownIcon size={28} color="#470F51" />,
            label: 'Loyalty',
            description: 'Your rewards status',
            action: () => console.log('Show loyalty program')
        }
    ];

    const getUserDisplayName = () => {
        if (!user) return 'Valued Guest';
        return user.full_name || user.email?.split('@')[0] || 'Valued Guest';
    };

    if (isLoading) {
        return (
            <div className={styles.dashboard}>
                <Header />
                <div className={styles.loadingContainer}>
                    <Loader text="Preparing your luxury experience..." />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <Header />

            <section className={styles.personalizedHero}>
                <div className={styles.heroContent}>
                    <div className={styles.welcomeSection}>
                        <h1 className={styles.welcomeTitle}>
                            Welcome back, {getUserDisplayName()}!
                        </h1>
                        <p className={styles.welcomeSubtitle}>
                            Ready for your next luxury experience?
                        </p>
                        <div className={styles.weatherWidget}>
                            <CloudIcon className={styles.weatherIcon} size={20} color="currentColor" />
                            <span>24°C • Perfect for your stay</span>
                        </div>
                    </div>
                </div>
                <div className={styles.heroVisual}>
                    <div className={styles.floatingCard}>
                        <SparklesIcon className={styles.cardIcon} size={20} color="#470F51" />
                        <span>Elite Member</span>
                    </div>
                </div>
            </section>

            <nav className={styles.dashboardNav}>
                <button
                    className={`${styles.navItem} ${activeTab === 'overview' ? styles.navActive : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    <DashboardIcon className={styles.navIcon} size={24} color="currentColor" />
                    Overview
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'bookings' ? styles.navActive : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    <HotelIcon className={styles.navIcon} size={24} color="currentColor" />
                    My Bookings
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'offers' ? styles.navActive : ''}`}
                    onClick={() => setActiveTab('offers')}
                >
                    <TargetIcon className={styles.navIcon} size={24} color="currentColor" />
                    Special Offers
                </button>
                <button
                    className={`${styles.navItem} ${activeTab === 'reviews' ? styles.navActive : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    <StarIcon className={styles.navIcon} size={24} color="currentColor" />
                    Share Experience
                </button>
            </nav>

            <main className={styles.mainContent}>
                {activeTab === 'overview' && (
                    <div className={styles.overviewTab}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <CalendarIcon size={32} color="#FDC959" />
                                </div>
                                <div className={styles.statInfo}>
                                    <h3>{userStats?.totalBookings}</h3>
                                    <p>Total Stays</p>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <DiamondIcon size={32} color="#FDC959" />
                                </div>
                                <div className={styles.statInfo}>
                                    <h3>{userStats?.loyaltyPoints}</h3>
                                    <p>Loyalty Points</p>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <AwardIcon size={32} color="#FDC959" />
                                </div>
                                <div className={styles.statInfo}>
                                    <h3>{userStats?.memberSince}</h3>
                                    <p>Member Since</p>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <RocketIcon size={32} color="#FDC959" />
                                </div>
                                <div className={styles.statInfo}>
                                    <h3>{userStats?.upcomingTrips}</h3>
                                    <p>Upcoming Trips</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <section className={styles.quickActionsSection}>
                            <h2 className={styles.sectionTitle}>Quick Actions</h2>
                            <div className={styles.quickActionsGrid}>
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        className={styles.quickActionCard}
                                        onClick={action.action}
                                    >
                                        <div className={styles.actionIcon}>
                                            {action.icon}
                                        </div>
                                        <div className={styles.actionContent}>
                                            <h4>{action.label}</h4>
                                            <p>{action.description}</p>
                                        </div>
                                        <div className={styles.actionArrow}>
                                            <ArrowRightIcon size={20} color="currentColor" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className={styles.bookingsPreview}>
                            <h2 className={styles.sectionTitle}>Current Stay</h2>
                            <ActiveBookings
                                guestName={getUserDisplayName()}
                                bookingCode="TRBL0911"
                                checkInDate="05 Dec 2025"
                                checkOutDate="07 Dec 2025"
                                hotelName="Tribtel Lux - Grand Suite"
                                hotelAddress="41 Hill Drive, Cape Town, South Africa"
                                guestCount={1}
                            />
                        </section>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className={styles.bookingsTab}>
                        <h2 className={styles.sectionTitle}>Your Bookings</h2>
                        <ActiveBookings
                            guestName={getUserDisplayName()}
                            bookingCode="TRBL0911"
                            checkInDate="05 Dec 2025"
                            checkOutDate="07 Dec 2025"
                            hotelName="Tribtel Lux - Grand Suite"
                            hotelAddress="41 Hill Drive, Cape Town, South Africa"
                            guestCount={1}
                        />
                    </div>
                )}

                {activeTab === 'offers' && (
                    <div className={styles.offersTab}>
                        <h2 className={styles.sectionTitle}>Personalized Offers</h2>
                        <Offers />
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.reviewsTab}>
                        <h2 className={styles.sectionTitle}>Share Your Experience</h2>
                        <AddReview onSubmit={handleReviewSubmit} />
                    </div>
                )}
            </main>

            <section className={styles.featuredSection}>
                <h2 className={styles.sectionTitle}>Explore Our Destinations</h2>
                <HotelLocations />
            </section>
        </div>
    );
};

export default CustomerDashboard;