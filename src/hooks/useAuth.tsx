import { useState, useContext, createContext, ReactNode } from 'react';
import {
    AuthContextType,
    User,
    RegisterRequest,
    LoginRequest,
    AuthResponse
} from '../components/types/common';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [admin, setAdmin] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!user;
    const isAdmin = !!admin;

    // Simulate API call delay
    const simulateAPICall = (delay: number = 1000): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, delay));
    };

    // Register function
    const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
        setIsLoading(true);

        try {
            await simulateAPICall(1500);

            const existingUsers = ['test@example.com', 'user@example.com'];
            if (existingUsers.includes(userData.email)) {
                throw new Error('Email already exists. Please use a different email address.');
            }

            // Validate password strength
            if (userData.password.length < 6) {
                throw new Error('Password must be at least 6 characters long.');
            }

            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(userData.password)) {
                throw new Error('Password must include uppercase and lowercase letters, and numbers.');
            }

            // Create new user
            const newUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                isLoggedIn: true,
                name: userData.name,
                email: userData.email,
                preferences: {
                    favoriteDestinations: [],
                    roomPreferences: [],
                }
            };

            const authResponse: AuthResponse = {
                user: newUser,
                token: `token_${Math.random().toString(36).substr(2, 16)}`,
                expiresIn: 24 * 60 * 60 * 1000 // 24 hours
            };

            setUser(newUser);

            // Store in localStorage for persistence
            localStorage.setItem('auth_token', authResponse.token);
            localStorage.setItem('user', JSON.stringify(newUser));

            return authResponse;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Login function
    const login = async (userData: LoginRequest): Promise<AuthResponse> => {
        setIsLoading(true);

        try {
            await simulateAPICall(1200);

            // Mock authentication
            const validUsers = [
                { email: 'test@example.com', password: 'Password123', name: 'Test User' },
                { email: 'user@example.com', password: 'Password123', name: 'Demo User' }
            ];

            const validUser = validUsers.find(
                u => u.email === userData.email && u.password === userData.password
            );

            if (!validUser) {
                throw new Error('Invalid email or password. Please try again.');
            }

            const loggedInUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                isLoggedIn: true,
                name: validUser.name,
                email: validUser.email,
                preferences: {
                    favoriteDestinations: ['Cape Town', 'Durban'],
                    roomPreferences: ['Double Bed', 'City View'],
                }
            };

            const authResponse: AuthResponse = {
                user: loggedInUser,
                token: `token_${Math.random().toString(36).substr(2, 16)}`,
                expiresIn: userData.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 30 days or 24 hours
            };

            setUser(loggedInUser);

            // Store in localStorage
            localStorage.setItem('auth_token', authResponse.token);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            if (userData.rememberMe) {
                localStorage.setItem('remember_me', 'true');
            }

            return authResponse;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = (): void => {
        setIsLoading(true);

        try {
            setUser(null);

            // Clear localStorage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            localStorage.removeItem('remember_me');

            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Admin login function
    const adminLogin = async (adminData: LoginRequest): Promise<void> => {
        setIsLoading(true);

        try {
            await simulateAPICall(1000);

            // Mock admin authentication
            const validAdmins = [
                { email: 'admin@tribtel.com', password: 'Admin123' },
                { email: 'manager@tribtel.com', password: 'Manager123' }
            ];

            const validAdmin = validAdmins.find(
                a => a.email === adminData.email && a.password === adminData.password
            );

            if (!validAdmin) {
                throw new Error('Invalid admin credentials.');
            }

            const adminUser = {
                id: 'admin1',
                name: 'Admin User',
                email: adminData.email,
                role: 'admin'
            };

            setAdmin(adminUser);

            // Store admin session
            localStorage.setItem('admin_token', `admin_token_${Math.random().toString(36).substr(2, 16)}`);
            localStorage.setItem('admin', JSON.stringify(adminUser));

        } catch (error) {
            console.error('Admin login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Admin logout function
    const adminLogout = (): void => {
        setIsLoading(true);

        try {
            setAdmin(null);

            // Clear admin storage
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin');

            console.log('Admin logged out successfully');
        } catch (error) {
            console.error('Admin logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Check existing authentication on app start
    const checkExistingAuth = (): void => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('auth_token');
        const storedAdmin = localStorage.getItem('admin');
        const storedAdminToken = localStorage.getItem('admin_token');

        if (storedUser && storedToken) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                // Clear invalid data
                localStorage.removeItem('user');
                localStorage.removeItem('auth_token');
            }
        }

        if (storedAdmin && storedAdminToken) {
            try {
                const adminData = JSON.parse(storedAdmin);
                setAdmin(adminData);
            } catch (error) {
                console.error('Error parsing stored admin data:', error);
                // Clear invalid data
                localStorage.removeItem('admin');
                localStorage.removeItem('admin_token');
            }
        }
    };

    // Initialize auth check
    useState(() => {
        checkExistingAuth();
    });

    const contextValue: AuthContextType = {
        user,
        admin,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        adminLogin,
        adminLogout,
        register
    };

    return (
        <AuthContext.Provider value={contextValue} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export default useAuth;