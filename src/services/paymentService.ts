import { PaymentRequest, PaymentResponse, ApiResponse } from '../components/types/common';

// Configuration for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const paymentService = {
    async processPayment(paymentRequest: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/payments/process`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(paymentRequest)
            // });
            // 
            // if (!response.ok) {
            //     throw new Error('Payment processing failed');
            // }
            // 
            // return await response.json();

            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock successful payment
            const paymentResponse: PaymentResponse = {
                id: `pay_${Math.random().toString(36).substr(2, 9)}`,
                status: 'completed',
                amount: paymentRequest.amount,
                currency: paymentRequest.currency,
                paymentMethod: paymentRequest.paymentMethod,
                transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString()
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
                data: {} as PaymentResponse
            };
        }
    },

    async getPaymentStatus(paymentId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/status`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch payment status');
            // }
            // return await response.json();

            await new Promise(resolve => setTimeout(resolve, 500));

            const paymentResponse: PaymentResponse = {
                id: paymentId,
                status: 'completed',
                amount: 1200,
                currency: 'ZAR',
                paymentMethod: 'credit_card',
                transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString()
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
                data: {} as PaymentResponse
            };
        }
    },

    async refundPayment(paymentId: string, amount?: number): Promise<ApiResponse<PaymentResponse>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/refund`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ amount })
            // });
            // 
            // if (!response.ok) {
            //     throw new Error('Refund processing failed');
            // }
            // 
            // return await response.json();

            await new Promise(resolve => setTimeout(resolve, 1000));

            const refundResponse: PaymentResponse = {
                id: paymentId,
                status: 'refunded',
                amount: amount || 1200,
                currency: 'ZAR',
                paymentMethod: 'credit_card',
                transactionId: `ref_${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString()
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
                data: {} as PaymentResponse
            };
        }
    }
};

export const { processPayment, getPaymentStatus, refundPayment } = paymentService;