import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';

// Mock user type
interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<MockUser[]>([]);

  // Mock data
  useEffect(() => {
    setUsers([
      { id: '1', name: 'Admin User', email: 'admin@hotel.com', role: 'admin', status: 'active' },
      { id: '2', name: 'Manager User', email: 'manager@hotel.com', role: 'manager', status: 'active' },
      { id: '3', name: 'Staff User', email: 'staff@hotel.com', role: 'staff', status: 'inactive' }
    ]);
  }, []);

  return (
    <div className={styles.users}>
      <h1>User Management</h1>
      <div className={styles.placeholder}>
        <p>Backend integration commented out for frontend deployment</p>
      </div>
      
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
