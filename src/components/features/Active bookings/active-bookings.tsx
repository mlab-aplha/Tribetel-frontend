import React, { useState, useEffect } from 'react';
import styles from './Active-bookings.module.css';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import Modal from '../../common/Modal/Modal';
import Loader from '../../common/Loader/Loader';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import bookingImage from '../../../assets/1231.png';

const mockBookingsData = [
    {
        id: "1",
        guestName: "Wendy Smillers",
        bookingCode: "TRBL0911",
        checkInDate: "05 Dec 2025",
        checkOutDate: "07 Dec 2025",
        hotelName: "Tribtel Lux - Grand Suite",
        hotelAddress: "41 Hill Drive, Cape Town, South Africa",
        guestCount: 1,
        imageUrl: bookingImage,
        status: "confirmed" as const,
        totalAmount: 2450,
        currency: "ZAR"
    },
    {
        id: "2",
        guestName: "Wendy Smillers",
        bookingCode: "TRBL0912",
        checkInDate: "15 Jan 2026",
        checkOutDate: "20 Jan 2026",
        hotelName: "Tribtel Business Hotel",
        hotelAddress: "123 Main Street, Johannesburg, South Africa",
        guestCount: 2,
        imageUrl: bookingImage,
        status: "confirmed" as const,
        totalAmount: 3200,
        currency: "ZAR"
    }
];

const Active_bookings: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [currentBooking, setCurrentBooking] = useState<any>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setIsLoading(true);

                // const response = await fetch('/api/bookings/active');
                // const data = await response.json();


                await new Promise(resolve => setTimeout(resolve, 1000));
                setBookings(mockBookingsData);
            } catch (err) {
                setError('Failed to load bookings');
                console.error('Error fetching bookings:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelClick = (booking: any) => {
        setCurrentBooking(booking);
        setShowCancelConfirm(true);
    };

    const handleCancelBooking = async () => {
        if (!currentBooking) return;

        try {

            // await fetch(`/api/bookings/${currentBooking.id}/cancel`, {
            //     method: 'POST'
            // });

            console.log('Booking cancelled:', currentBooking.bookingCode);

            setBookings(prev => prev.filter(b => b.id !== currentBooking.id));
            setShowCancelConfirm(false);
            setCurrentBooking(null);

            // setBookings(prev => prev.map(b => 
            //     b.id === currentBooking.id 
            //         ? { ...b, status: 'cancelled' }
            //         : b
            // ));

        } catch (err) {
            console.error('Error cancelling booking:', err);
            setError('Failed to cancel booking');
        }
    };

    const BookingCard = ({ booking }: { booking: any }) => (
        <Card className={styles.bookingCard}>
            <div className={styles.cardImageSection}>
                <img
                    src={booking.imageUrl}
                    alt={booking.hotelName}
                    className={styles.hotelImage}
                />
                <div className={styles.bookingBadge}>{booking.bookingCode}</div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.bookingHeader}>
                    <div className={styles.guestInfo}>
                        <h2 className={styles.guestName}>{booking.guestName}</h2>
                        <span className={styles.bookingId}>Booking ID: {booking.bookingCode}</span>
                    </div>
                    {booking.totalAmount && (
                        <div className={styles.bookingAmount}>
                            {booking.currency} {booking.totalAmount}
                        </div>
                    )}
                </div>

                <div className={styles.bookingDetails}>
                    <div className={styles.dateSection}>
                        <div className={styles.dateRange}>
                            <span className={styles.dateLabel}>Check-in</span>
                            <span className={styles.dateValue}>{booking.checkInDate}</span>
                        </div>
                        <div className={styles.dateSeparator}>
                            <div className={styles.arrowIcon}></div>
                        </div>
                        <div className={styles.dateRange}>
                            <span className={styles.dateLabel}>Check-out</span>
                            <span className={styles.dateValue}>{booking.checkOutDate}</span>
                        </div>
                    </div>

                    <div className={styles.hotelInfo}>
                        <h3 className={styles.hotelName}>{booking.hotelName}</h3>
                        <p className={styles.hotelAddress}>
                            {booking.hotelAddress}
                        </p>
                    </div>

                    <div className={styles.guestInfoSection}>
                        <span className={styles.guestCount}>
                            {booking.guestCount} {booking.guestCount === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <span className={`${styles.statusBadge} ${styles[booking.status]}`}>
                            {booking.status}
                        </span>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <Button
                        variant="secondary"
                        size="medium"
                        onClick={() => handleCancelClick(booking)}
                    >
                        Cancel Booking
                    </Button>
                </div>
            </div>
        </Card>
    );

    if (isLoading) {
        return (
            <div className={styles.bookingApp}>
                <Loader text="Loading your bookings..." fullscreen />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.bookingApp}>
                <ErrorMessage message={error} variant="error" />
            </div>
        );
    }

    return (
        <div className={styles.bookingApp}>
            <header className={styles.appHeader}>
                <h1 className={styles.pageTitle}>Your Bookings</h1>
                <p className={styles.pageSubtitle}>
                    {bookings.length} active booking{bookings.length !== 1 ? 's' : ''}
                </p>
            </header>

            <div className={styles.bookingsList}>
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))
                ) : (
                    <Card className={styles.emptyState}>
                        <h3>No Active Bookings</h3>
                        <p>You don't have any active bookings at the moment.</p>
                        <Button variant="primary" onClick={() => window.location.href = '/search'}>
                            Find Hotels
                        </Button>
                    </Card>
                )}
            </div>

            <Modal
                isOpen={showCancelConfirm}
                onClose={() => setShowCancelConfirm(false)}
                className={styles.modal}
            >
                <Card className={styles.modalContent}>
                    <h3>Cancel Booking?</h3>
                    <p>Are you sure you want to cancel your booking at {currentBooking?.hotelName}?</p>
                    <p className={styles.bookingRef}>Booking: {currentBooking?.bookingCode}</p>
                    <div className={styles.modalActions}>
                        <Button
                            variant="outline"
                            size="medium"
                            onClick={() => setShowCancelConfirm(false)}
                        >
                            Keep Booking
                        </Button>
                        <Button
                            variant="primary"
                            size="medium"
                            onClick={handleCancelBooking}
                        >
                            Yes, Cancel
                        </Button>
                    </div>
                </Card>
            </Modal>
        </div>
    );
};

export default Active_bookings;