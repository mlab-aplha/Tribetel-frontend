import { ApiResponse } from '../components/types/booking';
import { apiClient, apiHelpers } from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

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

const mockService = {
    async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Dashboard stats fetched successfully',
            data: {
                totalCustomers: 1247,
                totalBookings: 2893,
                totalRevenue: 2456789,
                activeUsers: 892,
                monthlyGrowth: 12.5,
                analytics: {
                    totalBookings: 2893,
                    confirmedBookings: 2456,
                    pendingBookings: 237,
                    cancelledBookings: 200,
                    revenue: 2456789,
                    averageBookingValue: 850,
                    occupancyRate: 78.5
                }
            }
        };
    },

    async getCustomers(): Promise<ApiResponse<Customer[]>> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockCustomers: Customer[] = [
            {
                id: "1",
                email: "john@example.com",
                name: "John Smith",
                phone: "+27 82 123 4567",
                createdAt: "2024-01-15T00:00:00Z",
                lastLogin: "2024-12-01T10:30:00Z",
                totalBookings: 12,
                totalSpent: 15600,
                status: 'active'
            },
            {
                id: "2",
                email: "sarah@example.com",
                name: "Sarah Johnson",
                phone: "+27 83 234 5678",
                createdAt: "2024-02-20T00:00:00Z",
                lastLogin: "2024-11-28T14:20:00Z",
                totalBookings: 8,
                totalSpent: 9800,
                status: 'active'
            },
            {
                id: "3",
                email: "mike@example.com",
                name: "Mike Brown",
                phone: "+27 84 345 6789",
                createdAt: "2024-03-10T00:00:00Z",
                lastLogin: "2024-10-15T09:15:00Z",
                totalBookings: 3,
                totalSpent: 3200,
                status: 'inactive'
            }
        ];

        return {
            success: true,
            message: 'Customers fetched successfully',
            data: mockCustomers
        };
    },

    async getCustomerDetails(customerId: string): Promise<ApiResponse<Customer>> {
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockCustomer: Customer = {
            id: customerId,
            email: "john@example.com",
            name: "John Smith",
            phone: "+27 82 123 4567",
            createdAt: "2024-01-15T00:00:00Z",
            lastLogin: "2024-12-01T10:30:00Z",
            totalBookings: 12,
            totalSpent: 15600,
            status: 'active'
        };

        return {
            success: true,
            message: 'Customer details fetched successfully',
            data: mockCustomer
        };
    },

    async getBookingAnalytics(): Promise<ApiResponse<BookingAnalytics>> {
        await new Promise(resolve => setTimeout(resolve, 700));

        return {
            success: true,
            message: 'Booking analytics fetched successfully',
            data: {
                totalBookings: 2893,
                confirmedBookings: 2456,
                pendingBookings: 237,
                cancelledBookings: 200,
                revenue: 2456789,
                averageBookingValue: 850,
                occupancyRate: 78.5
            }
        };
    }
};

const apiService = {
    async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
        try {
            const response = await apiClient.get<ApiResponse<DashboardStats>>('/crm/dashboard');
            return apiHelpers.getData(response);
        } catch (error) {
            console.error('API get dashboard stats error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async getCustomers(): Promise<ApiResponse<Customer[]>> {
        try {
            const response = await apiClient.get<ApiResponse<Customer[]>>('/crm/customers');
            return apiHelpers.getData(response);
        } catch (error) {
            console.error('API get customers error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async getCustomerDetails(customerId: string): Promise<ApiResponse<Customer>> {
        try {
            const response = await apiClient.get<ApiResponse<Customer>>(`/crm/customers/${customerId}`);
            return apiHelpers.getData(response);
        } catch (error) {
            console.error('API get customer details error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async getBookingAnalytics(): Promise<ApiResponse<BookingAnalytics>> {
        try {
            const response = await apiClient.get<ApiResponse<BookingAnalytics>>('/crm/analytics/bookings');
            return apiHelpers.getData(response);
        } catch (error) {
            console.error('API get booking analytics error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async updateCustomerStatus(customerId: string, status: 'active' | 'inactive'): Promise<ApiResponse<Customer>> {
        try {
            const response = await apiClient.put<ApiResponse<Customer>>(`/crm/customers/${customerId}/status`, {
                status
            });
            return apiHelpers.getData(response);
        } catch (error) {
            console.error('API update customer status error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async getRevenueReport(startDate: string, endDate: string): Promise<ApiResponse<any>> {
        try {
            const response = await apiClient.get<ApiResponse<any>>(
                `/crm/reports/revenue?startDate=${startDate}&endDate=${endDate}`
            );
            return apiHelpers.getData(response);
        } catch (error) {
            console.error('API get revenue report error:', error);
            throw apiHelpers.handleError(error);
        }
    }
};

export const crmService = {
    async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getDashboardStats();
            }
            return await apiService.getDashboardStats();
        } catch (error) {
            console.error('Error in getDashboardStats:', error);
            return await mockService.getDashboardStats();
        }
    },

    async getCustomers(): Promise<ApiResponse<Customer[]>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getCustomers();
            }
            return await apiService.getCustomers();
        } catch (error) {
            console.error('Error in getCustomers:', error);
            return await mockService.getCustomers();
        }
    },

    async getCustomerDetails(customerId: string): Promise<ApiResponse<Customer>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getCustomerDetails(customerId);
            }
            return await apiService.getCustomerDetails(customerId);
        } catch (error) {
            console.error('Error in getCustomerDetails:', error);
            return await mockService.getCustomerDetails(customerId);
        }
    },

    async getBookingAnalytics(): Promise<ApiResponse<BookingAnalytics>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getBookingAnalytics();
            }
            return await apiService.getBookingAnalytics();
        } catch (error) {
            console.error('Error in getBookingAnalytics:', error);
            return await mockService.getBookingAnalytics();
        }
    },

    async updateCustomerStatus(customerId: string, status: 'active' | 'inactive'): Promise<ApiResponse<Customer>> {
        try {
            if (USE_MOCK_DATA) {
                await new Promise(resolve => setTimeout(resolve, 300));
                const customer = await mockService.getCustomerDetails(customerId);
                customer.data.status = status;
                return customer;
            }
            return await apiService.updateCustomerStatus(customerId, status);
        } catch (error) {
            console.error('Error in updateCustomerStatus:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async getRevenueReport(startDate: string, endDate: string): Promise<ApiResponse<any>> {
        try {
            if (USE_MOCK_DATA) {
                await new Promise(resolve => setTimeout(resolve, 500));
                return {
                    success: true,
                    message: 'Revenue report generated',
                    data: {
                        period: `${startDate} to ${endDate}`,
                        totalRevenue: 456000,
                        bookingCount: 542,
                        averageRevenue: 841,
                        dailyBreakdown: []
                    }
                };
            }
            return await apiService.getRevenueReport(startDate, endDate);
        } catch (error) {
            console.error('Error in getRevenueReport:', error);
            throw apiHelpers.handleError(error);
        }
    }
};

export const getDashboardStats = crmService.getDashboardStats;
export const getCustomers = crmService.getCustomers;
export const getCustomerDetails = crmService.getCustomerDetails;
export const getBookingAnalytics = crmService.getBookingAnalytics;
export const updateCustomerStatus = crmService.updateCustomerStatus;
export const getRevenueReport = crmService.getRevenueReport;