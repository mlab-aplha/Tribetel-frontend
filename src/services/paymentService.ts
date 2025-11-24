import { PaymentRequest, PaymentResponse, ApiResponse } from '../components/types/booking';
import { apiClient } from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';


type ExtendedPaymentResponse = PaymentResponse & {
  clientSecret?: string;
  status: 'pending' | 'failed' | 'refunded' | 'succeeded' | 'requires_payment_method' | 'processing' | 'requires_action' | 'canceled';
};

const mockProcessPayment = async (paymentRequest: PaymentRequest): Promise<{ success: boolean; data: ExtendedPaymentResponse; message: string }> => {
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
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<ExtendedPaymentResponse>> {
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

    async verifyPayment(paymentIntentId: string): Promise<ApiResponse<ExtendedPaymentResponse>> {
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
                transactionId: paymentIntentId,
                bookingId: `booking-${Date.now()}`,
                paidAt: new Date().toISOString(),
                receiptUrl: '#'
            }
        };
    },

    async refundPayment(bookingId: string): Promise<ApiResponse<ExtendedPaymentResponse>> {
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
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<ExtendedPaymentResponse>> {
        try {
            const response = await apiClient.post<ApiResponse<{ clientSecret: string; paymentIntentId: string }>>('/payments/create-intent', {
                amount: paymentData.amount,
                currency: paymentData.currency,
                metadata: {
                    bookingId: paymentData.bookingId
                }
            });

            return {
                success: true,
                message: 'Payment intent created successfully',
                data: {
                    id: response.data.paymentIntentId,
                    bookingId: paymentData.bookingId,
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    status: 'pending', // Use 'pending' instead of 'requires_payment_method'
                    paymentMethod: paymentData.paymentMethod,
                    transactionId: response.data.paymentIntentId,
                    paidAt: new Date().toISOString(),
                    receiptUrl: '',
                    clientSecret: response.data.clientSecret
                }
            };
        } catch (error) {
            console.error('API payment error:', error);
            throw error;
        }
    },

    async verifyPayment(paymentIntentId: string): Promise<ApiResponse<ExtendedPaymentResponse>> {
        try {
            const response = await apiClient.get<ApiResponse<{
                id: string;
                status: string;
                amount: number;
                currency: string;
                created: string;
            }>>(`/payments/status/${paymentIntentId}`);

            // Map Stripe status to your status
            const statusMap: { [key: string]: ExtendedPaymentResponse['status'] } = {
                'succeeded': 'succeeded',
                'processing': 'pending',
                'requires_payment_method': 'pending',
                'requires_action': 'pending',
                'canceled': 'failed',
                'requires_capture': 'pending'
            };

            const mappedStatus = statusMap[response.data.status] || 'pending';

            return {
                success: true,
                message: 'Payment status retrieved',
                data: {
                    id: response.data.id,
                    status: mappedStatus,
                    amount: response.data.amount,
                    currency: response.data.currency,
                    paymentMethod: 'card',
                    transactionId: response.data.id,
                    bookingId: '', // You'll need to store this elsewhere
                    paidAt: response.data.created,
                    receiptUrl: ''
                }
            };
        } catch (error) {
            console.error('API verification error:', error);
            throw error;
        }
    },

    async refundPayment(bookingId: string): Promise<ApiResponse<ExtendedPaymentResponse>> {
        try {
            const response = await apiClient.post<ApiResponse<{
                refundId: string;
                status: string;
                amount: number;
                currency: string;
            }>>('/payments/refund', {
                paymentIntentId: bookingId
            });

            return {
                success: true,
                message: 'Refund processed successfully',
                data: {
                    id: response.data.refundId,
                    status: 'refunded',
                    amount: response.data.amount,
                    currency: response.data.currency,
                    paymentMethod: 'refund',
                    transactionId: response.data.refundId,
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
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<ExtendedPaymentResponse>> {
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

    async verifyPayment(paymentIntentId: string): Promise<ApiResponse<ExtendedPaymentResponse>> {
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

    async refundPayment(bookingId: string): Promise<ApiResponse<ExtendedPaymentResponse>> {
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
