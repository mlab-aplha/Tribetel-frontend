import React from 'react';
import { ButtonProps } from '../../types/common';
import styles from './Button.module.css';

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    fullWidth = false,
    style = {}, // Add style prop
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        disabled ? styles.disabled : '',
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;