import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@components/crm/layout/Sidebar';
import Header from '@components/crm/layout/Header';
import Dashboard from '@components/crm/dashboard/Dashboard';
import Reservations from '@components/crm/reservations/Reservations';
import Rooms from '@components/crm/rooms/Rooms';
import Users from '@components/crm/users/Users';
import { useAuth } from '@hooks/useAuth';
import Loader from '@components/common/Loader/Loader';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    // Strict admin authentication check
    React.useEffect(() => {
        const isAdminAuthenticated = localStorage.getItem('adminAuthenticated');
        const isUserAdmin = user?.role === 'admin' || user?.role === 'manager' || user?.role === 'staff';

        // Redirect if:
        // 1. User is not an admin AND not authenticated as admin
        if (!isAdminAuthenticated && !isUserAdmin) {
            navigate('/admin/signin');
        }
    }, [navigate, user]);

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'reservations':
                return <Reservations />;
            case 'rooms':
                return <Rooms />;
            case 'users':
                return <Users />;
            case 'messages':
            case 'calendar':
            case 'financials':
            case 'reviews':
            case 'settings':
                return (
                    <div className={styles.placeholder}>
                        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section coming soon...
                    </div>
                );
            default:
                return <Dashboard />;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminUser');
        navigate('/admin/signin');
    };

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }

    // Get appropriate role display name
    const getRoleDisplayName = (role: string | undefined) => {
        switch (role) {
            case 'admin': return 'Administrator';
            case 'manager': return 'Hotel Manager';
            case 'staff': return 'Staff Member';
            default: return 'Hotel Manager';
        }
    };

    return (
        <div className={styles.layout}>
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onLogout={handleLogout}
            />
            <div className={styles.main}>
                <Header
                    userName={user?.full_name || 'Admin'}
                    userRole={getRoleDisplayName(user?.role)}
                    onLogout={handleLogout}
                />
                <div className={styles.content}>{renderContent()}</div>
            </div>
        </div>
    );
};

export default AdminDashboard;