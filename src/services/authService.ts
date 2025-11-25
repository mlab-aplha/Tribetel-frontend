import { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../components/types/common';
import { apiClient, apiHelpers } from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const mockService = {
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUsers = [
            { id: "1", email: "admin@tritel.co.za", password: "password123", name: "Admin User" },
            { id: "2", email: "user@tritel.co.za", password: "password123", name: "Regular User" }
        ];

        const user = mockUsers.find(u =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
            const authResponse: AuthResponse = {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isLoggedIn: true
                },
                token: `mock-jwt-token-${user.id}`,
                expiresIn: 3600
            };

            localStorage.setItem('authToken', authResponse.token);
            localStorage.setItem('user', JSON.stringify(authResponse.user));
            localStorage.setItem('isLoggedIn', 'true');

            return {
                success: true,
                message: 'Login successful',
                data: authResponse
            };
        } else {
            return {
                success: false,
                message: 'Invalid email or password',
                data: {
                    user: { id: '', email: '', name: '', isLoggedIn: false },
                    token: '',
                    expiresIn: 0
                }
            };
        }
    },

    async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            email: userData.email,
            password: userData.password,
            name: userData.name
        };

        const authResponse: AuthResponse = {
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                isLoggedIn: true
            },
            token: `mock-jwt-token-${newUser.id}`,
            expiresIn: 3600
        };

        localStorage.setItem('authToken', authResponse.token);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        localStorage.setItem('isLoggedIn', 'true');

        return {
            success: true,
            message: 'Registration successful',
            data: authResponse
        };
    },

    async logout(): Promise<ApiResponse<{ message: string }>> {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');

        return {
            success: true,
            message: 'Logout successful',
            data: { message: 'Logged out successfully' }
        };
    },

    async getCurrentUser(): Promise<ApiResponse<User>> {
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (token && userStr) {
            const userData = JSON.parse(userStr);
            const user: User = { ...userData, isLoggedIn };
            return {
                success: true,
                message: 'User fetched successfully',
                data: user
            };
        } else {
            return {
                success: false,
                message: 'No user logged in',
                data: { id: '', email: '', name: '', isLoggedIn: false }
            };
        }
    }
};

const apiService = {
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', {
                email: credentials.email,
                password: credentials.password
            });

            const authData = apiHelpers.getData<ApiResponse<AuthResponse>>(response);

            if (authData.success && authData.data.token) {
                localStorage.setItem('authToken', authData.data.token);
                localStorage.setItem('user', JSON.stringify(authData.data.user));
                localStorage.setItem('isLoggedIn', 'true');
            }

            return authData;
        } catch (error) {
            console.error('API login error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', {
                email: userData.email,
                password: userData.password,
                name: userData.name
            });

            const authData = apiHelpers.getData<ApiResponse<AuthResponse>>(response);

            if (authData.success && authData.data.token) {
                localStorage.setItem('authToken', authData.data.token);
                localStorage.setItem('user', JSON.stringify(authData.data.user));
                localStorage.setItem('isLoggedIn', 'true');
            }

            return authData;
        } catch (error) {
            console.error('API register error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async logout(): Promise<ApiResponse<{ message: string }>> {
        try {
            await apiClient.post('/auth/logout');

            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');

            return {
                success: true,
                message: 'Logout successful',
                data: { message: 'Logged out successfully' }
            };
        } catch (error) {
            console.error('API logout error:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');

            return {
                success: true,
                message: 'Logout successful',
                data: { message: 'Logged out successfully' }
            };
        }
    },

    async getCurrentUser(): Promise<ApiResponse<User>> {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                return {
                    success: false,
                    message: 'No authentication token',
                    data: { id: '', email: '', name: '', isLoggedIn: false }
                };
            }

            const response = await apiClient.get<ApiResponse<User>>('/auth/me');
            const userData = apiHelpers.getData<ApiResponse<User>>(response);

            if (userData.success) {
                localStorage.setItem('user', JSON.stringify(userData.data));
                localStorage.setItem('isLoggedIn', 'true');
            }

            return userData;
        } catch (error) {
            console.error('API get current user error:', error);
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const userData = JSON.parse(userStr);
                return {
                    success: true,
                    message: 'User fetched from cache',
                    data: { ...userData, isLoggedIn: true }
                };
            }

            return {
                success: false,
                message: 'Failed to get current user',
                data: { id: '', email: '', name: '', isLoggedIn: false }
            };
        }
    },

    async resetPassword(email: string): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
                email
            });

            return apiHelpers.getData(response);
        } catch (error) {
            console.error('API reset password error:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async validateToken(): Promise<boolean> {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) return false;
            const response = await apiClient.get<ApiResponse<{ valid: boolean }>>('/auth/validate-token');
            const validation = apiHelpers.getData<ApiResponse<{ valid: boolean }>>(response);

            return validation.success && validation.data.valid;
        } catch (error) {
            console.error('API token validation error:', error);
            return false;
        }
    }
};

export const authService = {
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.login(credentials);
            }
            return await apiService.login(credentials);
        } catch (error) {
            console.error('Error in login:', error);
            return await mockService.login(credentials);
        }
    },

    async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.register(userData);
            }
            return await apiService.register(userData);
        } catch (error) {
            console.error('Error in register:', error);
            return await mockService.register(userData);
        }
    },

    async logout(): Promise<ApiResponse<{ message: string }>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.logout();
            }
            return await apiService.logout();
        } catch (error) {
            console.error('Error in logout:', error);
            return await mockService.logout();
        }
    },

    async getCurrentUser(): Promise<ApiResponse<User>> {
        try {
            if (USE_MOCK_DATA) {
                return await mockService.getCurrentUser();
            }
            return await apiService.getCurrentUser();
        } catch (error) {
            console.error('Error in getCurrentUser:', error);
            return await mockService.getCurrentUser();
        }
    },

    async resetPassword(email: string): Promise<ApiResponse<{ message: string }>> {
        try {
            if (USE_MOCK_DATA) {
                await new Promise(resolve => setTimeout(resolve, 500));
                return {
                    success: true,
                    message: 'Password reset email sent',
                    data: { message: 'Password reset instructions sent to your email' }
                };
            }
            return await apiService.resetPassword(email);
        } catch (error) {
            console.error('Error in resetPassword:', error);
            throw apiHelpers.handleError(error);
        }
    },

    async validateToken(): Promise<boolean> {
        try {
            if (USE_MOCK_DATA) {
                const token = localStorage.getItem('authToken');
                return !!(token && token.startsWith('mock-jwt-token-'));
            }
            return await apiService.validateToken();
        } catch (error) {
            console.error('Error in validateToken:', error);
            return false;
        }
    },

    isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        return !!(token && isLoggedIn);
    }
};

export const {
    login,
    register,
    logout,
    getCurrentUser,
    resetPassword,
    validateToken,
    isAuthenticated
} = authService;