import React, { useState, useEffect } from 'react';
import styles from './Rooms.module.css';

// Mock room type
interface MockRoom {
  id: string;
  name: string;
  type: string;
  price: number;
  status: string;
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<MockRoom[]>([]);

  // Mock data
  useEffect(() => {
    setRooms([
      { id: '1', name: '101', type: 'Standard', price: 100, status: 'available' },
      { id: '2', name: '102', type: 'Deluxe', price: 150, status: 'occupied' },
      { id: '3', name: '201', type: 'Suite', price: 250, status: 'available' }
    ]);
  }, []);

  return (
    <div className={styles.rooms}>
      <h1>Room Management</h1>
      <div className={styles.placeholder}>
        <p>Backend integration commented out for frontend deployment</p>
      </div>
      
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>${room.price}</td>
                <td>{room.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;
