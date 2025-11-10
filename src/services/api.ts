const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tribetel-frontend.onrender.com/api';

// Define proper types for better TypeScript support
interface ApiConfig extends RequestInit {
    headers?: Record<string, string>;
    timeout?: number;
}

interface ApiError extends Error {
    status?: number;
    statusText?: string;
}

export const api = {
    async request<T>(endpoint: string, options: ApiConfig = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const timeout = options.timeout || 10000; // 10 second default timeout

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add authorization header if token exists
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        // Remove timeout from config as it's not part of RequestInit
        delete (config as any).timeout;

        try {
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            config.signal = controller.signal;

            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                const errorData = contentType?.includes('application/json')
                    ? await response.json()
                    : await response.text();

                const error: ApiError = new Error(
                    errorData.message || `HTTP error! status: ${response.status}`
                );
                error.status = response.status;
                error.statusText = response.statusText;
                throw error;
            }

            // Parse response based on content type
            let data;
            if (contentType?.includes('application/json')) {
                data = await response.json();
            } else if (contentType?.includes('text/')) {
                data = await response.text();
            } else {
                data = await response.blob();
            }

            return data as T;

        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new Error('Request timeout');
                }

                const apiError: ApiError = new Error(
                    error.message || 'Network request failed'
                );
                throw apiError;
            }

            throw new Error('Unknown error occurred');
        }
    },

    get<T>(endpoint: string, config: Omit<ApiConfig, 'method' | 'body'> = {}): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
            ...config
        });
    },

    post<T>(endpoint: string, data?: any, config: Omit<ApiConfig, 'method' | 'body'> = {}): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
    },

    put<T>(endpoint: string, data?: any, config: Omit<ApiConfig, 'method' | 'body'> = {}): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
    },

    patch<T>(endpoint: string, data?: any, config: Omit<ApiConfig, 'method' | 'body'> = {}): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
    },

    delete<T>(endpoint: string, config: Omit<ApiConfig, 'method'> = {}): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            ...config
        });
    },

    // Helper for file uploads
    upload<T>(endpoint: string, formData: FormData, config: Omit<ApiConfig, 'method' | 'body'> = {}): Promise<T> {
        const headers = { ...config.headers };
        // Remove Content-Type for FormData to let browser set it with boundary
        delete headers['Content-Type'];

        return this.request<T>(endpoint, {
            method: 'POST',
            body: formData,
            headers,
            ...config,
        });
    }
};

export const config = {
    apiBaseUrl: API_BASE_URL,
    isMockMode: import.meta.env.VITE_USE_MOCK_DATA === 'true' || !import.meta.env.VITE_API_URL,

    setAuthToken(token: string) {
        localStorage.setItem('authToken', token);
    },

    removeAuthToken() {
        localStorage.removeItem('authToken');
    },

    getAuthToken(): string | null {
        return localStorage.getItem('authToken');
    }
};