const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
    async request(endpoint: string, options: RequestInit = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    },

    get<T>(endpoint: string): Promise<T> {
        return this.request(endpoint, { method: 'GET' });
    },

    post<T>(endpoint: string, data: any): Promise<T> {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    put<T>(endpoint: string, data: any): Promise<T> {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    delete<T>(endpoint: string): Promise<T> {
        return this.request(endpoint, { method: 'DELETE' });
    }
};

export const config = {
    apiBaseUrl: API_BASE_URL,
    isMockMode: import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_URL
};