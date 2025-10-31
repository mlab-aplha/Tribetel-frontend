import React, { useState } from 'react';
import styles from './BookingCard.module.css';
import BookingForm from '../BookingForm/BookingForm';
import { Room, BookingFormData, BookingRequest, BookingResponse } from '../../../types/common';
import { createBooking } from '../../../../services/bookingService';
import LoadingSpinner from '../../../common/Loader/Loader';

interface BookingCardProps {
  room: Room;
  onBookingSuccess?: (booking: BookingResponse) => void;
  onBookingError?: (error: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  room,
  onBookingSuccess,
  onBookingError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!room.available) {
      const error = 'This room is currently not available for booking';
      setBookingError(error);
      onBookingError?.(error);
      return;
    }

    setIsLoading(true);
    setBookingError(null);

    try {
      const bookingRequest: BookingRequest = {
        ...formData,
        roomId: room.id,
        totalPrice: calculateTotalPrice(formData.checkIn, formData.checkOut, room.pricePerNight),
        // In a real app, this would come from auth context
        userId: 'current-user-id' // This would come from your auth context
      };

      const bookingResponse = await createBooking(bookingRequest);

      if (bookingResponse.success) {
        onBookingSuccess?.(bookingResponse.data);
      } else {
        throw new Error(bookingResponse.message || 'Booking failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Booking failed. Please try again.';
      setBookingError(errorMessage);
      onBookingError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPrice = (checkIn: string, checkOut: string, pricePerNight: number): number => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights * pricePerNight;
  };

  if (!room.available) {
    return (
      <div className={styles.card}>
        <div className={styles.unavailable}>
          <h3>Currently Unavailable</h3>
          <p>This room is not available for booking at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.leftSplit}>
          <div className={styles.imageWrap}>
            <img
              src={room.image}
              alt={room.title}
              className={styles.image}
              loading="lazy"
            />
            {!room.available && (
              <div className={styles.unavailableBadge}>Unavailable</div>
            )}
          </div>

          <div className={styles.description}>
            <h2 className={styles.title}>{room.title}</h2>
            <p className={styles.location}>{room.location}</p>
            <p className={styles.text}>{room.description}</p>
            <div className={styles.price}>
              ${room.pricePerNight} <span>/ night</span>
            </div>
            <ul className={styles.features}>
              {room.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.capacity}>
              Max guests: {room.maxGuests}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        {isLoading && <LoadingSpinner />}
        {bookingError && (
          <div className={styles.error}>
            {bookingError}
          </div>
        )}
        <BookingForm
          room={room}
          onSubmit={handleBookingSubmit}
          isLoading={isLoading}
          isDisabled={!room.available}
        />
      </div>
    </div>
  );
};

export default BookingCard;