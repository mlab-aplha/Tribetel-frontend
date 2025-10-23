// Button component - filled + outlined styles, small|medium|large sizes

import React from 'react';
import './button.module.css';

export type buttonVariant = 'filled' | 'outlined';
export type buttonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: buttonVariant;
    size?: buttonSize;
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'filled',
    size = 'medium',
    children,
    ...rest
}) => {
    const className = `button ${variant} ${size}`;
    return (
        <button className={className} {...rest}>
            {children}
        </button>
    );
};