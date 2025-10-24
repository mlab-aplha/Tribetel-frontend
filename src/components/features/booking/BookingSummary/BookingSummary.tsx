import React from 'react';
import styles from './BookingSummary.module.css';

interface Room {
  id?: string | number;
  title: string;
  pricePerNight: number;
  
}

interface FormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  
}

interface BookingSummaryProps {
  form: FormData;
  room: Room;
  nights: number;
  onConfirm: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ form, room, nights, onConfirm }) => {
  const total = nights * room.pricePerNight;

  return (
    <div className={styles.summary}>
      <h4 className={styles.h}>Booking Summary</h4>

      <div className={styles.row}>
        <strong>Room</strong>
        <span>{room.title}</span>
      </div>

      <div className={styles.row}>
        <strong>Dates</strong>
        <span>
          {form.checkIn} → {form.checkOut} ({nights} nights)
        </span>
      </div>

      <div className={styles.row}>
        <strong>Guests</strong>
        <span>{form.guests}</span>
      </div>

      <div className={styles.row}>
        <strong>Price / night</strong>
        <span>R {room.pricePerNight}</span>
      </div>

      <div className={styles.totalRow}>
        <strong>Total</strong>
        <span>R {total}</span>
      </div>

      <div className={styles.confirmWrap}>
        <button className={styles.confirmBtn} onClick={onConfirm}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
