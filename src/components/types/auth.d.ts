import { ReactNode } from 'react';

export interface AuthContextType {
    user: any | null;
    admin: any | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (userData: any) => void;
    logout: () => void;
    adminLogin: (adminData: any) => void;
    adminLogout: () => void;
    register: (userData: RegisterRequest) => Promise<AuthResponse>;
}

export interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    redirectTo?: string;
    fallback?: ReactNode;
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

export interface User {
    id?: string;
    isLoggedIn: boolean;
    name: string;
    email?: string;
    preferences?: UserPreferences;
}

export interface UserPreferences {
    favoriteDestinations?: string[];
    roomPreferences?: string[];
    specialRequests?: string;
}

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone?: string;
    preferences?: {
        favoriteDestinations: string[];
        roomPreferences: string[];
        specialRequests?: string;
    };
    bookings: BookingConfirmation[];
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
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
export interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    redirectTo?: string;
    fallback?: React.ReactNode;
}

export interface HotelSummary {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    description: string;
    pricePerNight: number;
    image: string;
    distanceKm?: number;
    tags?: string[];
    amenities: string[];
}

export interface BookingConfirmation {
    id: string;
    bookingNumber: string;
    fullName: string;
    roomTitle: string;
    checkIn: string;
    checkOut: string;
    status: 'confirmed' | 'cancelled' | 'pending';
}

export interface BookingCardProps {
    key: string;
    booking: BookingConfirmation;
    onAction: (bookingId: string, action: "cancel" | "modify") => Promise<void>;
    showActions: boolean;
}

export interface SignInLayoutProps {
    children: React.ReactNode;
}
