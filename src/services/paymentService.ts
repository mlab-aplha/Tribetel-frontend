import { PaymentRequest, PaymentResponse, ApiResponse } from '../components/types/common';

export const paymentService = {
    async processPayment(paymentRequest: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const paymentResponse: PaymentResponse = {
                id: `pay_${Math.random().toString(36).substr(2, 9)}`,
                status: 'succeeded',
                amount: paymentRequest.amount,
                currency: paymentRequest.currency,
                paymentMethod: paymentRequest.paymentMethod,
                transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
                bookingId: paymentRequest.bookingId,
                paidAt: new Date().toISOString()
            };

            return {
                success: true,
                message: 'Payment processed successfully',
                data: paymentResponse
            };
        } catch (error) {
            console.error('Payment processing error:', error);
            return {
                success: false,
                message: 'Failed to process payment',
                data: {
                    id: '',
                    status: 'failed',
                    amount: 0,
                    currency: 'ZAR',
                    paymentMethod: '',
                    transactionId: '',
                    bookingId: '',
                    paidAt: ''
                }
            };
        }
    },

    async getPaymentStatus(paymentId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const paymentResponse: PaymentResponse = {
                id: paymentId,
                status: 'succeeded',
                amount: 1200,
                currency: 'ZAR',
                paymentMethod: 'credit_card',
                transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
                bookingId: 'booking_123',
                paidAt: new Date().toISOString()
            };

            return {
                success: true,
                message: 'Payment status fetched successfully',
                data: paymentResponse
            };
        } catch (error) {
            console.error('Error fetching payment status:', error);
            return {
                success: false,
                message: 'Failed to fetch payment status',
                data: {
                    id: paymentId,
                    status: 'failed',
                    amount: 0,
                    currency: 'ZAR',
                    paymentMethod: '',
                    transactionId: '',
                    bookingId: '',
                    paidAt: ''
                }
            };
        }
    },

    async refundPayment(paymentId: string, amount?: number): Promise<ApiResponse<PaymentResponse>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const refundResponse: PaymentResponse = {
                id: paymentId,
                status: 'succeeded', // Changed from 'refunded' to valid status
                amount: amount || 1200,
                currency: 'ZAR',
                paymentMethod: 'credit_card',
                transactionId: `ref_${Math.random().toString(36).substr(2, 9)}`,
                bookingId: 'booking_123',
                paidAt: new Date().toISOString()
            };

            return {
                success: true,
                message: 'Refund processed successfully',
                data: refundResponse
            };
        } catch (error) {
            console.error('Error processing refund:', error);
            return {
                success: false,
                message: 'Failed to process refund',
                data: {
                    id: paymentId,
                    status: 'failed',
                    amount: 0,
                    currency: 'ZAR',
                    paymentMethod: '',
                    transactionId: '',
                    bookingId: '',
                    paidAt: ''
                }
            };
        }
    },

    async validatePaymentMethod(paymentMethod: any): Promise<ApiResponse<{ valid: boolean; message?: string }>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            if (!paymentMethod.cardNumber || !paymentMethod.expiryDate || !paymentMethod.cvv) {
                return {
                    success: false,
                    message: 'Invalid payment method details',
                    data: { valid: false, message: 'Missing required payment details' }
                };
            }
            const cardNumber = paymentMethod.cardNumber.replace(/\s/g, '');
            if (cardNumber.length !== 16 || isNaN(Number(cardNumber))) {
                return {
                    success: false,
                    message: 'Invalid card number',
                    data: { valid: false, message: 'Card number must be 16 digits' }
                };
            }

            return {
                success: true,
                message: 'Payment method validated successfully',
                data: { valid: true }
            };
        } catch (error) {
            console.error('Error validating payment method:', error);
            return {
                success: false,
                message: 'Failed to validate payment method',
                data: { valid: false, message: 'Validation failed' }
            };
        }
    },

    async getPaymentMethods(userId?: string): Promise<ApiResponse<any[]>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 400));
            console.log('Fetching payment methods for user:', userId);
            const paymentMethods = [
                {
                    id: 'pm_1',
                    type: 'credit_card',
                    last4: '4242',
                    brand: 'visa',
                    expiryDate: '12/25',
                    isDefault: true
                },
                {
                    id: 'pm_2',
                    type: 'credit_card',
                    last4: '8888',
                    brand: 'mastercard',
                    expiryDate: '08/26',
                    isDefault: false
                }
            ];

            return {
                success: true,
                message: 'Payment methods fetched successfully',
                data: paymentMethods
            };
        } catch (error) {
            console.error('Error fetching payment methods:', error);
            return {
                success: false,
                message: 'Failed to fetch payment methods',
                data: []
            };
        }
    },

    async processRefund(paymentId: string, amount?: number): Promise<ApiResponse<{ refundId: string; status: string; amount: number; message: string }>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Use the paymentId parameter to avoid the warning
            console.log(`Processing refund for payment: ${paymentId}`);

            const refundResponse = {
                refundId: `ref_${Math.random().toString(36).substr(2, 9)}`,
                status: 'processed',
                amount: amount || 1200,
                message: 'Refund processed successfully'
            };

            return {
                success: true,
                message: 'Refund processed successfully',
                data: refundResponse
            };
        } catch (error) {
            console.error('Error processing refund:', error);
            return {
                success: false,
                message: 'Failed to process refund',
                data: {
                    refundId: '',
                    status: 'failed',
                    amount: 0,
                    message: 'Refund processing failed'
                }
            };
        }
    }
};

export const {
    processPayment,
    getPaymentStatus,
    refundPayment,
    validatePaymentMethod,
    getPaymentMethods,
    processRefund
} = paymentService;

