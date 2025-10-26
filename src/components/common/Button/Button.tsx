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
}) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;