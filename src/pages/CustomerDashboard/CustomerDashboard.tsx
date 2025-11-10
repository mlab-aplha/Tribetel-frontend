import React from 'react';
import HeroSection from '../../components/features/hero/HeroSection/HeroSection';
import Active_bookings from '../../components/features/active-bookings/active-bookings';
import Offers from '../../components/features/Offers/Offers';
import AddReview from '../../components/features/add-review/add-review';
import HotelLocations from '../../components/features/HotelLocations/HotelLocations';
import styles from './CustomerDashboard.module.css';
import Footer from '../../components/layout/Footer/Footer';
import Header from '../../components/layout/Header/Header';

interface ReviewData {
    rating: number;
    comment: string;
    title: string;
}

const CustomerDashboard: React.FC = () => {
    const handleReviewSubmit = (reviewData: ReviewData): Promise<void> => {
        console.log('Review submitted:', reviewData);
        return Promise.resolve();
    };

    return (
        <div className={styles.dashboard}>
            <Header />
            <HeroSection />
            <Active_bookings
                guestName="Wendy Smillers"
                bookingCode="TRBL0911"
                checkInDate="05 Dec 2025"
                checkOutDate="07 Dec 2025"
                hotelName="Tribtel Lux - Grand Suite"
                hotelAddress="41 Hill Drive, Cape Town, South Africa"
                guestCount={1}
            />
            <Offers />
            <AddReview onSubmit={handleReviewSubmit} />
            <HotelLocations />
            <Footer />
        </div>
    );
};

export default CustomerDashboard;