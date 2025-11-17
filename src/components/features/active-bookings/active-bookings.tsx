import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./active-bookings.module.css";
import Button from '@components/common/Button/Button';
import Card from '@components/common/Card/Card';
import Modal from '@components/common/Modal/Modal';
import Loader from '@components/common/Loader/Loader';
import ErrorMessage from '@components/common/ErrorMessage/ErrorMessage';
import bookingImage from '@/assets/1231.png';

interface Booking {
    id: string;
    guestName: string;
    bookingCode: string;
    checkInDate: string;
    checkOutDate: string;
    hotelName: string;
    hotelAddress: string;
    guestCount: number;
    imageUrl: string;
    status: 'confirmed' | 'cancelled' | 'pending' | 'payment_pending';
    totalAmount?: number;
    currency?: string;
    paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
}

interface ActiveBookingsProps {
    guestName?: string;
    bookingCode?: string;
    checkInDate?: string;
    checkOutDate?: string;
    hotelName?: string;
    hotelAddress?: string;
    guestCount?: number;
}

const mockBookingsData: Booking[] = [
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
        status: "payment_pending",
        totalAmount: 2450,
        currency: "ZAR",
        paymentStatus: "pending"
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
        status: "confirmed",
        totalAmount: 3200,
        currency: "ZAR",
        paymentStatus: "paid"
    },
    {
        id: "3",
        guestName: "Wendy Smillers",
        bookingCode: "TRBL0913",
        checkInDate: "20 Feb 2026",
        checkOutDate: "25 Feb 2026",
        hotelName: "Tribtel Beach Resort",
        hotelAddress: "45 Coastal Road, Durban, South Africa",
        guestCount: 2,
        imageUrl: bookingImage,
        status: "confirmed",
        totalAmount: 2800,
        currency: "ZAR",
        paymentStatus: "paid"
    }
];

const Active_bookings: React.FC<ActiveBookingsProps> = (props) => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setIsLoading(true);

                // If props are provided, create a booking from props
                if (props.guestName && props.bookingCode) {
                    const propBooking: Booking = {
                        id: "prop-booking",
                        guestName: props.guestName,
                        bookingCode: props.bookingCode,
                        checkInDate: props.checkInDate || "N/A",
                        checkOutDate: props.checkOutDate || "N/A",
                        hotelName: props.hotelName || "N/A",
                        hotelAddress: props.hotelAddress || "N/A",
                        guestCount: props.guestCount || 1,
                        imageUrl: bookingImage,
                        status: "payment_pending",
                        paymentStatus: "pending"
                    };
                    setBookings([propBooking, ...mockBookingsData]);
                } else {
                    // Otherwise use mock data
                    setBookings(mockBookingsData);
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (err) {
                setError('Failed to load bookings');
                console.error('Error fetching bookings:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [props]);

    const handleCancelClick = (booking: Booking) => {
        setCurrentBooking(booking);
        setShowCancelConfirm(true);
    };

    const handleCancelBooking = async () => {
        if (!currentBooking) return;

        try {
            console.log('Booking cancelled:', currentBooking.bookingCode);

            setBookings(prev => prev.filter(b => b.id !== currentBooking.id));
            setShowCancelConfirm(false);
            setCurrentBooking(null);
        } catch (err) {
            console.error('Error cancelling booking:', err);
            setError('Failed to cancel booking');
        }
    };

    const handlePayNow = (booking: Booking) => {
        // Navigate to payment page with booking details
        navigate('/payment', {
            state: {
                booking: {
                    id: booking.id,
                    roomTitle: booking.hotelName,
                    nights: calculateNights(booking.checkInDate, booking.checkOutDate),
                    total: booking.totalAmount || 0,
                    checkIn: booking.checkInDate,
                    checkOut: booking.checkOutDate,
                    guests: booking.guestCount,
                    fullName: booking.guestName,
                    email: "customer@example.com" // You might want to get this from user context
                }
            }
        });
    };

    const calculateNights = (checkIn: string, checkOut: string): number => {
        if (!checkIn || !checkOut) return 0;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    };

    const getStatusBadgeClass = (status: string, paymentStatus?: string) => {
        if (status === 'payment_pending' || paymentStatus === 'pending') {
            return styles.paymentPending;
        }
        return styles[status] || styles.pending;
    };

    const getStatusText = (status: string, paymentStatus?: string) => {
        if (status === 'payment_pending' || paymentStatus === 'pending') {
            return 'Payment Required';
        }
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const BookingCard = ({ booking }: { booking: Booking }) => {
        const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
        const requiresPayment = booking.status === 'payment_pending' || booking.paymentStatus === 'pending';

        return (
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

                        <div className={styles.stayInfo}>
                            <span className={styles.nightsInfo}>
                                {nights} night{nights !== 1 ? 's' : ''}
                            </span>
                            <span className={styles.guestsInfo}>
                                {booking.guestCount} guest{booking.guestCount !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className={styles.hotelInfo}>
                            <h3 className={styles.hotelName}>{booking.hotelName}</h3>
                            <p className={styles.hotelAddress}>
                                {booking.hotelAddress}
                            </p>
                        </div>

                        <div className={styles.statusSection}>
                            <span className={`${styles.statusBadge} ${getStatusBadgeClass(booking.status, booking.paymentStatus)}`}>
                                {getStatusText(booking.status, booking.paymentStatus)}
                            </span>
                            {booking.paymentStatus && booking.paymentStatus !== 'pending' && (
                                <span className={`${styles.paymentStatus} ${styles[booking.paymentStatus]}`}>
                                    {booking.paymentStatus}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        {requiresPayment ? (
                            <>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    onClick={() => handlePayNow(booking)}
                                >
                                    Pay Now
                                </Button>
                                <Button
                                    variant="outline"
                                    size="medium"
                                    onClick={() => handleCancelClick(booking)}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => console.log('Modify booking:', booking.bookingCode)}
                                >
                                    Modify
                                </Button>
                                <Button
                                    variant="outline"
                                    size="medium"
                                    onClick={() => handleCancelClick(booking)}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Card>
        );
    };

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

    const pendingPayments = bookings.filter(b =>
        b.status === 'payment_pending' || b.paymentStatus === 'pending'
    ).length;

    return (
        <div className={styles.bookingApp}>
            <header className={styles.appHeader}>
                <div className={styles.headerContent}>
                    <div>
                        <h1 className={styles.pageTitle}>Your Bookings</h1>
                        <p className={styles.pageSubtitle}>
                            {bookings.length} active booking{bookings.length !== 1 ? 's' : ''}
                            {pendingPayments > 0 && (
                                <span className={styles.pendingPaymentAlert}>
                                    • {pendingPayments} pending payment{pendingPayments !== 1 ? 's' : ''}
                                </span>
                            )}
                        </p>
                    </div>
                    {pendingPayments > 0 && (
                        <div className={styles.paymentAlert}>
                            <span>💳 Complete your payments to confirm bookings</span>
                        </div>
                    )}
                </div>
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
                        <Button variant="primary" onClick={() => navigate('/search')}>
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