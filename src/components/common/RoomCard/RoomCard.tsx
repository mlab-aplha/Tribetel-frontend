import React from 'react';
import { RoomCardProps } from '../../types/common';
import styles from './RoomCard.module.css';

const RoomCard: React.FC<RoomCardProps> = ({
    title = "Room Type",
    price = "R0.00",
    imageUrl,
    description,
    className = "",
    onClick
}) => {
    return (
        <div className={`${styles.roomCard} ${className}`} onClick={onClick}>
            <div className={styles.imageContainer}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className={styles.roomImage}
                    />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <div className={styles.decorativeSquare}></div>
                        <div className={styles.decorativeCircle}></div>
                    </div>
                )}
                <div className={styles.gradientOverlay}>
                    <div className={styles.roomInfo}>
                        <h3 className={styles.roomTitle}>{title}</h3>
                        <div className={styles.roomPrice}>Price: {price}</div>
                        {description && (
                            <p className={styles.roomDescription}>{description}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;