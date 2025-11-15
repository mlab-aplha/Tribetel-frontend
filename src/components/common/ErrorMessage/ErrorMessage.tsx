import React from 'react';
import { ErrorMessageProps } from '@components/types/common';
import styles from './ErrorMessage.module.css';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    variant = 'error',
    size = 'medium',
    dismissible = false,
    onDismiss,
    className = '',
    fullWidth = false,
}) => {
    const getIcon = () => {
        switch (variant) {
            case 'error':
                return (
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                );
            case 'success':
                return (
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const containerClasses = [
        styles.errorContainer,
        styles[variant],
        styles[size],
        dismissible ? styles.withClose : '',
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} role="alert">
            {getIcon()}
            <span className={styles.message}>{message}</span>
            {dismissible && (
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onDismiss}
                    aria-label="Dismiss error message"
                >
                    <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;


