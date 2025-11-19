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