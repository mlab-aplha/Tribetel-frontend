import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookingForm.module.css';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import BookingSummary from '../BookingSummary/BookingSummary';
import BookingConfirmationComponent from '../BookingConfirmation/BookingConfirmation';
import {
  BookingRequest,
  BookingResponse,
  BookingFormData as FormData,
  DateRange,
  BookingFormProps,
  BookingConfirmationData,
  FormErrors
} from '../../../types/booking';

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

const mockBookingService = {
  createBooking: async (bookingRequest: BookingRequest, roomTitle: string): Promise<{ success: boolean; data: BookingResponse; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const now = new Date().toISOString();

    return {
      success: true,
      data: {
        id: `booking-${Date.now()}`,
        roomId: bookingRequest.roomId,
        roomTitle: roomTitle,
        checkIn: bookingRequest.checkIn,
        checkOut: bookingRequest.checkOut,
        nights: bookingRequest.nights,
        guests: bookingRequest.guests,
        totalAmount: bookingRequest.totalPrice,
        status: 'confirmed',
        paymentStatus: 'pending',
        customerName: bookingRequest.customerName,
        customerEmail: bookingRequest.customerEmail,
        customerPhone: bookingRequest.customerPhone || '',
        specialRequests: bookingRequest.specialRequests || '',
        bookingNumber: `BK-${Date.now()}`,
        confirmedAt: now,
        createdAt: now,
        updatedAt: now
      },
      message: 'Booking created successfully'
    };
  }
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
  const [submittedBooking, setSubmittedBooking] = useState<BookingConfirmationData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const calculateNights = (checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 0;
    const msPerDay = 24 * 60 * 60 * 1000;
    const diff = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / msPerDay);
    return diff > 0 ? diff : 0;
  };

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        break;
      case 'checkIn':
      case 'checkOut':
        if (!value) return 'This field is required';
        break;
      case 'guests':
        if (!value || value < 1) return 'At least 1 guest is required';
        if (value > (room.maxGuests || 4)) return `Maximum ${room.maxGuests || 4} guests allowed`;
        break;
    }
    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'guests' ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleDateChange = ({ checkIn, checkOut }: DateRange) => {
    setForm((prev) => ({ ...prev, checkIn, checkOut }));

    if (checkIn && checkOut) {
      const dateErrors: string[] = [];
      if (new Date(checkIn) >= new Date(checkOut)) {
        dateErrors.push('Check-out must be after check-in');
      }

      const nights = calculateNights(checkIn, checkOut);
      if (nights < 1) {
        dateErrors.push('Minimum stay is 1 night');
      }

      setErrors(prev => ({
        ...prev,
        dates: dateErrors.join(', ')
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate all fields
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    // Validate dates
    if (!form.checkIn || !form.checkOut) {
      newErrors.dates = 'Please select both check-in and check-out dates';
    } else if (new Date(form.checkIn) >= new Date(form.checkOut)) {
      newErrors.dates = 'Check-out must be after check-in';
    }

    setErrors(newErrors);
    setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    return Object.keys(newErrors).length === 0;
  };

  const onBookNow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

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

      const response = await mockBookingService.createBooking(bookingRequest, room.title);

      if (response.success) {
        onBookingSuccess(response.data);
        navigate('/payment', {
          state: {
            booking: {
              id: response.data.id,
              roomTitle: room.title,
              nights: nights,
              total: nights * room.pricePerNight,
              checkIn: form.checkIn,
              checkOut: form.checkOut,
              guests: form.guests,
              fullName: form.fullName,
              email: form.email
            }
          }
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Booking failed. Please try again.';
      onBookingError(errorMessage);
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmBooking = () => {
    const nights = calculateNights(form.checkIn, form.checkOut);

    const booking: BookingConfirmationData = {
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

  const isFormValid = Object.keys(errors).length === 0 &&
    form.fullName &&
    form.email &&
    form.phone &&
    form.checkIn &&
    form.checkOut;

  return (
    <div className={styles.formWrap}>
      <h3 className={styles.heading}>Booking Information</h3>
      <form onSubmit={onBookNow} className={styles.form} noValidate>
        <label className={styles.label}>
          Full Name *
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.fullName ? styles.error : ''}`}
            placeholder="Your full name"
            disabled={isSubmitting || isDisabled}
            required
          />
          {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}
        </label>

        <label className={styles.label}>
          Email *
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            placeholder="you@example.com"
            disabled={isSubmitting || isDisabled}
            required
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </label>

        <label className={styles.label}>
          Phone *
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.phone ? styles.error : ''}`}
            placeholder="+27 76 555 1234"
            disabled={isSubmitting || isDisabled}
            required
          />
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}
        </label>

        <DateRangePicker
          checkIn={form.checkIn}
          checkOut={form.checkOut}
          onChange={handleDateChange}
          onValidationChange={(_isValid, errors) => {
            setErrors(prev => ({
              ...prev,
              dates: errors.join(', ')
            }));
          }}
        />
        {errors.dates && <div className={styles.error}>{errors.dates}</div>}

        <label className={styles.label}>
          Region
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.select}
            disabled={isSubmitting || isDisabled}
          >
            <option value="">Select region</option>
            <option value="local">Local</option>
            <option value="international">International</option>
          </select>
        </label>

        <label className={styles.label}>
          Guests *
          <input
            name="guests"
            type="number"
            min={1}
            max={room.maxGuests || 4}
            value={form.guests}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${styles.input} ${errors.guests ? styles.error : ''}`}
            disabled={isSubmitting || isDisabled}
            required
          />
          {errors.guests && <div className={styles.error}>{errors.guests}</div>}
          <small className={styles.helperText}>
            Maximum {room.maxGuests || 4} guests allowed
          </small>
        </label>

        <label className={styles.label}>
          Special Requests
          <textarea
            name="specialRequests"
            value={form.specialRequests}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.textarea}
            placeholder="Any special requests or requirements (optional)"
            disabled={isSubmitting || isDisabled}
            maxLength={500}
          />
          <small className={styles.helperText}>
            {form.specialRequests.length}/500 characters
          </small>
        </label>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.bookBtn}
            disabled={isSubmitting || isDisabled || !isFormValid}
          >
            {isSubmitting ? 'Booking...' : 'Book Now'}
          </button>
          <button
            type="button"
            className={styles.summaryBtn}
            onClick={() => {
              if (validateForm()) {
                setShowSummary(!showSummary);
              }
            }}
            disabled={isSubmitting || isDisabled || !isFormValid}
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
          onEdit={() => setShowSummary(false)}
        />
      )}
    </div>
  );
};

export default BookingForm;