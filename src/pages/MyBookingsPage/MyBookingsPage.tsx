import React from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader/Loader';
import { Navigate } from 'react-router-dom';

const MyBookingsPage: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <MainLayout>
            <div style={{ padding: '2rem' }}>
                <h1>My Bookings</h1>
                <p>Your booking history will appear here.</p>
                <div style={{ 
                    padding: '2rem', 
                    textAlign: 'center', 
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    marginTop: '2rem'
                }}>
                    <p>Backend integration commented out for frontend deployment</p>
                    <p>Real booking data will be available when backend is connected</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default MyBookingsPage;
