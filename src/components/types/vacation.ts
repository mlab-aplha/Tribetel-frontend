export interface VacationPackage {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    duration: string;
    location: string;
    image: string;
    rating?: number;
    features: string[];
    includes: string[];
    tags: string[];
    isFeatured?: boolean;
    validUntil?: string;
}

export interface Deal {
    id: number;
    title: string;
    description: string;
    discountPercentage: number;
    code?: string;
    validUntil: string;
    applicablePackages: number[];
    isActive: boolean;
    image?: string;
}

export interface VacationBooking {
    id: string;
    package_id: number;
    user_id: string;
    check_in: string;
    check_out: string;
    guests: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    special_requests?: string;
}

export interface VacationInquiry {
    id: string;
    package_id: number;
    name: string;
    email: string;
    phone: string;
    travel_date: string;
    guests: number;
    message?: string;
    status: 'new' | 'contacted' | 'booked' | 'cancelled';
    created_at: string;
}