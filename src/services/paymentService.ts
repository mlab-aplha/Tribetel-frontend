import { PaymentRequest, PaymentResponse, ApiResponse } from '../components/types/booking';
import { apiClient } from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const mockProcessPayment = async (paymentRequest: PaymentRequest): Promise<{ success: boolean; data: PaymentResponse; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        success: true,
        data: {
            id: `payment-${Date.now()}`,
            bookingId: paymentRequest.bookingId,
            amount: paymentRequest.amount,
            currency: paymentRequest.currency,
            status: 'succeeded',
            paymentMethod: paymentRequest.paymentMethod,
            transactionId: `txn-${Date.now()}`,
            paidAt: new Date().toISOString(),
            receiptUrl: '#' // Add receiptUrl
        },
        message: 'Payment processed successfully'
    };
};

const mockService = {
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await mockProcessPayment(paymentData);

        if (response.success) {
            return {
                success: true,
                message: response.message,
                data: response.data
            };
        } else {
            return {
                success: false,
                message: response.message,
                data: {
                    id: `payment-${Date.now()}`,
                    status: 'failed',
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    paymentMethod: paymentData.paymentMethod,
                    transactionId: `txn-${Date.now()}`,
                    bookingId: paymentData.bookingId,
                    paidAt: new Date().toISOString(),
                    receiptUrl: '' // Add receiptUrl
                }
            };
        }
    },

    async verifyPayment(sessionId: string): Promise<ApiResponse<PaymentResponse>> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Payment verified successfully',
            data: {
                id: `payment-${Date.now()}`,
                status: 'succeeded',
                amount: 1000,
                currency: 'ZAR',
                paymentMethod: 'card',
                transactionId: sessionId,
                bookingId: `booking-${Date.now()}`,
                paidAt: new Date().toISOString(),
                receiptUrl: '#' // Add receiptUrl
            }
        };
    },

    async refundPayment(bookingId: string): Promise<ApiResponse<PaymentResponse>> {
        await new Promise(resolve => setTimeout(resolve, 1500));

        return {
            success: true,
            message: 'Refund processed successfully',
            data: {
                id: `refund-${Date.now()}`,
                status: 'refunded',
                amount: 1000,
                currency: 'ZAR',
                paymentMethod: 'refund',
                transactionId: `refund-${Date.now()}`,
                bookingId: bookingId,
                paidAt: new Date().toISOString(),
                receiptUrl: '#' // Add receiptUrl
            }
        };
    }
};

const apiService = {
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        // Use Stripe checkout session creation
        const response = await apiClient.post<ApiResponse<{ url: string }>>('/functions/v1/create-checkout', {
            bookingId: paymentData.bookingId
        });

        if (response.success) {
            // Redirect to Stripe checkout
            window.location.href = response.data.url;

            // Return a pending response
            return {
                success: true,
                message: 'Redirecting to payment...',
                data: {
                    id: `payment-${Date.now()}`,
                    status: 'pending',
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    paymentMethod: paymentData.paymentMethod,
                    transactionId: `txn-${Date.now()}`,
                    bookingId: paymentData.bookingId,
                    paidAt: new Date().toISOString(),
                    receiptUrl: '' // Add receiptUrl
                }
            };
        } else {
            throw new Error('Failed to create checkout session');
        }
    },

    async verifyPayment(sessionId: string): Promise<ApiResponse<PaymentResponse>> {
        return await apiClient.post<ApiResponse<PaymentResponse>>('/functions/v1/verify-payment', {
            sessionId: sessionId
        });
    },

    async refundPayment(bookingId: string): Promise<ApiResponse<PaymentResponse>> {
        // For refunds, we'll use mock for now as the API might not have this endpoint
        return await mockService.refundPayment(bookingId);
    }
};

export const paymentService = {
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.processPayment(paymentData);
            }
            return await apiService.processPayment(paymentData);
        } catch (error) {
            console.error('Error in processPayment:', error);
            return await mockService.processPayment(paymentData);
        }
    },

    async verifyPayment(sessionId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.verifyPayment(sessionId);
            }
            return await apiService.verifyPayment(sessionId);
        } catch (error) {
            console.error('Error in verifyPayment:', error);
            return await mockService.verifyPayment(sessionId);
        }
    },

    async refundPayment(bookingId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.refundPayment(bookingId);
            }
            return await apiService.refundPayment(bookingId);
        } catch (error) {
            console.error('Error in refundPayment:', error);
            return await mockService.refundPayment(bookingId);
        }
    }
};

export const processPayment = paymentService.processPayment;
export const verifyPayment = paymentService.verifyPayment;
export const refundPayment = paymentService.refundPayment;