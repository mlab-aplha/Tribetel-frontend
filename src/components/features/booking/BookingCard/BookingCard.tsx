import React from 'react';
import styles from './BookingCard.module.css';

interface BookingConfirmation {
  id: string;
  bookingNumber: string;
  fullName: string;
  roomTitle: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  roomId?: string;
  nights?: number;
  guests?: number;
  total?: number;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  email?: string;
  confirmedAt?: string;
  specialRequests?: string;
  customerPhone?: string;
}

interface BookingCardProps {
  booking: BookingConfirmation;
  onAction: (bookingId: string, action: "cancel" | "modify") => Promise<void>;
  showActions: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onAction,
  showActions
}) => {
  const handleCancel = async () => {
    await onAction(booking.id, 'cancel');
  };

  const handleModify = async () => {
    await onAction(booking.id, 'modify');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // Calculate nights if not provided
  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className={styles.bookingCard}>
      <div className={styles.bookingHeader}>
        <div className={styles.bookingInfo}>
          <h3 className={styles.roomTitle}>{booking.roomTitle}</h3>
          <p className={styles.bookingNumber}>Booking #: {booking.bookingNumber}</p>
        </div>
        <div
          className={styles.statusBadge}
          style={{ backgroundColor: getStatusColor(booking.status) }}
        >
          {booking.status.toUpperCase()}
        </div>
      </div>

      <div className={styles.bookingDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Guest:</span>
          <span className={styles.detailValue}>{booking.fullName}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Check-in:</span>
          <span className={styles.detailValue}>{new Date(booking.checkIn).toLocaleDateString()}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Check-out:</span>
          <span className={styles.detailValue}>{new Date(booking.checkOut).toLocaleDateString()}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Nights:</span>
          <span className={styles.detailValue}>{booking.nights || calculateNights()}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Guests:</span>
          <span className={styles.detailValue}>{booking.guests || 'Not specified'}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Total:</span>
          <span className={styles.detailValue}>{booking.total ? `R${booking.total}` : 'Not specified'}</span>
        </div>
        {booking.specialRequests && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Special Requests:</span>
            <span className={styles.detailValue}>{booking.specialRequests}</span>
          </div>
        )}
      </div>

      {showActions && booking.status === 'confirmed' && (
        <div className={styles.bookingActions}>
          <button
            onClick={handleModify}
            className={styles.modifyBtn}
            disabled={booking.status !== 'confirmed'}
          >
            Modify
          </button>
          <button
            onClick={handleCancel}
            className={styles.cancelBtn}
            disabled={booking.status !== 'confirmed'}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;