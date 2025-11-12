import { useEffect, useState } from 'react';
import { Plus, Eye, Edit, Trash2, Check, X } from 'lucide-react';
import { supabase, type Reservation, type Accommodation } from '../lib/supabase';
import Modal from './Modal';
import styles from './Reservations.module.css';
import formStyles from './Form.module.css';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState({
    accommodation_id: '',
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in_date: '',
    check_out_date: '',
    num_rooms: 1,
    num_guests: 1,
    total_price: 0,
    status: 'pending' as Reservation['status'],
    payment_status: 'pending' as Reservation['payment_status'],
  });

  useEffect(() => {
    fetchReservations();
    fetchAccommodations();
  }, [filter]);

  async function fetchReservations() {
    try {
      let query = supabase
        .from('reservations')
        .select('*, accommodations(name)')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateReservationStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  }

  async function fetchAccommodations() {
    try {
      const { data, error } = await supabase
        .from('accommodations')
        .select('id, name, price_per_night')
        .order('name', { ascending: true });

      if (error) throw error;
      setAccommodations(data || []);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingReservation) {
        const { error } = await supabase
          .from('reservations')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingReservation.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('reservations').insert([formData]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingReservation(null);
      resetForm();
      fetchReservations();
    } catch (error) {
      console.error('Error saving reservation:', error);
      alert('Failed to save reservation. Please try again.');
    }
  }

  async function deleteReservation(id: string) {
    if (!confirm('Are you sure you want to delete this reservation?')) return;

    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  }

  function openEditModal(reservation: Reservation) {
    setEditingReservation(reservation);
    setFormData({
      accommodation_id: reservation.accommodation_id,
      guest_name: reservation.guest_name,
      guest_email: reservation.guest_email,
      guest_phone: reservation.guest_phone || '',
      check_in_date: reservation.check_in_date,
      check_out_date: reservation.check_out_date,
      num_rooms: reservation.num_rooms,
      num_guests: reservation.num_guests,
      total_price: reservation.total_price,
      status: reservation.status,
      payment_status: reservation.payment_status,
    });
    setIsModalOpen(true);
  }

  function openCreateModal() {
    setEditingReservation(null);
    resetForm();
    setIsModalOpen(true);
  }

  function resetForm() {
    setFormData({
      accommodation_id: '',
      guest_name: '',
      guest_email: '',
      guest_phone: '',
      check_in_date: '',
      check_out_date: '',
      num_rooms: 1,
      num_guests: 1,
      total_price: 0,
      status: 'pending',
      payment_status: 'pending',
    });
  }

  function calculateTotalPrice() {
    if (!formData.accommodation_id || !formData.check_in_date || !formData.check_out_date) return;

    const accommodation = accommodations.find((a) => a.id === formData.accommodation_id);
    if (!accommodation) return;

    const checkIn = new Date(formData.check_in_date);
    const checkOut = new Date(formData.check_out_date);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    if (nights > 0) {
      const total = nights * accommodation.price_per_night * formData.num_rooms;
      setFormData((prev) => ({ ...prev, total_price: total }));
    }
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.accommodation_id, formData.check_in_date, formData.check_out_date, formData.num_rooms]);

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

  const getPaymentClass = (status: string) => {
    switch (status) {
      case 'paid':
        return styles.paid;
      case 'pending':
        return styles.pending;
      case 'refunded':
        return styles.refunded;
      default:
        return '';
    }
  };

  if (loading) {
    return <div className={styles.reservations}>Loading...</div>;
  }

  return (
    <div className={styles.reservations}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reservations</h1>
        <button className={styles.addButton} onClick={openCreateModal}>
          <Plus size={20} />
          New Reservation
        </button>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'pending' ? styles.active : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'confirmed' ? styles.active : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'cancelled' ? styles.active : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hotel</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Rooms</th>
              <th>Guests</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={12} className={styles.emptyState}>
                  No reservations found
                </td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.guest_name}</td>
                  <td>{reservation.guest_email}</td>
                  <td>{reservation.guest_phone || 'N/A'}</td>
                  <td>{reservation.accommodations?.name || 'N/A'}</td>
                  <td>{formatDate(reservation.check_in_date)}</td>
                  <td>{formatDate(reservation.check_out_date)}</td>
                  <td>{reservation.num_rooms}</td>
                  <td>{reservation.num_guests}</td>
                  <td>${reservation.total_price}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.paymentBadge} ${getPaymentClass(reservation.payment_status)}`}>
                      {reservation.payment_status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      {reservation.status === 'pending' && (
                        <button
                          className={styles.iconButton}
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          title="Confirm"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      {reservation.status !== 'cancelled' && (
                        <button
                          className={styles.iconButton}
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>
                      )}
                      <button className={styles.iconButton} title="View">
                        <Eye size={18} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => openEditModal(reservation)}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => deleteReservation(reservation.id)}
                        title="Delete"
                      >
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingReservation(null);
          resetForm();
        }}
        title={editingReservation ? 'Edit Reservation' : 'New Reservation'}
        footer={
          <>
            <button
              type="button"
              className={`${formStyles.button} ${formStyles.secondary}`}
              onClick={() => {
                setIsModalOpen(false);
                setEditingReservation(null);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="reservation-form"
              className={`${formStyles.button} ${formStyles.primary}`}
            >
              {editingReservation ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <form id="reservation-form" onSubmit={handleSubmit}>
          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>
              Accommodation <span className={formStyles.required}>*</span>
            </label>
            <select
              className={formStyles.select}
              value={formData.accommodation_id}
              onChange={(e) => setFormData({ ...formData, accommodation_id: e.target.value })}
              required
            >
              <option value="">Select accommodation</option>
              {accommodations.map((accommodation) => (
                <option key={accommodation.id} value={accommodation.id}>
                  {accommodation.name} - ${accommodation.price_per_night}/night
                </option>
              ))}
            </select>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Guest Name <span className={formStyles.required}>*</span>
              </label>
              <input
                type="text"
                className={formStyles.input}
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                required
              />
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Guest Email <span className={formStyles.required}>*</span>
              </label>
              <input
                type="email"
                className={formStyles.input}
                value={formData.guest_email}
                onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Guest Phone</label>
            <input
              type="tel"
              className={formStyles.input}
              value={formData.guest_phone}
              onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
            />
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Check-in Date <span className={formStyles.required}>*</span>
              </label>
              <input
                type="date"
                className={formStyles.input}
                value={formData.check_in_date}
                onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
                required
              />
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Check-out Date <span className={formStyles.required}>*</span>
              </label>
              <input
                type="date"
                className={formStyles.input}
                value={formData.check_out_date}
                onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Number of Rooms <span className={formStyles.required}>*</span>
              </label>
              <input
                type="number"
                className={formStyles.input}
                value={formData.num_rooms}
                onChange={(e) =>
                  setFormData({ ...formData, num_rooms: parseInt(e.target.value) })
                }
                min="1"
                required
              />
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Number of Guests <span className={formStyles.required}>*</span>
              </label>
              <input
                type="number"
                className={formStyles.input}
                value={formData.num_guests}
                onChange={(e) =>
                  setFormData({ ...formData, num_guests: parseInt(e.target.value) })
                }
                min="1"
                required
              />
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Total Price <span className={formStyles.required}>*</span>
              </label>
              <input
                type="number"
                className={formStyles.input}
                value={formData.total_price}
                onChange={(e) =>
                  setFormData({ ...formData, total_price: parseFloat(e.target.value) })
                }
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Status <span className={formStyles.required}>*</span>
              </label>
              <select
                className={formStyles.select}
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as Reservation['status'] })
                }
                required
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>
              Payment Status <span className={formStyles.required}>*</span>
            </label>
            <select
              className={formStyles.select}
              value={formData.payment_status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment_status: e.target.value as Reservation['payment_status'],
                })
              }
              required
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
