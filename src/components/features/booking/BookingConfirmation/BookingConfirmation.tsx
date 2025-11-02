import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './BookingConfirmation.module.css';
import { BookingConfirmation as BookingConfirmationType } from '../../../types/common';
import { getBookingConfirmation } from '../../../../services/bookingService';
import LoadingSpinner from '../../../common/Loader/Loader';
import ErrorMessage from '../../../common/ErrorMessage/ErrorMessage';

interface BookingConfirmationProps {
  booking?: BookingConfirmationType;
  bookingId?: string;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking: initialBooking,
  bookingId
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [booking, setBooking] = useState<BookingConfirmationType | null>(initialBooking || null);
  const [isLoading, setIsLoading] = useState(!initialBooking);
  const [error, setError] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const urlBookingId = searchParams.get('bookingId') || bookingId;

  useEffect(() => {
    if (!initialBooking && urlBookingId) {
      fetchBookingConfirmation(urlBookingId);
    }
  }, [initialBooking, urlBookingId]);

  const fetchBookingConfirmation = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getBookingConfirmation(id);
      if (response.success) {
        setBooking(response.data.booking);
      } else {
        throw new Error(response.message || 'Failed to load booking confirmation');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load booking details';
      setError(errorMessage);
      console.error('Error fetching booking confirmation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const handleDownload = () => {
    alert('PDF download feature would be implemented here');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
        <p>Loading your booking confirmation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorMessage
          message={error}
          variant="error"
          size="large"
        />
        <button
          className={styles.retryButton}
          onClick={() => urlBookingId && fetchBookingConfirmation(urlBookingId)}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className={styles.errorContainer}>
        <ErrorMessage
          message="Booking confirmation not found"
          variant="error"
          size="large"
        />
        <button
          className={styles.retryButton}
          onClick={() => navigate('/my-bookings')}
        >
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.confirm} ${isPrinting ? styles.printMode : ''}`}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.successIcon}>✓</div>
        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtitle}>
          Thank you for choosing our hotel. Your reservation has been successfully processed.
        </p>
      </div>

      {/* Booking Summary */}
      <div className={styles.summary}>
        <h2 className={styles.summaryTitle}>Booking Summary</h2>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <strong>Booking Reference:</strong>
            <span>{booking.bookingNumber}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Guest Name:</strong>
            <span>{booking.fullName}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Room Type:</strong>
            <span>{booking.roomTitle}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Check-in:</strong>
            <span>{formatDate(booking.checkIn)}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Check-out:</strong>
            <span>{formatDate(booking.checkOut)}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Duration:</strong>
            <span>{booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Guests:</strong>
            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Status:</strong>
            <span className={`${styles.status} ${styles[booking.status]}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <strong>Payment:</strong>
            <span className={`${styles.paymentStatus} ${styles[booking.paymentStatus]}`}>
              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className={styles.pricing}>
        <h3 className={styles.pricingTitle}>Price Details</h3>
        <div className={styles.priceRow}>
          <span>Room rate ({booking.nights} nights):</span>
          <span>R {(booking.total / booking.nights).toFixed(2)}/night</span>
        </div>
        <div className={styles.priceTotal}>
          <strong>Total Amount:</strong>
          <strong>R {booking.total.toFixed(2)}</strong>
        </div>
      </div>

      {booking.specialRequests && (
        <div className={styles.requests}>
          <h3 className={styles.requestsTitle}>Special Requests</h3>
          <p>{booking.specialRequests}</p>
        </div>
      )}

      {/* Contact Information */}
      <div className={styles.contactInfo}>
        <h3 className={styles.contactTitle}>Need Help?</h3>
        <p>Contact our customer service:</p>
        <div className={styles.contactDetails}>
          <div> +27 (00) 123-4567</div>
          <div> support@hotel.com</div>
          <div> 123 Hotel Street, City, State 12345</div>
        </div>
      </div>

      {/* Confirmation Details */}
      <div className={styles.confirmationDetails}>
        <p className={styles.confirmationText}>
          Confirmation sent to <strong>{booking.email}</strong> on{' '}
          {formatDateTime(booking.confirmedAt)}.
        </p>
        <p className={styles.note}>
          Please present this confirmation and a valid ID at check-in.
        </p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          className={styles.primaryBtn}
          onClick={handlePrint}
        >
          {isPrinting ? 'Printing...' : 'Print Confirmation'}
        </button>
        <button
          className={styles.secondaryBtn}
          onClick={handleDownload}
        >
          Download PDF
        </button>
        <button
          className={styles.backBtn}
          onClick={() => navigate('/my-bookings')}
        >
          View My Bookings
        </button>
        <button
          className={styles.homeBtn}
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>

      {/* Cancellation Policy */}
      <div className={styles.policy}>
        <h4>Cancellation Policy</h4>
        <p>
          Free cancellation up to 24 hours before check-in.
          Late cancellation may incur charges.
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;