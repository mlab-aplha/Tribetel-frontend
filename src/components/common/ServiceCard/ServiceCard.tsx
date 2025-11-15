import React from 'react';
import { ServiceCardProps } from '@components/types/common';
import styles from './ServiceCard.module.css';
import Button from '../Button/Button';

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    price,
    imageUrl,
    isNew = false,
    onViewOffer
}) => {
    return (
        <div className={styles.serviceCard}>
            <div className={styles.cardImage}>
                <img
                    src={imageUrl}
                    alt={title}
                    className={styles.serviceImage}
                    loading="lazy"
                />
                <div className={styles.imageOverlay} />
                {isNew && (
                    <div className={styles.newBadge}>
                        <span>New</span>
                    </div>
                )}
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.serviceTitle}>{title}</h3>
                <p className={styles.serviceDescription}>{description}</p>
                <div className={styles.servicePrice}>{price}</div>
                <Button
                    variant="primary"
                    size="medium"
                    onClick={onViewOffer}
                    aria-label={`View ${title} offer`}
                >
                    View Offer
                </Button>
            </div>
        </div>
    );
};

export default ServiceCard;


