import { ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
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
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'flat' | 'bordered';
}

export interface ErrorMessageProps {
    message: string;
    variant?: 'error' | 'warning' | 'info' | 'success';
    size?: 'small' | 'medium' | 'large';
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
    fullWidth?: boolean;
}

export interface LoaderProps {
    type?: 'spinner' | 'dots';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    text?: string;
    overlay?: boolean;
    fullscreen?: boolean;
    inline?: boolean;
    className?: string;
}

export interface InputProps {
    type?: 'text' | 'email' | 'password' | 'textarea' | 'select';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    id?: string;
    required?: boolean;
    maxLength?: number;
    rows?: number;
    className?: string;
    error?: string;
    disabled?: boolean;
    options?: { value: string; label: string }[];
}

export interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    className?: string;
}

export interface RoomCardProps {
    title?: string;
    price?: string;
    imageUrl?: string;
    description?: string;
    className?: string;
    onClick?: () => void;
}

export interface ServiceCardProps {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    isNew?: boolean;
    onViewOffer?: () => void;
}

export interface PageDescriptionProps {
    title: string;
    description: string;
    backgroundImage?: string;
    overlayColor?: string;
    textColor?: string;
    accentColor?: string;
    height?: string;
    reverseLayout?: boolean;
}

export interface FormErrors {
    [key: string]: string;
}

export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
}