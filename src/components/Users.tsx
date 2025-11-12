import { useEffect, useState } from 'react';
import { Plus, Eye, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { supabase, type Profile } from '../lib/supabase';
import Modal from './Modal';
import styles from './Users.module.css';
import formStyles from './Form.module.css';

export default function Users() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [filter, setFilter] = useState<'all' | 'admin' | 'manager' | 'staff' | 'guest'>('all');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone: '',
    role: 'guest' as Profile['role'],
    address: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  async function fetchUsers() {
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('role', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingUser) {
        const { error } = await supabase
          .from('profiles')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingUser.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('profiles').insert([formData]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingUser(null);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again.');
    }
  }

  async function toggleUserStatus(user: Profile) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !user.is_active, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  }

  async function deleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  function openEditModal(user: Profile) {
    setEditingUser(user);
    setFormData({
      email: user.email,
      full_name: user.full_name,
      phone: user.phone || '',
      role: user.role,
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
    });
    setIsModalOpen(true);
  }

  function openCreateModal() {
    setEditingUser(null);
    resetForm();
    setIsModalOpen(true);
  }

  function resetForm() {
    setFormData({
      email: '',
      full_name: '',
      phone: '',
      role: 'guest',
      address: '',
      city: '',
      country: '',
    });
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return styles.admin;
      case 'manager':
        return styles.manager;
      case 'staff':
        return styles.staff;
      case 'guest':
        return styles.guest;
      default:
        return '';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return <div className={styles.users}>Loading...</div>;
  }

  return (
    <div className={styles.users}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Management</h1>
        <button className={styles.addButton} onClick={openCreateModal}>
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All Users
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'admin' ? styles.active : ''}`}
          onClick={() => setFilter('admin')}
        >
          Admins
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'manager' ? styles.active : ''}`}
          onClick={() => setFilter('manager')}
        >
          Managers
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'staff' ? styles.active : ''}`}
          onClick={() => setFilter('staff')}
        >
          Staff
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'guest' ? styles.active : ''}`}
          onClick={() => setFilter('guest')}
        >
          Guests
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Location</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>{getInitials(user.full_name)}</div>
                      <div>
                        <div className={styles.userName}>{user.full_name}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>
                    <span className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.city && user.country ? `${user.city}, ${user.country}` : 'N/A'}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${user.is_active ? styles.active : styles.inactive}`}
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.iconButton}
                        onClick={() => toggleUserStatus(user)}
                        title={user.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {user.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      </button>
                      <button className={styles.iconButton} title="View">
                        <Eye size={18} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => openEditModal(user)}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => deleteUser(user.id)}
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
          setEditingUser(null);
          resetForm();
        }}
        title={editingUser ? 'Edit User' : 'Add New User'}
        footer={
          <>
            <button
              type="button"
              className={`${formStyles.button} ${formStyles.secondary}`}
              onClick={() => {
                setIsModalOpen(false);
                setEditingUser(null);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="user-form"
              className={`${formStyles.button} ${formStyles.primary}`}
            >
              {editingUser ? 'Update User' : 'Create User'}
            </button>
          </>
        }
      >
        <form id="user-form" onSubmit={handleSubmit}>
          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>
              Email <span className={formStyles.required}>*</span>
            </label>
            <input
              type="email"
              className={formStyles.input}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>
              Full Name <span className={formStyles.required}>*</span>
            </label>
            <input
              type="text"
              className={formStyles.input}
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
            />
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>Phone</label>
              <input
                type="tel"
                className={formStyles.input}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>
                Role <span className={formStyles.required}>*</span>
              </label>
              <select
                className={formStyles.select}
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as Profile['role'] })
                }
                required
              >
                <option value="guest">Guest</option>
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>Address</label>
            <input
              type="text"
              className={formStyles.input}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>City</label>
              <input
                type="text"
                className={formStyles.input}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>Country</label>
              <input
                type="text"
                className={formStyles.input}
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
