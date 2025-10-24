import React, { type ChangeEvent } from 'react';
import styles from './DateRangePicker.module.css';

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onChange: (dates: { checkIn: string; checkOut: string }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ checkIn, checkOut, onChange }) => {
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'checkIn') {
      onChange({ checkIn: value, checkOut });
    } else {
      onChange({ checkIn, checkOut: value });
    }
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>
        Check-in
        <input
          className={styles.input}
          name="checkIn"
          type="date"
          value={checkIn}
          onChange={handle}
        />
      </label>
      <label className={styles.label}>
        Check-out
        <input
          className={styles.input}
          name="checkOut"
          type="date"
          value={checkOut}
          onChange={handle}
        />
      </label>
    </div>
  );
};

export default DateRangePicker;
