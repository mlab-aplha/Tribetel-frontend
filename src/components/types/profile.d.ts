import type { UserPreferences } from './common';

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    phone: string;
    role: 'admin' | 'manager' | 'staff' | 'user';
    avatar_url: string;
    address: string;
    city: string;
    country: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    preferences?: UserPreferences;
}

export interface UserProfile extends Profile {
    bookings_count?: number;
    total_spent?: number;
    last_booking_date?: string;
    membership_tier?: 'standard' | 'premium' | 'vip';
}

export interface ProfileUpdateRequest {
    full_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    avatar_url?: string;
    preferences?: UserPreferences;
}