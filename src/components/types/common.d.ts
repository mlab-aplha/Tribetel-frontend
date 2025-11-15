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