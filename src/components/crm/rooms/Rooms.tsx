import { useEffect, useState } from 'react';
import { Plus, MapPin, Star, Edit, Trash2 } from 'lucide-react';
import { supabase, type Accommodation } from '../../../lib/supabase';
import Modal from '../layout/Modal';
import styles from './Rooms.module.css';
import formStyles from './Form.module.css';

const commonFacilities = ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Parking', 'Beach Access'];

export default function Rooms() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    star_rating: 3,
    price_per_night: 0,
    total_rooms: 0,
    available_rooms: 0,
    facilities: [] as string[],
    policies: '',
  });

  useEffect(() => {
    fetchAccommodations();
  }, []);

  async function fetchAccommodations() {
    try {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setAccommodations(data || []);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingAccommodation) {
        const { error } = await supabase
          .from('accommodations')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingAccommodation.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('accommodations').insert([formData]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingAccommodation(null);
      resetForm();
      fetchAccommodations();
    } catch (error) {
      console.error('Error saving accommodation:', error);
      alert('Failed to save accommodation. Please try again.');
    }
  }

  async function deleteAccommodation(id: string) {
    if (!confirm('Are you sure you want to delete this accommodation?')) return;

    try {
      const { error } = await supabase
        .from('accommodations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchAccommodations();
    } catch (error) {
      console.error('Error deleting accommodation:', error);
    }
  }

  function openEditModal(accommodation: Accommodation) {
    setEditingAccommodation(accommodation);
    setFormData({
      name: accommodation.name,
      description: accommodation.description || '',
      address: accommodation.address,
      star_rating: accommodation.star_rating,
      price_per_night: accommodation.price_per_night,
      total_rooms: accommodation.total_rooms,
      available_rooms: accommodation.available_rooms,
      facilities: accommodation.facilities || [],
      policies: accommodation.policies || '',
    });
    setIsModalOpen(true);
  }

  function openCreateModal() {
    setEditingAccommodation(null);
    resetForm();
    setIsModalOpen(true);
  }

  function resetForm() {
    setFormData({
      name: '',
      description: '',
      address: '',
      star_rating: 3,
      price_per_night: 0,
      total_rooms: 0,
      available_rooms: 0,
      facilities: [],
      policies: '',
    });
  }

  function toggleFacility(facility: string) {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  }

  const getAvailabilityStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage === 0) return { text: 'Fully Booked', class: styles.unavailable };
    if (percentage <= 20) return { text: `Only ${available} rooms left`, class: styles.limited };
    return { text: `${available} rooms available`, class: styles.available };
  };

  if (loading) {
    return <div className={styles.rooms}>Loading...</div>;
  }

  return (
    <div className={styles.rooms}>
      <div className={styles.header}>
        <h1 className={styles.title}>Accommodations</h1>
        <button className={styles.addButton} onClick={openCreateModal}>
          <Plus size={20} />
          Add Accommodation
        </button>
      </div>

      {accommodations.length === 0 ? (
        <div className={styles.emptyState}>No accommodations found</div>
      ) : (
        <div className={styles.grid}>
          {accommodations.map((accommodation) => {
            const availability = getAvailabilityStatus(
              accommodation.available_rooms,
              accommodation.total_rooms
            );

            return (
              <div key={accommodation.id} className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.hotelName}>{accommodation.name}</h3>
                      <div className={styles.rating}>
                        {Array.from({ length: accommodation.star_rating }).map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <div className={styles.actions}>
                      <button
                        className={styles.iconButton}
                        onClick={() => openEditModal(accommodation)}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => deleteAccommodation(accommodation.id)}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.address}>
                    <MapPin size={16} />
                    {accommodation.address}
                  </div>

                  <div className={styles.details}>
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Price per night</span>
                      <span className={`${styles.detailValue} ${styles.price}`}>
                        ${accommodation.price_per_night}
                      </span>
                    </div>
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Total rooms</span>
                      <span className={styles.detailValue}>{accommodation.total_rooms}</span>
                    </div>
                  </div>

                  {accommodation.facilities && accommodation.facilities.length > 0 && (
                    <div className={styles.facilities}>
                      {(accommodation.facilities as string[]).slice(0, 4).map((facility, index) => (
                        <span key={index} className={styles.facility}>
                          {facility}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={`${styles.availability} ${availability.class}`}>
                    {availability.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAccommodation(null);
          resetForm();
        }}
        title={editingAccommodation ? 'Edit Accommodation' : 'Add New Accommodation'}
        footer={
          <>
            <button
              type="button"
              className={`${formStyles.button} ${formStyles.secondary}`}
              onClick={() => {
                setIsModalOpen(false);
                setEditingAccommodation(null);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="accommodation-form"
              className={`${formStyles.button} ${formStyles.primary}`}
            >
              {editingAccommodation ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <form id="accommodation-form" onSubmit={handleSubmit}>
          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>
              Hotel Name <span className={formStyles.required}>*</span>
            </label>
            <input
              type="text"
              className={formStyles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Description</label>
            <textarea
              className={formStyles.textarea}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>
              Address <span className={formStyles.required}>*</span>
            </label>
            <input
              type="text"
              className={formStyles.input}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Star Rating <span className={formStyles.required}>*</span>
              </label>
              <select
                className={formStyles.select}
                value={formData.star_rating}
                onChange={(e) =>
                  setFormData({ ...formData, star_rating: parseInt(e.target.value) })
                }
                required
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Price per Night <span className={formStyles.required}>*</span>
              </label>
              <input
                type="number"
                className={formStyles.input}
                value={formData.price_per_night}
                onChange={(e) =>
                  setFormData({ ...formData, price_per_night: parseFloat(e.target.value) })
                }
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Total Rooms <span className={formStyles.required}>*</span>
              </label>
              <input
                type="number"
                className={formStyles.input}
                value={formData.total_rooms}
                onChange={(e) =>
                  setFormData({ ...formData, total_rooms: parseInt(e.target.value) })
                }
                min="0"
                required
              />
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Available Rooms <span className={formStyles.required}>*</span>
              </label>
              <input
                type="number"
                className={formStyles.input}
                value={formData.available_rooms}
                onChange={(e) =>
                  setFormData({ ...formData, available_rooms: parseInt(e.target.value) })
                }
                min="0"
                required
              />
            </div>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Facilities</label>
            <div className={formStyles.facilitiesGrid}>
              {commonFacilities.map((facility) => (
                <div key={facility} className={formStyles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id={facility}
                    className={formStyles.checkbox}
                    checked={formData.facilities.includes(facility)}
                    onChange={() => toggleFacility(facility)}
                  />
                  <label htmlFor={facility}>{facility}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Policies</label>
            <textarea
              className={formStyles.textarea}
              value={formData.policies}
              onChange={(e) => setFormData({ ...formData, policies: e.target.value })}
              placeholder="e.g., Check-in: 2 PM, Check-out: 11 AM"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
