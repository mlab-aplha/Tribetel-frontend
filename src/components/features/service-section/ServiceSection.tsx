// components/ServicesSection/ServicesSection.tsx
import React from 'react';
import Button from '@components/common/Button/Button';
import styles from './ServicesSection.module.css';

import service1 from '@/assets/service1.png';
import service2 from '@/assets/service2.png';
import service3 from '@/assets/service3.png';

interface Service {
    id: number;
    title: string;
    description: string;
    image?: string;
    features?: string[];
    price?: number;
}

interface ServicesSectionProps {
    onServiceClick?: (service: Service) => void;
    onExploreAll?: () => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
    onServiceClick,
    onExploreAll
}) => {
    const services: Service[] = [
        {
            id: 1,
            title: "Luxury Suites",
            description: "Premium accommodation with exclusive amenities and personalized service",
            image: service1,
            features: ["Private Butler", "Ocean View", "Luxury Spa", "Fine Dining"],
            price: 299
        },
        {
            id: 2,
            title: "Business Class",
            description: "Perfect for corporate travelers with dedicated workspaces and meeting facilities",
            image: service2,
            features: ["24/7 Business Center", "High-speed WiFi", "Meeting Rooms", "Executive Lounge"],
            price: 199
        },
        {
            id: 3,
            title: "Family Rooms",
            description: "Spacious rooms designed for family comfort with kid-friendly amenities",
            image: service3,
            features: ["Connecting Rooms", "Kids Club", "Family Pool", "Childcare Services"],
            price: 249
        }
    ];

    const handleServiceClick = (service: Service) => {
        console.log('Service clicked:', service);
        onServiceClick?.(service);
    };

    return (
        <section className={styles.servicesSection} id="services">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Find the perfect stay for every trip
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Great places to stay, handpicked for you with exceptional amenities and service
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service) => (
                        <article
                            key={service.id}
                            className={styles.serviceCard}
                            onClick={() => handleServiceClick(service)}
                        >
                            <div className={styles.imageContainer}>
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className={styles.serviceImage}
                                    loading="lazy"
                                />
                                <div className={styles.serviceOverlay} />
                                {service.price && (
                                    <div className={styles.priceBadge}>
                                        From R{service.price}
                                    </div>
                                )}
                            </div>
                            <div className={styles.serviceInfo}>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDescription}>{service.description}</p>
                                
                                {service.features && (
                                    <div className={styles.featuresList}>
                                        {service.features.map((feature, index) => (
                                            <div key={index} className={styles.featureItem}>
                                                <span className={styles.featureIcon}>✓</span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <Button
                                    variant="secondary"
                                    size="small"
                                    className={styles.exploreButton}
                                >
                                    Explore Options
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>

                {onExploreAll && (
                    <div className={styles.exploreAllSection}>
                        <Button
                            variant="outlineSecondary"
                            size="large"
                            onClick={onExploreAll}
                            className={styles.exploreAllButton}
                        >
                            Explore All Services
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesSection;