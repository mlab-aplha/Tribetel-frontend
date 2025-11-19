import React, { useState, useEffect } from 'react';
import styles from './Reservations.module.css';

interface MockReservation {
  id: string;
  guest_name: string;
  guest_email: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<MockReservation[]>([]);

  useEffect(() => {
    setReservations([
      {
        id: '1',
        guest_name: 'John Doe',
        guest_email: 'john@example.com',
        check_in_date: '2024-01-15',
        check_out_date: '2024-01-20',
        status: 'confirmed'
      },
      {
        id: '2',
        guest_name: 'Jane Smith',
        guest_email: 'jane@example.com',
        check_in_date: '2024-01-18',
        check_out_date: '2024-01-22',
        status: 'pending'
      }
    ]);
  }, []);

  return (
    <div className={styles.reservations}>
      <h1>Reservation Management</h1>
      <div className={styles.placeholder}>
        <p>Backend integration commented out for frontend deployment</p>
      </div>

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Email</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.guest_name}</td>
                <td>{reservation.guest_email}</td>
                <td>{reservation.check_in_date}</td>
                <td>{reservation.check_out_date}</td>
                <td>{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
