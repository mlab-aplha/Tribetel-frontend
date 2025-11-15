import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { supabase, type Reservation } from '../../../lib/supabase';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stats, setStats] = useState({
    newBookings: 0,
    checkIns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .select('*, accommodations(name)')
        .order('created_at', { ascending: false })
        .limit(10);

      if (reservationsError) throw reservationsError;

      setReservations(reservationsData || []);

      const today = new Date().toISOString().split('T')[0];
      const newBookingsCount = reservationsData?.filter(r => r.created_at.split('T')[0] === today).length || 0;
      const checkInsCount = reservationsData?.filter(r => r.check_in_date === today).length || 0;

      setStats({
        newBookings: newBookingsCount,
        checkIns: checkInsCount,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return styles.confirmed;
      case 'pending':
        return styles.pending;
      case 'cancelled':
        return styles.cancelled;
      default:
        return '';
    }
  };

  if (loading) {
    return <div className={styles.dashboard}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.searchBar}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search documents"
          className={styles.searchInput}
        />
        <SlidersHorizontal className={styles.filterIcon} size={20} />
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.primary}`}>
          <div className={styles.statLabel}>New bookings</div>
          <div className={styles.statValue}>{stats.newBookings}</div>
        </div>
        <div className={`${styles.statCard} ${styles.secondary}`}>
          <div className={styles.statLabel}>Check-in</div>
          <div className={styles.statValue}>{stats.checkIns}</div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Recent Reservations</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Hotel</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Rooms</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.emptyState}>
                  No reservations found
                </td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.guest_name}</td>
                  <td>{reservation.accommodations?.name || 'N/A'}</td>
                  <td>{formatDate(reservation.check_in_date)}</td>
                  <td>{formatDate(reservation.check_out_date)}</td>
                  <td>{reservation.num_rooms}</td>
                  <td>{reservation.num_guests}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconButton}>
                        <Eye size={18} />
                      </button>
                      <button className={styles.iconButton}>
                        <Edit size={18} />
                      </button>
                      <button className={styles.iconButton}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
