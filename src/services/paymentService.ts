import { PaymentRequest, PaymentResponse, ApiResponse } from '../components/types/common';
import { api } from './api';

export const paymentService = {
    async processPayment(paymentRequest: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        try {
            const response = await api.post<ApiResponse<PaymentResponse>>('/payments/process', paymentRequest);
            return response.data;
        } catch (error) {
            console.error('Payment processing error:', error);
            throw new Error('Failed to process payment');
        }
    },

    async getPaymentStatus(paymentId: string): Promise<ApiResponse<PaymentResponse>> {
        try {
            const response = await api.get<ApiResponse<PaymentResponse>>(`/payments/${paymentId}/status`);
            return response.data;
        } catch (error) {
            console.error('Error fetching payment status:', error);
            throw new Error('Failed to fetch payment status');
        }
    },

    async refundPayment(paymentId: string, amount?: number): Promise<ApiResponse<PaymentResponse>> {
        try {
            const response = await api.post<ApiResponse<PaymentResponse>>(`/payments/${paymentId}/refund`, {
                amount
            });
            return response.data;
        } catch (error) {
            console.error('Error processing refund:', error);
            throw new Error('Failed to process refund');
        }
    }
};

export const { processPayment, getPaymentStatus, refundPayment } = paymentService;