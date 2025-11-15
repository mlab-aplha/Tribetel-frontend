import React from 'react';
import { CardProps } from '../../types/common';
import styles from './Card.module.css';

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`${styles.card} ${className}`}>
            {children}
        </div>
    );
};

export default Card;