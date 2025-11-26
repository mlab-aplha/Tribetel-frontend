import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hotel-backend-hub-dyfd.onrender.com/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Ensure headers exist before setting Authorization
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
        return config;
    },
    (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ API Success: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ API Response Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export const apiHelpers = {
    getData: <T>(response: any): T => {
        return response.data;
    },

    handleError: (error: any): never => {
        if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message || 'An unexpected error occurred');
    }
};

export const apiMethods = {
    async get<T>(endpoint: string, params?: any): Promise<T> {
        const response = await apiClient.get(endpoint, { params });
        return apiHelpers.getData<T>(response);
    },

    async post<T>(endpoint: string, data?: any): Promise<T> {
        const response = await apiClient.post(endpoint, data);
        return apiHelpers.getData<T>(response);
    },

    async put<T>(endpoint: string, data?: any): Promise<T> {
        const response = await apiClient.put(endpoint, data);
        return apiHelpers.getData<T>(response);
    },

    async patch<T>(endpoint: string, data?: any): Promise<T> {
        const response = await apiClient.patch(endpoint, data);
        return apiHelpers.getData<T>(response);
    },

    async delete<T>(endpoint: string): Promise<T> {
        const response = await apiClient.delete(endpoint);
        return apiHelpers.getData<T>(response);
    }
};


export default apiMethods;
