import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookingForm.module.css';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import BookingSummary from '../BookingSummary/BookingSummary';
import BookingConfirmationComponent from '../BookingConfirmation/BookingConfirmation';
import { BookingRequest, BookingResponse } from '../../../../components/types/common';
import { bookingService } from '../../../../services/bookingService';

interface BookingConfirmationType {
  id: string;
  roomId: string;
  bookingNumber: string;
  fullName: string;
  roomTitle: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  email: string;
  confirmedAt: string;
  specialRequests: string;
  customerPhone: string;
}

interface Room {
  id: string;
  title: string;
  type?: string;
  image: string;
  pricePerNight: number;
  maxGuests?: number;
  features?: string[];
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  region: string;
  guests: number;
  specialRequests: string;
  checkIn: string;
  checkOut: string;
  paymentMethod?: string;
}

interface DateChange {
  checkIn: string;
  checkOut: string;
}

interface BookingFormProps {
  room: Room;
  onBookingSuccess: (booking: BookingResponse) => void;
  onBookingError: (error: string) => void;
  isDisabled?: boolean;
}

const defaultForm: FormData = {
  fullName: '',
  email: '',
  phone: '',
  region: '',
  guests: 1,
  specialRequests: '',
  checkIn: '',
  checkOut: '',
};

const BookingForm: React.FC<BookingFormProps> = ({
  room,
  onBookingSuccess,
  onBookingError,
  isDisabled = false
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [submittedBooking, setSubmittedBooking] = useState<BookingConfirmationType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateNights = (checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 0;
    const msPerDay = 24 * 60 * 60 * 1000;
    const diff = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / msPerDay);
    return diff > 0 ? diff : 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value,
    }));
  };

  const handleDateChange = ({ checkIn, checkOut }: DateChange) => {
    setForm((prev) => ({ ...prev, checkIn, checkOut }));
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (!form.fullName.trim()) err.fullName = 'Full name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    if (!form.phone.trim()) err.phone = 'Phone is required';
    if (!form.checkIn || !form.checkOut)
      err.dates = 'Please choose check-in and check-out dates';
    if (form.checkIn && form.checkOut && new Date(form.checkIn) >= new Date(form.checkOut))
      err.dates = 'Check-out must be after check-in';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onBookNow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const nights = calculateNights(form.checkIn, form.checkOut);

      const bookingRequest: BookingRequest = {
        roomId: room.id,
        customerName: form.fullName,
        customerEmail: form.email,
        customerPhone: form.phone,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        nights: nights,
        totalPrice: nights * room.pricePerNight,
        specialRequests: form.specialRequests
      };

      const response = await bookingService.createBooking(bookingRequest);

      if (response.success) {
        onBookingSuccess(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Booking failed';
      onBookingError(errorMessage);
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmBooking = () => {
    const nights = calculateNights(form.checkIn, form.checkOut);

    const booking: BookingConfirmationType = {
      id: `booking-${Date.now()}`,
      roomId: room.id,
      bookingNumber: `BK-${Date.now()}`,
      fullName: form.fullName,
      roomTitle: room.title,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights: nights,
      guests: form.guests,
      total: nights * room.pricePerNight,
      status: 'confirmed',
      paymentStatus: 'pending',
      email: form.email,
      confirmedAt: new Date().toISOString(),
      specialRequests: form.specialRequests,
      customerPhone: form.phone
    };

    setSubmittedBooking(booking);
    setShowSummary(false);
    navigate('/payment', { state: { booking } });
  };

  if (submittedBooking) {
    return <BookingConfirmationComponent booking={submittedBooking} />;
  }

  const roomSummary = {
    id: room.id,
    title: room.title,
    type: room.type || 'Standard Room',
    image: room.image,
    pricePerNight: room.pricePerNight,
    maxGuests: room.maxGuests || 2,
    features: room.features || [],
  };

  return (
    <div className={styles.formWrap}>
      <h3 className={styles.heading}>Booking Information</h3>
      <form onSubmit={onBookNow} className={styles.form}>
        <label className={styles.label}>
          Full Name
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className={styles.input}
            placeholder="Your full name"
            disabled={isSubmitting || isDisabled}
          />
          {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}
        </label>

        <label className={styles.label}>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="you@example.com"
            disabled={isSubmitting || isDisabled}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </label>

        <label className={styles.label}>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder="+27 76 555 1234"
            disabled={isSubmitting || isDisabled}
          />
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}
        </label>

        <DateRangePicker
          checkIn={form.checkIn}
          checkOut={form.checkOut}
          onChange={handleDateChange}
        />
        {errors.dates && <div className={styles.error}>{errors.dates}</div>}

        <label className={styles.label}>
          Region
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            className={styles.select}
            disabled={isSubmitting || isDisabled}
          >
            <option value="">Select region</option>
            <option value="local">Local</option>
            <option value="international">International</option>
          </select>
        </label>

        <label className={styles.label}>
          Guests
          <input
            name="guests"
            type="number"
            min={1}
            max={room.maxGuests || 4}
            value={form.guests}
            onChange={handleChange}
            className={styles.input}
            disabled={isSubmitting || isDisabled}
          />
        </label>

        <label className={styles.label}>
          Special Requests
          <textarea
            name="specialRequests"
            value={form.specialRequests}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Any special request (optional)"
            disabled={isSubmitting || isDisabled}
          />
        </label>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.bookBtn}
            disabled={isSubmitting || isDisabled}
          >
            {isSubmitting ? 'Booking...' : 'Book Now'}
          </button>
          <button
            type="button"
            className={styles.summaryBtn}
            onClick={() => {
              if (!validate()) return;
              setShowSummary(!showSummary);
            }}
            disabled={isSubmitting || isDisabled}
          >
            {showSummary ? 'Hide Summary' : 'Preview Summary'}
          </button>
        </div>
      </form>

      {showSummary && (
        <BookingSummary
          form={form}
          room={roomSummary}
          nights={calculateNights(form.checkIn, form.checkOut)}
          onConfirm={confirmBooking}
        />
      )}
    </div>
  );
};

export default BookingForm;