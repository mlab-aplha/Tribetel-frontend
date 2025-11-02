import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingsPage.css';
import BookingCard from '../../components/features/booking/BookingCard/BookingCard';
import BookingFilters from '../../components/features/booking/BookingFilters/BookingFilters';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import LoadingSpinner from '../../components/common/Loader/Loader';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';
import { BookingConfirmation } from '../../components/types/common';
import { bookingService } from '../../services/bookingService';
import { useAuth } from '../../hooks/useAuth';

const BookingsPage: React.FC = () => {
    const [bookings, setBookings] = useState<BookingConfirmation[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<BookingConfirmation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
            return;
        }
        fetchBookings();
    }, [isAuthenticated, navigate]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const userEmail = user?.email || 'demo@tritel.co.za';
            const response = await bookingService.getBookingsByEmail(userEmail);

            if (response.success) {
                setBookings(response.data);
                setFilteredBookings(response.data);
            } else {
                throw new Error(response.message || 'Failed to fetch bookings');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load bookings';
            setError(errorMessage);
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filter: 'all' | 'upcoming' | 'past' | 'cancelled') => {
        setActiveFilter(filter);
        filterBookings(filter, searchTerm);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        filterBookings(activeFilter, term);
    };

    const filterBookings = (filter: string, search: string) => {
        let filtered = [...bookings];

        // Apply status filter
        if (filter !== 'all') {
            const today = new Date();
            filtered = filtered.filter(booking => {
                const checkOutDate = new Date(booking.checkOut);

                switch (filter) {
                    case 'upcoming':
                        return checkOutDate >= today && booking.status !== 'cancelled';
                    case 'past':
                        return checkOutDate < today && booking.status !== 'cancelled';
                    case 'cancelled':
                        return booking.status === 'cancelled';
                    default:
                        return true;
                }
            });
        }

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(booking =>
                booking.roomTitle.toLowerCase().includes(searchLower) ||
                booking.bookingNumber.toLowerCase().includes(searchLower) ||
                booking.fullName.toLowerCase().includes(searchLower)
            );
        }

        setFilteredBookings(filtered);
    };

    const handleBookingAction = async (bookingId: string, action: 'cancel' | 'modify') => {
        try {
            if (action === 'cancel') {
                const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
                if (!confirmCancel) return;

                const response = await bookingService.cancelBooking(bookingId);
                if (response.success) {
                    setBookings(prev => prev.map(booking =>
                        booking.id === bookingId
                            ? { ...booking, status: 'cancelled' as const }
                            : booking
                    ));
                    filterBookings(activeFilter, searchTerm);
                } else {
                    throw new Error(response.message);
                }
            } else if (action === 'modify') {
                navigate(`/booking/${bookingId}/modify`);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : `Failed to ${action} booking`;
            setError(errorMessage);
        }
    };

    const handleRetry = () => {
        fetchBookings();
    };

    const handleNewBooking = () => {
        navigate('/rooms');
    };

    if (loading) {
        return (
            <div className="bookings-loading">
                <LoadingSpinner size="large" />
                <p>Loading your bookings...</p>
            </div>
        );
    }

    if (error && bookings.length === 0) {
        return (
            <div className="bookings-error">
                <ErrorMessage
                    message={error}
                    variant="error"
                    size="large"
                />
                <div className="error-actions">
                    <button className="retry-btn" onClick={handleRetry}>
                        Try Again
                    </button>
                    <button className="primary-btn" onClick={handleNewBooking}>
                        Book a Room
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bookings-page">
            <div className="bookings-container">
                {/* Header */}
                <header className="bookings-header">
                    <div className="header-content">
                        <h1>My Bookings</h1>
                        <p>Manage your upcoming stays and view booking history</p>
                    </div>
                    <button className="new-booking-btn" onClick={handleNewBooking}>
                        + New Booking
                    </button>
                </header>

                {/* Error Banner */}
                {error && (
                    <div className="bookings-error-banner">
                        <ErrorMessage
                            message={error}
                            onDismiss={() => setError(null)}
                            dismissible
                        />
                    </div>
                )}

                {/* Bookings List */}
                <main className="bookings-main">
                    {filteredBookings.length === 0 ? (
                        <EmptyState
                            title={
                                activeFilter === 'all' && !searchTerm
                                    ? "No Bookings Yet"
                                    : "No Matching Bookings"
                            }
                            message={
                                activeFilter === 'all' && !searchTerm
                                    ? "You haven't made any bookings yet. Start planning your next stay!"
                                    : searchTerm
                                        ? `No bookings found for "${searchTerm}". Try adjusting your search.`
                                        : `No ${activeFilter} bookings found.`
                            }
                            actionLabel="Browse Rooms"
                            onAction={handleNewBooking}
                            icon="booking"
                        />
                    ) : (
                        <div className="bookings-grid">
                            {filteredBookings.map(booking => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onAction={handleBookingAction}
                                    showActions={activeFilter === 'upcoming'}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default BookingsPage;