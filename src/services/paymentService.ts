import { PaymentRequest, PaymentResponse, CheckoutSessionResponse, PaymentVerificationResponse } from '../components/types/payment';
import { ApiResponse } from '../components/types/booking';
import { apiClient, apiHelpers } from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const mockService = {
    async processPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        return {
            success: true,
            message: 'Mock payment processed successfully',
            data: {
                id: `payment-${Date.now()}`,
                bookingId: paymentData.bookingId,
                amount: paymentData.amount,
                currency: paymentData.currency,
                status: 'succeeded',
                paymentMethod: paymentData.paymentMethod,
                transactionId: `txn-${Date.now()}`,
                paidAt: new Date().toISOString(),
                receiptUrl: '#'
            }
        };
    },

    async verifyPayment(paymentIntentId: string): Promise<ApiResponse<PaymentResponse>> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            message: 'Mock payment verified successfully',
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
    }
};

const apiService = {

    async createCheckoutSession(bookingId: string): Promise<CheckoutSessionResponse> {
        try {
            const response = await apiClient.post<CheckoutSessionResponse>('/functions/v1/create-checkout', {
                bookingId
            });

            return apiHelpers.getData<CheckoutSessionResponse>(response);
        } catch (error) {
            console.error('Create checkout session error:', error);
            throw apiHelpers.handleError(error);
        }
    },


    async verifyPayment(sessionId: string): Promise<PaymentVerificationResponse> {
        try {
            const response = await apiClient.post<PaymentVerificationResponse>('/functions/v1/verify-payment', {
                sessionId
            });

            return apiHelpers.getData<PaymentVerificationResponse>(response);
        } catch (error) {
            console.error('Verify payment error:', error);
            throw apiHelpers.handleError(error);
        }
    },
    async updateBookingPaymentStatus(bookingId: string, paymentStatus: string): Promise<any> {
        try {
            const response = await apiClient.put(`/api/bookings?id=${bookingId}`, {
                payment_status: paymentStatus
            });

            return apiHelpers.getData(response);
        } catch (error) {
            console.error('Update booking status error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async processDirectPayment(paymentData: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        try {
            await this.updateBookingPaymentStatus(paymentData.bookingId, 'paid');

            return {
                success: true,
                message: 'Payment processed successfully',
                data: {
                    id: `direct-payment-${Date.now()}`,
                    bookingId: paymentData.bookingId,
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    status: 'succeeded',
                    paymentMethod: paymentData.paymentMethod,
                    transactionId: `direct-${Date.now()}`,
                    paidAt: new Date().toISOString(),
                    receiptUrl: '#'
                }
            };
        } catch (error) {
            console.error('Direct payment error:', error);
            throw apiHelpers.handleError(error);
        }
    }
};

export const paymentService = {

    async processPayment(paymentData: PaymentRequest, useStripe: boolean = true): Promise<ApiResponse<PaymentResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.processPayment(paymentData);
            }

            if (useStripe) {
                const checkoutSession = await apiService.createCheckoutSession(paymentData.bookingId);

                return {
                    success: true,
                    message: 'Checkout session created',
                    data: {
                        id: checkoutSession.sessionId,
                        bookingId: paymentData.bookingId,
                        amount: paymentData.amount,
                        currency: paymentData.currency,
                        status: 'pending',
                        paymentMethod: 'stripe',
                        transactionId: checkoutSession.sessionId,
                        paidAt: new Date().toISOString(),
                        receiptUrl: checkoutSession.url
                    }
                };
            } else {
                return await apiService.processDirectPayment(paymentData);
            }
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

            const verification = await apiService.verifyPayment(sessionId);

            return {
                success: verification.success,
                message: verification.success ? 'Payment verified successfully' : 'Payment verification failed',
                data: {
                    id: verification.booking.payment_intent_id,
                    bookingId: verification.booking.id,
                    amount: 0,
                    currency: 'ZAR',
                    status: verification.booking.payment_status as any,
                    paymentMethod: 'stripe',
                    transactionId: verification.booking.payment_intent_id,
                    paidAt: new Date().toISOString(),
                    receiptUrl: '#'
                }
            };
        } catch (error) {
            console.error('Error in verifyPayment:', error);
            return await mockService.verifyPayment(sessionId);
        }
    },

    async refundPayment(bookingId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            await apiService.updateBookingPaymentStatus(bookingId, 'refunded');

            return {
                success: true,
                message: 'Refund processed successfully',
                data: {
                    id: `refund-${Date.now()}`,
                    status: 'refunded',
                    amount: 0,
                    currency: 'ZAR',
                    paymentMethod: 'refund',
                    transactionId: `refund-${Date.now()}`,
                    bookingId: bookingId,
                    paidAt: new Date().toISOString(),
                    receiptUrl: '#'
                }
            };
        } catch (error) {
            console.error('Error in refundPayment:', error);
            throw apiHelpers.handleError(error);
        }
    }
};
export const processPayment = paymentService.processPayment;
export const verifyPayment = paymentService.verifyPayment;
export const refundPayment = paymentService.refundPayment;
export const createCheckoutSession = apiService.createCheckoutSession;