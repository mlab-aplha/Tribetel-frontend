import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './PaymentForm.module.css';
import BookingConfirmation from '../BookingConfirmation/BookingConfirmation';

interface Booking {
  roomTitle: string;
  total: number;
  fullName: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  email: string;
}

interface PaymentData {
  cardNumber: string;
  bank: string;
  expiry: string;
  cvv: string;
  method: string;
}

interface LocationState {
  booking?: Booking;
}

const PaymentForm: React.FC = () => {
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
  });

  const [paid, setPaid] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!booking) {
    return <p style={{ textAlign: 'center', padding: 40 }}>No booking details found.</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!payment.cardNumber || !payment.bank || !payment.expiry || !payment.cvv) {
      setError('Please fill all payment fields.');
      return;
    }

    // payment success
    const success = true;
    if (success) {
      setPaid(true);
    } else {
      setError('Payment failed. Please try again.');
    }
  };

  if (paid) {
    const confirmedBooking = {
      ...booking,
      paymentMethod: payment.method,
      paymentBank: payment.bank,
      confirmedAt: new Date().toISOString(),
    };
    return <BookingConfirmation booking={confirmedBooking} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Complete Your Payment</h2>

      <div className={styles.bookingDetails}>
        <p>
          <strong>Room:</strong> {booking.roomTitle}
        </p>
        <p>
          <strong>Total:</strong> R {booking.total}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Card Number
          <input
            name="cardNumber"
            type="text"
            value={payment.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Select Bank
          <select
            name="bank"
            value={payment.bank}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">-- Select Bank --</option>
            <option value="Capitec">Capitec</option>
            <option value="FNB">FNB</option>
            <option value="Standard Bank">Standard Bank</option>
            <option value="Nedbank">Nedbank</option>
            <option value="ABSA">ABSA</option>
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
              className={styles.input}
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
              className={styles.input}
            />
          </label>
        </div>

        <label className={styles.label}>
          Payment Method
          <select
            name="method"
            value={payment.method}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="Playflex">Playflex</option>
            <option value="Peach">Peach</option>
          </select>
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button type="submit" className={styles.payBtn}>
            Pay Now
          </button>
          <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
