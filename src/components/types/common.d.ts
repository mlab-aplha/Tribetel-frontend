export interface UserPreferences {
    favoriteDestinations?: string[];
    roomPreferences?: string[];
    specialRequests?: string;
    newsletter?: boolean;
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

export interface Service {
    id: number;
    title: string;
    description: string;
    image?: string;
    features?: string[];
    price?: number;
}

export interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    avatar?: string;
    rating?: number;
}