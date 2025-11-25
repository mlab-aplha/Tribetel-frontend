export interface Customer {
    id: string;
    email: string;
    name: string;
    phone?: string;
    createdAt: string;
    lastLogin?: string;
    totalBookings: number;
    totalSpent: number;
    status: 'active' | 'inactive';
}

export interface BookingAnalytics {
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    revenue: number;
    averageBookingValue: number;
    occupancyRate: number;
}

export interface DashboardStats {
    totalCustomers: number;
    totalBookings: number;
    totalRevenue: number;
    activeUsers: number;
    monthlyGrowth: number;
    analytics: BookingAnalytics;
}

export interface RevenueReport {
    period: string;
    totalRevenue: number;
    bookingCount: number;
    averageRevenue: number;
    dailyBreakdown: DailyRevenue[];
}

export interface DailyRevenue {
    date: string;
    revenue: number;
    bookings: number;
}

export interface CustomerActivity {
    customerId: string;
    activity: 'login' | 'booking' | 'payment' | 'review';
    timestamp: string;
    details: any;
}