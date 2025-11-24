import { PaymentRequest, PaymentResponse, ApiResponse } from '../components/types/booking';
import { apiClient } from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hotel-backend-hub-dyfd.onrender.com/api';

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
            receiptUrl: '#'
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
                    receiptUrl: ''
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
                receiptUrl: '#'
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
                receiptUrl: '#'
            }
        };
    }
};

const apiService = {
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        try {
          
            const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    metadata: {
                        bookingId: paymentData.bookingId
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

         
            return {
                success: true,
                message: 'Payment intent created',
                data: {
                    id: result.paymentIntentId,
                    status: 'requires_payment_method',
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    paymentMethod: paymentData.paymentMethod,
                    transactionId: result.paymentIntentId,
                    bookingId: paymentData.bookingId,
                    paidAt: new Date().toISOString(),
                    receiptUrl: '',
                    clientSecret: result.clientSecret 
                }
            };
        } catch (error) {
            console.error('API payment error:', error);
            throw error;
        }
    },

    async verifyPayment(paymentIntentId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            
            const response = await fetch(`${API_BASE_URL}/payments/status/${paymentIntentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            return {
                success: true,
                message: 'Payment status retrieved',
                data: {
                    id: result.id,
                    status: result.status,
                    amount: result.amount,
                    currency: result.currency,
                    paymentMethod: 'card',
                    transactionId: result.id,
                    bookingId: '', // You might need to store this elsewhere
                    paidAt: result.created,
                    receiptUrl: ''
                }
            };
        } catch (error) {
            console.error('API verification error:', error);
            throw error;
        }
    },

    async refundPayment(bookingId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            
            const response = await fetch(`${API_BASE_URL}/payments/refund`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    paymentIntentId: bookingId 
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            return {
                success: true,
                message: 'Refund processed',
                data: {
                    id: result.refundId,
                    status: 'refunded',
                    amount: result.amount,
                    currency: result.currency,
                    paymentMethod: 'refund',
                    transactionId: result.refundId,
                    bookingId: bookingId,
                    paidAt: new Date().toISOString(),
                    receiptUrl: ''
                }
            };
        } catch (error) {
            console.error('API refund error:', error);
            throw error;
        }
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

    async verifyPayment(paymentIntentId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.verifyPayment(paymentIntentId);
            }
            return await apiService.verifyPayment(paymentIntentId);
        } catch (error) {
            console.error('Error in verifyPayment:', error);
            return await mockService.verifyPayment(paymentIntentId);
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
