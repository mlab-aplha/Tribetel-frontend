import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookingForm.module.css';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import BookingSummary from '../BookingSummary/BookingSummary';
import BookingConfirmation from '../BookingConfirmation/BookingConfirmation';

interface Room {
  id: string | number;
  title: string;
  image: string;
  pricePerNight: number;
  
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
}

interface DateChange {
  checkIn: string;
  checkOut: string;
}

interface BookingFormProps {
  room: Room;
}

interface Booking extends FormData {
  roomId: string | number;
  roomTitle: string;
  pricePerNight: number;
  nights: number;
  total: number;
  confirmedAt: string;
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

const BookingForm: React.FC<BookingFormProps> = ({ room }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const calcNights = (inDate: string, outDate: string): number => {
    if (!inDate || !outDate) return 0;
    const msPerDay = 24 * 60 * 60 * 1000;
    const diff = Math.round((new Date(outDate).getTime() - new Date(inDate).getTime()) / msPerDay);
    return diff > 0 ? diff : 0;
  };

  const onBookNow = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setShowSummary(true);
  };

  const confirmBooking = () => {
    const nights = calcNights(form.checkIn, form.checkOut);
    const booking: Booking = {
      ...form,
      roomId: room.id,
      roomTitle: room.title,
      pricePerNight: room.pricePerNight,
      nights,
      total: nights * room.pricePerNight,
      confirmedAt: new Date().toISOString(),
    };
    setSubmittedBooking(booking);
    setShowSummary(false);
    navigate('/payment', { state: { booking } });
  };

  if (submittedBooking) {
    return <BookingConfirmation booking={submittedBooking} />;
  }

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
            value={form.guests}
            onChange={handleChange}
            className={styles.input}
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
          />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.bookBtn}>
            Book Now
          </button>
          <button
            type="button"
            className={styles.summaryBtn}
            onClick={() => {
              if (!validate()) return;
              setShowSummary(!showSummary);
            }}
          >
            {showSummary ? 'Hide Summary' : 'Preview Summary'}
          </button>
        </div>
      </form>

      {showSummary && (
        <BookingSummary
          form={form}
          room={room}
          nights={calcNights(form.checkIn, form.checkOut)}
          onConfirm={confirmBooking}
        />
      )}
    </div>
  );
};

export default BookingForm;
