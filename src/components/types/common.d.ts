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