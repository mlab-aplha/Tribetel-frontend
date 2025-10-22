import React, { useState } from 'react';
import styles from './Active-bookings.module.css';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import Modal from '../../common/Modal/Modal';
import bookingImage from '../../../assets/1231.png';

interface ActiveBookingsProps {
    guestName?: string;
    bookingCode?: string;
    checkInDate?: string;
    checkOutDate?: string;
    hotelName?: string;
    hotelAddress?: string;
    guestCount?: number;
    imageUrl?: string;
}

const Active_bookings: React.FC<ActiveBookingsProps> = ({
    guestName = "Wendy Smillers",
    bookingCode = "TRBL0911",
    checkInDate = "05 Dec 2025",
    checkOutDate = "07 Dec 2025",
    hotelName = "Tribtel Lux - Grand Suite",
    hotelAddress = "41 Hill Drive, Cape Town, South Africa",
    guestCount = 1,
    imageUrl = bookingImage
}) => {
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const handleCancelBooking = () => {
        console.log('Booking cancelled');
        setShowCancelConfirm(false);
    };

    return (
        <div className={styles.bookingApp}>
            <header className={styles.appHeader}>
                <h1 className={styles.pageTitle}>Your Bookings</h1>
            </header>

            <Card className={styles.bookingCard}>
                <div className={styles.cardImageSection}>
                    <img
                        src={imageUrl}
                        alt={hotelName}
                        className={styles.hotelImage}
                    />
                    <div className={styles.bookingBadge}>{bookingCode}</div>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.bookingHeader}>
                        <div className={styles.guestInfo}>
                            <h2 className={styles.guestName}>{guestName}</h2>
                            <span className={styles.bookingId}>Booking ID: {bookingCode}</span>
                        </div>
                    </div>

                    <div className={styles.bookingDetails}>
                        <div className={styles.dateSection}>
                            <div className={styles.dateRange}>
                                <span className={styles.dateLabel}>Check-in</span>
                                <span className={styles.dateValue}>{checkInDate}</span>
                            </div>
                            <div className={styles.dateSeparator}>
                                <div className={styles.arrowIcon}></div>
                            </div>
                            <div className={styles.dateRange}>
                                <span className={styles.dateLabel}>Check-out</span>
                                <span className={styles.dateValue}>{checkOutDate}</span>
                            </div>
                        </div>

                        <div className={styles.hotelInfo}>
                            <h3 className={styles.hotelName}>{hotelName}</h3>
                            <p className={styles.hotelAddress}>
                                {hotelAddress}
                            </p>
                        </div>

                        <div className={styles.guestInfoSection}>
                            <span className={styles.guestCount}>
                                {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                            </span>
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <Button
                            variant="secondary"
                            size="medium"
                            onClick={() => setShowCancelConfirm(true)}
                        >
                            Cancel Booking
                        </Button>
                    </div>
                </div>
            </Card>

            <Modal
                isOpen={showCancelConfirm}
                onClose={() => setShowCancelConfirm(false)}
                className={styles.modal}
            >
                <Card className={styles.modalContent}>
                    <h3>Cancel Booking?</h3>
                    <p>Are you sure you want to cancel your booking at {hotelName}?</p>
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