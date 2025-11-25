import { apiMethods } from './api';

export const testService = {
    async healthCheck(): Promise<{ status: string; timestamp: string }> {
        try {
            const response = await apiMethods.get<{ status: string; timestamp: string }>('/health');
            console.log(' Backend health check:', response);
            return response;
        } catch (error) {
            console.error(' Backend health check failed:', error);
            throw error;
        }
    },

    async getHotels(): Promise<any> {
        try {
            const response = await apiMethods.get('/hotels');
            console.log(' Hotels fetched:', response);
            return response;
        } catch (error) {
            console.error(' Failed to fetch hotels:', error);
            throw error;
        }
    }
};