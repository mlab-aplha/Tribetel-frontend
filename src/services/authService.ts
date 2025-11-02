import { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '../components/types/common';

// Configuration for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Mock user data for development
const mockUsers = [
    {
        id: "1",
        email: "admin@tritel.co.za",
        password: "password123",
        name: "Admin User",
        role: "admin"
    },
    {
        id: "2",
        email: "user@tritel.co.za",
        password: "password123",
        name: "Regular User",
        role: "user"
    }
];

export const authService = {
    async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            const user = mockUsers.find(u =>
                u.email === credentials.email && u.password === credentials.password
            );

            if (user) {
                const authResponse: AuthResponse = {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    },
                    token: `mock-jwt-token-${user.id}`,
                    expiresIn: 3600
                };

                // Store in localStorage for persistence
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
                    data: {} as AuthResponse
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Login failed',
                data: {} as AuthResponse
            };
        }
    },

    async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            // Check if user already exists
            const existingUser = mockUsers.find(u => u.email === userData.email);
            if (existingUser) {
                return {
                    success: false,
                    message: 'User already exists',
                    data: {} as AuthResponse
                };
            }

            // Create new user
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                email: userData.email,
                password: userData.password,
                name: userData.name,
                role: 'user'
            };

            mockUsers.push(newUser);

            const authResponse: AuthResponse = {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role
                },
                token: `mock-jwt-token-${newUser.id}`,
                expiresIn: 3600
            };

            // Store in localStorage
            localStorage.setItem('authToken', authResponse.token);
            localStorage.setItem('user', JSON.stringify(authResponse.user));
            localStorage.setItem('isLoggedIn', 'true');

            return {
                success: true,
                message: 'Registration successful',
                data: authResponse
            };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: 'Registration failed',
                data: {} as AuthResponse
            };
        }
    },

    async logout(): Promise<ApiResponse<{ message: string }>> {
        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');

            return {
                success: true,
                message: 'Logout successful',
                data: { message: 'Logged out successfully' }
            };
        } catch (error) {
            console.error('Logout error:', error);
            return {
                success: false,
                message: 'Logout failed',
                data: { message: 'Logout failed' }
            };
        }
    },

    async getCurrentUser(): Promise<ApiResponse<User>> {
        try {
            const token = localStorage.getItem('authToken');
            const userStr = localStorage.getItem('user');

            if (token && userStr) {
                const user = JSON.parse(userStr);
                return {
                    success: true,
                    message: 'User fetched successfully',
                    data: user
                };
            } else {
                return {
                    success: false,
                    message: 'No user logged in',
                    data: {} as User
                };
            }
        } catch (error) {
            console.error('Get current user error:', error);
            return {
                success: false,
                message: 'Failed to get current user',
                data: {} as User
            };
        }
    },

    async resetPassword(email: string): Promise<ApiResponse<{ message: string }>> {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const userExists = mockUsers.some(u => u.email === email);
            if (userExists) {
                return {
                    success: true,
                    message: 'Password reset email sent',
                    data: { message: 'Password reset instructions sent to your email' }
                };
            } else {
                return {
                    success: false,
                    message: 'Email not found',
                    data: { message: 'Email address not registered' }
                };
            }
        } catch (error) {
            console.error('Reset password error:', error);
            return {
                success: false,
                message: 'Password reset failed',
                data: { message: 'Password reset failed' }
            };
        }
    }
};

export const { login, register, logout, getCurrentUser, resetPassword } = authService;