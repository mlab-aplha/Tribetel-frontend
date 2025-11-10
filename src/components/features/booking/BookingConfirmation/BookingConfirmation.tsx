import React from 'react';
import styles from './BookingConfirmation.module.css';
import { BookingConfirmationData } from '../../../../components/types/common';

interface BookingConfirmationProps {
  booking: BookingConfirmationData;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking }) => {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtitle}>Your reservation has been successfully confirmed</p>
      </div>

      <div className={styles.bookingDetails}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Booking Information</h2>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Booking Number:</span>
              <span className={styles.detailValue}>{booking.bookingNumber}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Guest Name:</span>
              <span className={styles.detailValue}>{booking.fullName}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Room:</span>
              <span className={styles.detailValue}>{booking.roomTitle}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Stay Details</h2>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Check-in:</span>
              <span className={styles.detailValue}>{new Date(booking.checkIn).toLocaleDateString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Check-out:</span>
              <span className={styles.detailValue}>{new Date(booking.checkOut).toLocaleDateString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Duration:</span>
              <span className={styles.detailValue}>
                {booking.nights} night{booking.nights > 1 ? 's' : ''}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Guests:</span>
              <span className={styles.detailValue}>
                {booking.guests} guest{booking.guests > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Payment Status</h2>
          <div className={styles.paymentStatusContainer}>
            <span className={`${styles.paymentStatus} ${styles[booking.paymentStatus]}`}>
              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Price Summary</h2>
          <div className={styles.priceBreakdown}>
            <div className={styles.priceRow}>
              <span>Room rate ({booking.nights} nights):</span>
              <span>R {(booking.total / booking.nights).toFixed(2)}/night</span>
            </div>
            <div className={styles.priceRow}>
              <span>Total:</span>
              <strong>R {booking.total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {booking.specialRequests && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Special Requests</h2>
            <p>{booking.specialRequests}</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.confirmationInfo}>
          Confirmation sent to <strong>{booking.email}</strong> on{' '}
          {formatDateTime(booking.confirmedAt)}.
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;