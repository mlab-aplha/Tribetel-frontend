import React from 'react';
import { InputProps } from '@types/common';
import styles from './Input.module.css';

const Input: React.FC<InputProps> = ({
    type = 'text',
    value,
    onChange,
    placeholder = '',
    label,
    id,
    required = false,
    maxLength,
    rows = 3,
    className = '',
    error,
    disabled = false,
    options = []
}) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const hasError = !!error;

    const renderInput = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    id={inputId}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${styles.textarea} ${hasError ? styles.error : ''} ${disabled ? styles.disabled : ''} ${className}`}
                    placeholder={placeholder}
                    required={required}
                    maxLength={maxLength}
                    rows={rows}
                    disabled={disabled}
                />
            );
        } else if (type === 'select') {
            return (
                <div className={styles.selectWrapper}>
                    <select
                        id={inputId}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={`${styles.input} ${hasError ? styles.error : ''} ${disabled ? styles.disabled : ''} ${className}`}
                        required={required}
                        disabled={disabled}
                    >
                        <option value="" disabled>{placeholder}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            );
        } else {
            return (
                <input
                    type={type}
                    id={inputId}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${styles.input} ${hasError ? styles.error : ''} ${disabled ? styles.disabled : ''} ${className}`}
                    placeholder={placeholder}
                    required={required}
                    maxLength={maxLength}
                    disabled={disabled}
                />
            );
        }
    };

    return (
        <div className={styles.formGroup}>
            {label && (
                <label htmlFor={inputId} className={`${styles.formLabel} ${hasError ? styles.error : ''}`}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            {renderInput()}
            {hasError && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}
            {type === 'textarea' && maxLength && (
                <div className={styles.charCount}>
                    {value.length}/{maxLength} characters
                </div>
            )}
        </div>
    );
};

export default Input;

