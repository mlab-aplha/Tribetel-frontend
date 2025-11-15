import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Payment.module.css';
import BookingConfirmation from '../BookingConfirmation/BookingConfirmation';
import { PaymentData, PaymentRequest, PaymentResponse } from '@types/common';
import { processPayment } from '../../../../services/paymentService';
import LoadingSpinner from '@components/common/Loader/Loader';

interface Booking {
  id: string;
  roomTitle: string;
  nights: number;
  total: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
}

interface LocationState {
  booking?: Booking;
}

interface PaymentFormProps {
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onPaymentSuccess,
  onPaymentError
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const booking = state?.booking;

  const [payment, setPayment] = useState<PaymentData>({
    cardNumber: '',
    bank: '',
    expiry: '',
    cvv: '',
    method: 'Playflex',
    cardHolderName: '',
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  if (!booking) {
    return (
      <div className={styles.errorContainer}>
        <h2>Booking Not Found</h2>
        <p>No booking details found. Please start your booking again.</p>
        <button
          className={styles.backBtn}
          onClick={() => navigate('/booking')}
        >
          Start New Booking
        </button>
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      setPayment((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setPayment((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateForm = (): boolean => {
    if (!payment.cardHolderName.trim()) {
      setError('Card holder name is required');
      return false;
    }
    if (!payment.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      setError('Valid card number is required');
      return false;
    }
    if (!payment.bank) {
      setError('Please select your bank');
      return false;
    }
    if (!payment.expiry) {
      setError('Expiry date is required');
      return false;
    }
    if (!payment.cvv.match(/^\d{3,4}$/)) {
      setError('Valid CVV is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment request for backend
      const paymentRequest: PaymentRequest = {
        bookingId: booking.id || 'temp-booking-id',
        amount: booking.total,
        currency: 'ZAR',
        paymentMethod: payment.method,
        paymentDetails: {
          cardNumber: payment.cardNumber.replace(/\s/g, ''),
          bank: payment.bank,
          expiry: payment.expiry,
          cvv: payment.cvv,
          cardHolderName: payment.cardHolderName,
        },
        metadata: {
          roomTitle: booking.roomTitle,
          nights: booking.nights,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
        }
      };

      // Process payment through backend API
      const response = await processPayment(paymentRequest);

      if (response.success && response.data.status === 'succeeded') {
        setPaymentResponse(response.data);
        setPaid(true);
        onPaymentSuccess?.();
      } else {
        throw new Error(response.message || 'Payment processing failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setError(errorMessage);
      onPaymentError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paid && paymentResponse) {
    const confirmedBooking = {
      id: booking.id,
      roomId: 'temp-room-id',
      bookingNumber: `BK-${Date.now()}`,
      fullName: booking.fullName,
      roomTitle: booking.roomTitle,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: booking.nights,
      guests: booking.guests,
      total: booking.total,
      status: 'confirmed' as const,
      paymentStatus: 'paid' as const,
      email: booking.email,
      confirmedAt: new Date().toISOString(),
      specialRequests: '',
      customerPhone: 'Not provided'
    };
    return <BookingConfirmation booking={confirmedBooking} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Complete Your Payment</h2>

      <div className={styles.bookingDetails}>
        <div className={styles.bookingItem}>
          <strong>Room:</strong> {booking.roomTitle}
        </div>
        <div className={styles.bookingItem}>
          <strong>Duration:</strong> {booking.nights} night{booking.nights > 1 ? 's' : ''}
        </div>
        <div className={styles.bookingItem}>
          <strong>Dates:</strong> {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
        </div>
        <div className={styles.bookingItem}>
          <strong>Guests:</strong> {booking.guests}
        </div>
        <div className={styles.bookingTotal}>
          <strong>Total Amount:</strong> R {booking.total.toFixed(2)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Card Holder Name */}
        <label className={styles.label}>
          Card Holder Name
          <input
            name="cardHolderName"
            type="text"
            value={payment.cardHolderName}
            onChange={handleChange}
            onBlur={() => handleBlur('cardHolderName')}
            placeholder="Mbuso"
            className={`${styles.input} ${touched.cardHolderName && !payment.cardHolderName ? styles.error : ''}`}
            disabled={isProcessing}
          />
        </label>

        {/* Card Number */}
        <label className={styles.label}>
          Card Number
          <input
            name="cardNumber"
            type="text"
            value={payment.cardNumber}
            onChange={handleChange}
            onBlur={() => handleBlur('cardNumber')}
            placeholder="1234 5678 9012 3456"
            className={`${styles.input} ${touched.cardNumber && !payment.cardNumber ? styles.error : ''}`}
            maxLength={19}
            disabled={isProcessing}
          />
        </label>

        {/* Bank Selection */}
        <label className={styles.label}>
          Select Bank
          <select
            name="bank"
            value={payment.bank}
            onChange={handleChange}
            onBlur={() => handleBlur('bank')}
            className={`${styles.select} ${touched.bank && !payment.bank ? styles.error : ''}`}
            disabled={isProcessing}
          >
            <option value="">-- Select Bank --</option>
            <option value="Capitec">Capitec</option>
            <option value="FNB">FNB</option>
            <option value="Standard Bank">Standard Bank</option>
            <option value="Nedbank">Nedbank</option>
            <option value="ABSA">ABSA</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <div className={styles.row}>
          <label className={styles.label}>
            Expiry Date
            <input
              name="expiry"
              type="month"
              value={payment.expiry}
              onChange={handleChange}
              onBlur={() => handleBlur('expiry')}
              className={`${styles.input} ${touched.expiry && !payment.expiry ? styles.error : ''}`}
              disabled={isProcessing}
            />
          </label>

          <label className={styles.label}>
            CVV
            <input
              name="cvv"
              type="password"
              maxLength={4}
              value={payment.cvv}
              onChange={handleChange}
              onBlur={() => handleBlur('cvv')}
              placeholder="123"
              className={`${styles.input} ${touched.cvv && !payment.cvv ? styles.error : ''}`}
              disabled={isProcessing}
            />
          </label>
        </div>

        {/* Payment Method */}
        <label className={styles.label}>
          Payment Method
          <select
            name="method"
            value={payment.method}
            onChange={handleChange}
            className={styles.select}
            disabled={isProcessing}
          >
            <option value="Playflex">Playflex</option>
            <option value="Peach">Peach</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </label>

        {/* Security Notice */}
        <div className={styles.securityNotice}>
          <div className={styles.securityText}>
            Your payment information is secure and encrypted. We do not store your card details.
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {isProcessing && (
          <div className={styles.loadingState}>
            <LoadingSpinner />
            <span>Processing your payment...</span>
            <p className={styles.processingNote}>
              Please don't close this window. This may take a few seconds.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.payBtn}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay R ${booking.total.toFixed(2)}`}
          </button>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            disabled={isProcessing}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

