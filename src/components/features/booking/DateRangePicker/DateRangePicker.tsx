import React, { useState, useEffect, useCallback } from 'react';
import styles from './DateRangePicker.module.css';
import { DateRange, DateValidation } from '../../../types/common';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (dates: DateRange) => void;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[];
  minNights?: number;
  maxNights?: number;
  isLoading?: boolean;
  required?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  checkIn,
  checkOut,
  onChange,
  onValidationChange,
  minDate,
  maxDate,
  disabledDates = [],
  minNights = 1,
  maxNights = 30,
  isLoading = false,
  required = true
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState({ checkIn: false, checkOut: false });

  // Calculate minimum check-out date based on check-in and minNights
  const getMinCheckOutDate = useCallback(() => {
    if (!checkIn) return minDate || new Date().toISOString().split('T')[0];

    const checkInDate = new Date(checkIn);
    const minCheckOut = new Date(checkInDate);
    minCheckOut.setDate(checkInDate.getDate() + minNights);

    return minCheckOut.toISOString().split('T')[0];
  }, [checkIn, minNights, minDate]);

  // Validate dates
  const validateDates = useCallback((): DateValidation => {
    const validationErrors: string[] = [];
    let nights = 0;

    if (required && (!checkIn || !checkOut)) {
      return { isValid: false, errors: ['Both dates are required'], nights: 0 };
    }

    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // Check if check-out is after check-in
      if (end <= start) {
        validationErrors.push('Check-out date must be after check-in date');
      }

      // Check minimum nights
      if (nights < minNights) {
        validationErrors.push(`Minimum stay is ${minNights} night${minNights > 1 ? 's' : ''}`);
      }

      // Check maximum nights
      if (nights > maxNights) {
        validationErrors.push(`Maximum stay is ${maxNights} night${maxNights > 1 ? 's' : ''}`);
      }

      // Check disabled dates
      const isCheckInDisabled = disabledDates.includes(checkIn);
      const isCheckOutDisabled = disabledDates.includes(checkOut);

      if (isCheckInDisabled) {
        validationErrors.push('Check-in date is not available');
      }
      if (isCheckOutDisabled) {
        validationErrors.push('Check-out date is not available');
      }

      // Check if any date in range is disabled
      if (!isCheckInDisabled && !isCheckOutDisabled) {
        const current = new Date(start);
        while (current < end) {
          const dateString = current.toISOString().split('T')[0];
          if (disabledDates.includes(dateString)) {
            validationErrors.push('Selected dates include unavailable dates');
            break;
          }
          current.setDate(current.getDate() + 1);
        }
      }
    }

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
      nights
    };
  }, [checkIn, checkOut, minNights, maxNights, disabledDates, required]);

  // Handle date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched(prev => ({ ...prev, [name]: true }));

    if (name === 'checkIn') {
      onChange({ checkIn: value, checkOut });
    } else {
      onChange({ checkIn, checkOut: value });
    }
  };

  // Handle focus events for better UX
  const handleFocus = (field: 'checkIn' | 'checkOut') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Effect for validation
  useEffect(() => {
    const validation = validateDates();
    setErrors(validation.errors);
    onValidationChange?.(validation.isValid, validation.errors);
  }, [checkIn, checkOut, validateDates, onValidationChange]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const minCheckOutDate = getMinCheckOutDate();

  // Calculate nights for display
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <label className={styles.label}>
          Check-in Date
          {required && <span className={styles.required}>*</span>}
          <input
            className={`${styles.input} ${touched.checkIn && errors.length > 0 ? styles.error : ''} ${isLoading ? styles.loading : ''}`}
            name="checkIn"
            type="date"
            value={checkIn}
            onChange={handleDateChange}
            onFocus={() => handleFocus('checkIn')}
            min={minDate || today}
            max={maxDate}
            disabled={isLoading}
            required={required}
          />
          {touched.checkIn && errors.some(error => error.includes('check-in')) && (
            <span className={styles.errorText}>
              {errors.find(error => error.includes('check-in'))}
            </span>
          )}
        </label>

        <label className={styles.label}>
          Check-out Date
          {required && <span className={styles.required}>*</span>}
          <input
            className={`${styles.input} ${touched.checkOut && errors.length > 0 ? styles.error : ''} ${isLoading ? styles.loading : ''}`}
            name="checkOut"
            type="date"
            value={checkOut}
            onChange={handleDateChange}
            onFocus={() => handleFocus('checkOut')}
            min={minCheckOutDate}
            max={maxDate}
            disabled={isLoading || !checkIn}
            required={required}
          />
          {touched.checkOut && errors.some(error => error.includes('check-out')) && (
            <span className={styles.errorText}>
              {errors.find(error => error.includes('check-out'))}
            </span>
          )}
        </label>
      </div>

      {/* Nights display */}
      {checkIn && checkOut && nights > 0 && (
        <div className={styles.nightsInfo}>
          <span className={styles.nightsText}>
            {nights} night{nights > 1 ? 's' : ''} selected
          </span>
        </div>
      )}

      {/* General validation errors */}
      {errors.length > 0 && touched.checkIn && touched.checkOut && (
        <div className={styles.validationErrors}>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorItem}>
              {error}
            </div>
          ))}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <span>Checking availability...</span>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;