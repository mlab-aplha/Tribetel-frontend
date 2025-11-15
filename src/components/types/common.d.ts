export * from './ui';
export * from './auth';
export * from './search';
export * from './hotel';
export * from './room';
export * from './booking';
export * from './payment';
export * from './api';
export * from './cache';
export * from './asset';

// components/types/common.ts
export interface Room {
    id: number;
    title: string;
    price: number;
    image?: string;
    description?: string;
    rating?: number;
    features?: string[];
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

export interface DateRange {
    checkIn: string;
    checkOut: string;
}

export interface DateValidation {
    isValid: boolean;
    errors: string[];
    nights: number;
}

export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'outlineSecondary' | 'ghost' | 'join' | 'signIn' | 'location';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    style?: React.CSSProperties;
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'flat' | 'bordered';
}