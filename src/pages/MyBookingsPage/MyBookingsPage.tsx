import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/common/Loader/Loader';
import { Navigate } from 'react-router-dom';
import BookingCard from '../../components/features/booking/BookingCard/BookingCard';
import { BookingConfirmation } from '../../components/types/booking';
import styles from './MyBookingsPage.module.css';

const MyBookingsPage: React.FC = () => {
    const { user, isLoading } = useAuth();
    const [bookings, setBookings] = useState<BookingConfirmation[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [activeFilter, setActiveFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
    const mockBookings: BookingConfirmation[] = [
        {
            id: 'booking-1',
            bookingNumber: 'BK-2024-001',
            fullName: 'John Doe',
            roomTitle: 'Luxury Suite',
            checkIn: '2024-12-15',
            checkOut: '2024-12-20',
            status: 'confirmed',
            nights: 5,
            guests: 2,
            total: 2500,
            paymentStatus: 'paid',
            email: 'john.doe@example.com',
            confirmedAt: '2024-11-01T10:30:00Z',
            specialRequests: 'Early check-in requested',
            customerPhone: '+27 76 123 4567'
        },
        {
            id: 'booking-2',
            bookingNumber: 'BK-2024-002',
            fullName: 'Sarah Smith',
            roomTitle: 'Deluxe Room',
            checkIn: '2024-12-18',
            checkOut: '2024-12-22',
            status: 'pending',
            nights: 4,
            guests: 1,
            total: 1200,
            paymentStatus: 'pending',
            email: 'sarah.smith@example.com',
            confirmedAt: '2024-11-02T14:20:00Z',
            specialRequests: 'High floor preferred',
            customerPhone: '+27 82 987 6543'
        },
        {
            id: 'booking-3',
            bookingNumber: 'BK-2024-003',
            fullName: 'Mike Johnson',
            roomTitle: 'Executive Suite',
            checkIn: '2024-11-25',
            checkOut: '2024-11-30',
            status: 'cancelled',
            nights: 5,
            guests: 3,
            total: 3000,
            paymentStatus: 'refunded',
            email: 'mike.johnson@example.com',
            confirmedAt: '2024-10-15T09:15:00Z',
            specialRequests: '',
            customerPhone: '+27 83 456 7890'
        }
    ];

    useEffect(() => {
        const fetchBookings = async () => {
            setLoadingBookings(true);
            try {
                // const response = await bookingService.getUserBookings(user.id);
                await new Promise(resolve => setTimeout(resolve, 1000));
                setBookings(mockBookings);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                setBookings([]);
            } finally {
                setLoadingBookings(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    const handleBookingAction = async (bookingId: string, action: "cancel" | "modify") => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            if (action === 'cancel') {
                setBookings(prev => prev.map(booking =>
                    booking.id === bookingId
                        ? { ...booking, status: 'cancelled' as const }
                        : booking
                ));
                alert('Booking cancelled successfully');
            } else if (action === 'modify') {
                alert('Modify booking feature coming soon');
            }
        } catch (error) {
            console.error('Failed to perform booking action:', error);
            alert('Failed to perform action. Please try again.');
        }
    };

    const filteredBookings = bookings.filter(booking =>
        activeFilter === 'all' || booking.status === activeFilter
    );

    const getStatusCounts = () => {
        const counts = {
            all: bookings.length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            pending: bookings.filter(b => b.status === 'pending').length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length,
        };
        return counts;
    };

    const statusCounts = getStatusCounts();

    if (isLoading) {
        return <Loader text="Loading..." fullscreen />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>My Bookings</h1>
                    <p className={styles.subtitle}>Manage and view your hotel reservations</p>
                </div>

                {loadingBookings ? (
                    <div className={styles.loadingContainer}>
                        <Loader text="Loading your bookings..." />
                    </div>
                ) : (
                    <>
                        <div className={styles.filterTabs}>
                            <button
                                className={`${styles.filterTab} ${activeFilter === 'all' ? styles.active : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                All Bookings <span className={styles.count}>{statusCounts.all}</span>
                            </button>
                            <button
                                className={`${styles.filterTab} ${activeFilter === 'confirmed' ? styles.active : ''}`}
                                onClick={() => setActiveFilter('confirmed')}
                            >
                                Confirmed <span className={styles.count}>{statusCounts.confirmed}</span>
                            </button>
                            <button
                                className={`${styles.filterTab} ${activeFilter === 'pending' ? styles.active : ''}`}
                                onClick={() => setActiveFilter('pending')}
                            >
                                Pending <span className={styles.count}>{statusCounts.pending}</span>
                            </button>
                            <button
                                className={`${styles.filterTab} ${activeFilter === 'cancelled' ? styles.active : ''}`}
                                onClick={() => setActiveFilter('cancelled')}
                            >
                                Cancelled <span className={styles.count}>{statusCounts.cancelled}</span>
                            </button>
                        </div>

                        {/* Bookings List */}
                        <div className={styles.bookingsList}>
                            {filteredBookings.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>📋</div>
                                    <h3>No bookings found</h3>
                                    <p>
                                        {activeFilter === 'all'
                                            ? "You haven't made any bookings yet."
                                            : `No ${activeFilter} bookings found.`
                                        }
                                    </p>
                                    {activeFilter !== 'all' && (
                                        <button
                                            className={styles.showAllBtn}
                                            onClick={() => setActiveFilter('all')}
                                        >
                                            Show all bookings
                                        </button>
                                    )}
                                </div>
                            ) : (
                                filteredBookings.map(booking => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onAction={handleBookingAction}
                                        showActions={booking.status === 'confirmed'}
                                    />
                                ))
                            )}
                        </div>

                        {/* Booking Stats */}
                        <div className={styles.statsContainer}>
                            <div className={styles.statCard}>
                                <h4>Total Bookings</h4>
                                <span className={styles.statNumber}>{statusCounts.all}</span>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Confirmed</h4>
                                <span className={styles.statNumber}>{statusCounts.confirmed}</span>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Pending</h4>
                                <span className={styles.statNumber}>{statusCounts.pending}</span>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Cancelled</h4>
                                <span className={styles.statNumber}>{statusCounts.cancelled}</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Backend Notice */}
                <div className={styles.backendNotice}>
                    <p>Backend integration commented out for frontend deployment</p>
                    <p>Real booking data will be available when backend is connected</p>
                </div>
            </div>
        </MainLayout>
    );
};

export default MyBookingsPage;