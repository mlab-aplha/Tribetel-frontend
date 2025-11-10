import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    admin: boolean;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const userData = localStorage.getItem('userData');
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    localStorage.removeItem('userData');
                    localStorage.removeItem('authToken');
                }
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            const mockUser: User = {
                id: '1',
                email,
                name: email.split('@')[0]
            };

            setUser(mockUser);
            localStorage.setItem('userData', JSON.stringify(mockUser));
            localStorage.setItem('authToken', 'mock-token');
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string): Promise<void> => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!email || !password || !name) {
                throw new Error('All fields are required');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            const mockUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                name
            };

            setUser(mockUser);
            localStorage.setItem('userData', JSON.stringify(mockUser));
            localStorage.setItem('authToken', 'mock-token');
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = (): void => {
        setUser(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.email === 'admin@example.com';
    const admin = isAdmin;

    const value: AuthContextType = {
        user,
        admin,
        isLoading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        signup,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};