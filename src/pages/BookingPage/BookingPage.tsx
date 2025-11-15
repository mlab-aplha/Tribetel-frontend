import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './BookingPage.module.css';
import BookingForm from '../../components/features/booking/BookingForm/BookingForm';
import BookingConfirmation from '../../components/features/booking/BookingConfirmation/BookingConfirmation';
import PaymentForm from '../../components/features/booking/PaymentForm/PaymentForm';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';
import { Room, BookingResponse } from '../../components/types/common';
import { BookingConfirmationData } from '../../components/types/booking';
import { getRoomById } from '../../services/roomService';

const BookingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const [room, setRoom] = useState<Room | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<'booking' | 'payment' | 'confirmation'>('booking');
    const [bookingData, setBookingData] = useState<BookingResponse | null>(null);

    const fetchRoom = async () => {
        if (!id) {
            setError('Room ID is required');
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await getRoomById(id);

            if (response.success) {
                setRoom(response.data);
            } else {
                throw new Error(response.message || 'Failed to load room details');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load room details';
            setError(errorMessage);
            console.error('Error fetching room:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const step = searchParams.get('step') as 'booking' | 'payment' | 'confirmation';
        const bookingId = searchParams.get('bookingId');

        if (step) {
            setCurrentStep(step);
        }

        if (bookingId && step === 'confirmation') {
            setCurrentStep('confirmation');
        }
    }, [location]);

    useEffect(() => {
        fetchRoom();
    }, [id]);

    const handleBookingSuccess = (booking: BookingResponse) => {
        setBookingData(booking);
        setCurrentStep('payment');
        window.scrollTo(0, 0);
    };

    const handleBookingError = (error: string) => {
        setError(error);
    };

    const handleBackToRooms = () => {
        navigate('/rooms');
    };

    const handleEditBooking = () => {
        setCurrentStep('booking');
        setError(null);
        window.scrollTo(0, 0);
    };

    const createBookingConfirmationData = (booking: BookingResponse): BookingConfirmationData => {
        return {
            id: booking.id,
            roomId: booking.roomId,
            bookingNumber: `BK-${booking.id}-${Date.now()}`,
            fullName: booking.customerName || 'Guest User',
            roomTitle: booking.roomTitle,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            nights: booking.nights,
            guests: booking.guests,
            total: booking.totalAmount,
            status: booking.status,
            paymentStatus: 'paid',
            email: booking.customerEmail || 'guest@example.com',
            confirmedAt: new Date().toISOString(),
            specialRequests: booking.specialRequests || '',
            customerPhone: booking.customerPhone || 'Not provided'
        };
    };

    // ... rest of your component (loading, error, and return JSX) remains the same
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div>Loading...</div>
                <p>Loading room details...</p>
            </div>
        );
    }

    if (error && !room) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorContent}>
                    <ErrorMessage
                        message={error}
                        variant="error"
                        size="large"
                    />
                    <button
                        className={styles.retryButton}
                        onClick={fetchRoom}
                    >
                        Try Again
                    </button>
                </div>
                <button
                    className={styles.backButton}
                    onClick={handleBackToRooms}
                >
                    Back to Rooms
                </button>
            </div>
        );
    }

    if (!room) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorContent}>
                    <ErrorMessage
                        message="Room not found"
                        variant="error"
                        size="large"
                    />
                    <button
                        className={styles.retryButton}
                        onClick={handleBackToRooms}
                    >
                        Browse Rooms
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.bookingPage}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <button
                        className={styles.backButton}
                        onClick={currentStep === 'booking' ? handleBackToRooms : handleEditBooking}
                    >
                        ← Back {currentStep === 'booking' ? 'to Rooms' : 'to Booking'}
                    </button>

                    <div className={styles.steps}>
                        <div className={`${styles.step} ${currentStep === 'booking' ? styles.active : ''} ${currentStep === 'payment' || currentStep === 'confirmation' ? styles.completed : ''}`}>
                            <span className={styles.stepNumber}>1</span>
                            <span className={styles.stepLabel}>Booking Details</span>
                        </div>
                        <div className={`${styles.step} ${currentStep === 'payment' ? styles.active : ''} ${currentStep === 'confirmation' ? styles.completed : ''}`}>
                            <span className={styles.stepNumber}>2</span>
                            <span className={styles.stepLabel}>Payment</span>
                        </div>
                        <div className={`${styles.step} ${currentStep === 'confirmation' ? styles.active : ''}`}>
                            <span className={styles.stepNumber}>3</span>
                            <span className={styles.stepLabel}>Confirmation</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.container}>
                    {error && (
                        <div className={styles.errorBanner}>
                            <ErrorMessage
                                message={error}
                                onDismiss={() => setError(null)}
                                dismissible
                            />
                        </div>
                    )}
                    {currentStep === 'booking' && (
                        <div className={styles.bookingSection}>
                            <div className={styles.bookingHeader}>
                                <h1>Book Your Stay</h1>
                                <p>Complete your booking by filling in the details below</p>
                            </div>

                            <div className={styles.bookingContent}>
                                <div className={styles.formSection}>
                                    <BookingForm
                                        room={room}
                                        onBookingSuccess={handleBookingSuccess}
                                        onBookingError={handleBookingError}
                                    />
                                </div>

                                <div className={styles.roomSummary}>
                                    <div className={styles.summaryCard}>
                                        <img
                                            src={room.image}
                                            alt={room.title}
                                            className={styles.roomImage}
                                        />
                                        <div className={styles.roomInfo}>
                                            <h3>{room.title}</h3>
                                            <p className={styles.roomDescription}>{room.description}</p>
                                            <div className={styles.roomFeatures}>
                                                {room.features?.slice(0, 3).map((feature, index) => (
                                                    <span key={index} className={styles.feature}>
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className={styles.price}>
                                                R{room.pricePerNight} <span>/ night</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 'payment' && bookingData && (
                        <div className={styles.paymentSection}>
                            <div className={styles.paymentHeader}>
                                <h1>Complete Payment</h1>
                                <p>Secure payment for your booking</p>
                            </div>

                            <div className={styles.paymentContent}>
                                <div className={styles.paymentForm}>
                                    <PaymentForm
                                        onPaymentSuccess={() => {
                                            setCurrentStep('confirmation');
                                            window.scrollTo(0, 0);
                                        }}
                                        onPaymentError={(error: string) => setError(error)}
                                    />
                                </div>

                                <div className={styles.bookingSummary}>
                                    <div className={styles.summaryCard}>
                                        <h3>Booking Summary</h3>
                                        <div className={styles.summaryItem}>
                                            <span>Room:</span>
                                            <span>{room.title}</span>
                                        </div>
                                        <div className={styles.summaryItem}>
                                            <span>Check-in:</span>
                                            <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                                        </div>
                                        <div className={styles.summaryItem}>
                                            <span>Check-out:</span>
                                            <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                                        </div>
                                        <div className={styles.summaryItem}>
                                            <span>Guests:</span>
                                            <span>{bookingData.guests}</span>
                                        </div>
                                        <div className={styles.summaryItem}>
                                            <span>Nights:</span>
                                            <span>{bookingData.nights}</span>
                                        </div>
                                        <div className={styles.summaryTotal}>
                                            <span>Total:</span>
                                            <span>R{bookingData.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 'confirmation' && bookingData && (
                        <div className={styles.confirmationSection}>
                            <BookingConfirmation
                                booking={createBookingConfirmationData(bookingData)}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BookingPage;

