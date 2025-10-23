import React from 'react';
import styles from './ServiceSection.module.css';

// Import images
import service1 from '../../../assets/service1.png';
import service2 from '../../../assets/service2.png';
import service3 from '../../../assets/service3.png';

interface Service {
    id: number;
    title: string;
    description: string;
    image?: string;
}

const ServicesSection: React.FC = () => {
    const services: Service[] = [
        {
            id: 1,
            title: "Luxury Suites",
            description: "Premium accommodation with exclusive amenities",
            image: service1
        },
        {
            id: 2,
            title: "Business Class",
            description: "Perfect for corporate travelers and meetings",
            image: service2
        },
        {
            id: 3,
            title: "Family Rooms",
            description: "Spacious rooms designed for family comfort",
            image: service3
        }
    ];

    const handleServiceClick = (service: Service) => {
        console.log('Service clicked:', service);
    };

    return (
        <section className={styles.servicesSection}>
            <div className={styles.servicesContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        Find the perfect stay for every trip
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Great places to stay, handpicked for you
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={styles.serviceCard}
                            onClick={() => handleServiceClick(service)}
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className={styles.serviceImage}
                            />
                            <div className={styles.serviceOverlay} />
                            <div className={styles.serviceInfo}>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDescription}>{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;