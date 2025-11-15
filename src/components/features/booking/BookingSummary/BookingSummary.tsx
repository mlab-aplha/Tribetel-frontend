import React from 'react';
import styles from './BookingSummary.module.css';
import { RoomSummary, PriceBreakdown } from '@components/types/common';

interface BookingSummaryData {
  fullName: string;
  email: string;
  phone: string;
  region: string;
  guests: number;
  specialRequests: string;
  checkIn: string;
  checkOut: string;
}

interface BookingSummaryProps {
  form: BookingSummaryData;
  room: RoomSummary;
  nights: number;
  onConfirm: () => void;
  onEdit?: () => void;
  isLoading?: boolean;
  isConfirmed?: boolean;
  policies?: {
    cancellation: string;
    checkIn: string;
    checkOut: string;
  };
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  form,
  room,
  nights,
  onConfirm,
  onEdit,
  isLoading = false,
  isConfirmed = false,
  policies
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Create proper PriceBreakdown with ALL required properties
  const priceBreakdown: PriceBreakdown = {
    roomRate: room.pricePerNight, // This was missing!
    subtotal: room.pricePerNight * nights,
    discount: 0, // Make sure this is defined
    taxes: room.pricePerNight * nights * 0.15,
    serviceFee: 50,
    total: room.pricePerNight * nights * 1.15 + 50,
    nights: nights
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h4 className={styles.h}>Booking Summary</h4>
        {onEdit && !isConfirmed && (
          <button className={styles.editBtn} onClick={onEdit} disabled={isLoading}>
            Edit
          </button>
        )}
      </div>

      {/* Room Information */}
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Room</h5>
        <div className={styles.roomInfo}>
          {room.image && (
            <img src={room.image} alt={room.title} className={styles.roomImage} />
          )}
          <div className={styles.roomDetails}>
            <span className={styles.roomTitle}>{room.title}</span>
            <span className={styles.roomType}>{room.type}</span>
            <div className={styles.guestsInfo}>
              🧑‍🤝‍🧑 Max {room.maxGuests} guests
            </div>
          </div>
        </div>
      </div>

      {/* Stay Details */}
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Stay Details</h5>
        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Check-in</span>
            <span className={styles.detailValue}>{formatDate(form.checkIn)}</span>
            {policies && <span className={styles.detailNote}>After {policies.checkIn}</span>}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Check-out</span>
            <span className={styles.detailValue}>{formatDate(form.checkOut)}</span>
            {policies && <span className={styles.detailNote}>Before {policies.checkOut}</span>}
          </div>
        </div>

        <div className={styles.row}>
          <strong>Duration</strong>
          <span>{nights} night{nights > 1 ? 's' : ''}</span>
        </div>

        <div className={styles.row}>
          <strong>Guests</strong>
          <span>{form.guests} guest{form.guests > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Special Requests */}
      {form.specialRequests && (
        <div className={styles.section}>
          <h5 className={styles.sectionTitle}>Special Requests</h5>
          <p className={styles.specialRequests}>{form.specialRequests}</p>
        </div>
      )}

      {/* Price Breakdown */}
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Price Details</h5>
        <div className={styles.priceDetails}>
          <div className={styles.priceRow}>
            <span>R {priceBreakdown.roomRate} × {nights} nights</span>
            <span>R {priceBreakdown.subtotal}</span>
          </div>

          {priceBreakdown.discount && priceBreakdown.discount > 0 && (
            <div className={`${styles.priceRow} ${styles.discount}`}>
              <span>Discount</span>
              <span>-R {priceBreakdown.discount}</span>
            </div>
          )}

          <div className={styles.priceRow}>
            <span>Taxes & Fees</span>
            <span>R {priceBreakdown.taxes}</span>
          </div>

          <div className={styles.priceRow}>
            <span>Service Fee</span>
            <span>R {priceBreakdown.serviceFee}</span>
          </div>

          <div className={styles.totalRow}>
            <strong>Total Amount</strong>
            <strong>R {priceBreakdown.total}</strong>
          </div>
        </div>
      </div>

      {/* Confirmation Section */}
      <div className={styles.confirmSection}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <span>Processing your booking...</span>
          </div>
        ) : isConfirmed ? (
          <div className={styles.confirmedState}>
            <span className={styles.successIcon}>✓</span>
            <span>Booking Confirmed!</span>
          </div>
        ) : (
          <div className={styles.confirmWrap}>
            <button
              className={styles.confirmBtn}
              onClick={onConfirm}
              disabled={isLoading}
            >
              Confirm Booking - R {priceBreakdown.total}
            </button>
            <p className={styles.securityNote}>
              Secure & encrypted payment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;


