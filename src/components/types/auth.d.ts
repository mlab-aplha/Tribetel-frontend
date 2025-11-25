import { ReactNode } from 'react';
import type { UserPreferences } from './common';

export interface AuthContextType {
    user: User | null;
    admin: AdminUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (credentials: LoginRequest) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    adminLogin: (adminData: AdminLoginRequest) => Promise<AuthResponse>;
    adminLogout: () => void;
    register: (userData: RegisterRequest) => Promise<AuthResponse>;
    getCurrentUser: () => Promise<User | null>;
}

export interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    redirectTo?: string;
    fallback?: ReactNode;
}

export interface User {
    id: string;
    email: string;
    name: string;
    isLoggedIn: boolean;
    phone?: string;
    preferences?: UserPreferences;
    createdAt?: string;
    updatedAt?: string;
    role?: 'user' | 'admin' | 'manager' | 'staff';
}

// export interface UserPreferences {
//     favoriteDestinations?: string[];
//     roomPreferences?: string[];
//     specialRequests?: string;
//     newsletter?: boolean;
// }

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'super_admin';
    permissions: string[];
    isLoggedIn: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface AdminLoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    country?: string;
    preferences?: {
        newsletter?: boolean;
    };
}

export interface AuthResponse {
    user: User;
    token: string;
    expiresIn: number;
}

export interface UserSession {
    user: User | null;
    token: string | null;
    expiresAt: number | null;
    permissions: string[];
}

export interface SignInFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface AdminSignInFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface AdminSignInFormProps {
    onSubmit?: (data: AdminSignInFormData) => Promise<void>;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    allowedDomains?: string[];
    redirectPath?: string;
    isLoading?: boolean;
}

export interface SignInLayoutProps {
    children: ReactNode;
    logo?: string;
    brandName?: string;
    className?: string;
}

export interface AdminLayoutProps {
    children: React.ReactNode;
    logo?: string;
    brandName?: string;
    className?: string;
    showBranding?: boolean;
    backgroundImage?: string;
    theme?: 'default';
}