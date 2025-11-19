import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    availableRooms: 0,
    totalRevenue: 0,
    occupancyRate: 0
  });

  useEffect(() => {
    setStats({
      totalBookings: 124,
      availableRooms: 45,
      totalRevenue: 12540,
      occupancyRate: 78
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard Overview</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Bookings</h3>
          <p className={styles.statNumber}>{stats.totalBookings}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Available Rooms</h3>
          <p className={styles.statNumber}>{stats.availableRooms}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p className={styles.statNumber}>R{stats.totalRevenue}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Occupancy Rate</h3>
          <p className={styles.statNumber}>{stats.occupancyRate}%</p>
        </div>
      </div>

      <div className={styles.placeholder}>
        <p>Backend integration commented out for frontend deployment</p>
        <p>Real data will be available when backend is connected</p>
      </div>
    </div>
  );
};

export default Dashboard;
