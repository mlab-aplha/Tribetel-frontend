export interface Accommodation {
    id: string;
    name: string;
    description: string;
    address: string;
    star_rating: number;
    price_per_night: number;
    total_rooms: number;
    available_rooms: number;
    facilities: string[];
    policies: string;
    images: string[];
    location_lat: number;
    location_lng: number;
    created_at: string;
    updated_at: string;
}

export interface Reservation {
    id: string;
    accommodation_id: string;
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    check_in_date: string;
    check_out_date: string;
    num_rooms: number;
    num_guests: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    payment_status: 'pending' | 'paid' | 'refunded';
    profile_id?: string;
    created_at: string;
    updated_at: string;
    accommodations?: Accommodation;
    profiles?: Profile;
}

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    phone: string;
    role: 'admin' | 'manager' | 'staff';
    avatar_url: string;
    address: string;
    city: string;
    country: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AdminUser {
    id: string;
    profile_id: string;
    permissions: string[];
    last_login: string;
    created_at: string;
    profiles?: Profile;
}

export type User = Profile;

