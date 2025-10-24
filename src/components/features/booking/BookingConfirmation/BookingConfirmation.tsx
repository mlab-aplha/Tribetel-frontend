import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookingConfirmation.module.css';

interface Booking {
  fullName: string;
  roomTitle: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  confirmedAt: string;
  total: number;
  email: string;
}

interface BookingConfirmationProps {
  booking: Booking;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.confirm}>
      <div className={styles.icon}>✅</div>
      <h3 className={styles.title}>Booking Confirmed</h3>
      <p className={styles.text}>
        Thank you, {booking.fullName}! Your booking for <strong>{booking.roomTitle}</strong>,{' '}
        {booking.nights} night(s) from {booking.checkIn} to {booking.checkOut} is confirmed.
      </p>

      <div className={styles.details}>
        <div>
          <strong>Booking ID:</strong>{' '}
          {booking.confirmedAt.slice(0, 19).replace(/[:T]/g, '')}
        </div>
        <div>
          <strong>Total:</strong> R {booking.total}
        </div>
      </div>

      <p className={styles.note}>
        A confirmation email will be sent to {booking.email}.
      </p>

      <button className={styles.backBtn} onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmation;
