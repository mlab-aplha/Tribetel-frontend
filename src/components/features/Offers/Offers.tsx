import React from 'react';
import styles from './Offers.module.css';

// Import images from src/assets
import service1 from '../../../assets/8.png';
import service2 from '../../../assets/54.png';
import service3 from '../../../assets/5.png';

interface Offer {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    isNew?: boolean;
}

interface OffersProps {
    offers?: Offer[];
}

const Offers: React.FC<OffersProps> = ({
    offers = [
        {
            id: 1,
            title: "Relaxing Vacay",
            description: "Price: R0.00 - exclusive mem.",
            price: "R0.00",
            imageUrl: service1, // Use imported image
            isNew: false
        },
        {
            id: 2,
            title: "Custom Menu",
            description: "*For all new members",
            price: "Special Offer",
            imageUrl: service2, // Use imported image
            isNew: true
        },
        {
            id: 3,
            title: "Tribtel Hopping",
            description: "All inclusive trip - country wide",
            price: "All Inclusive",
            imageUrl: service3, // Use imported image
            isNew: false
        }
    ]
}) => {
    const handleViewOffer = (offerId: number) => {
        console.log(`Viewing offer ${offerId}`);
        // Add your navigation or modal logic here
    };

    return (
        <div className={styles.offersSection}>
            <div className={styles.container}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Personalised Offers</h2>
                    <p className={styles.sectionSubtitle}>Exclusive deals tailored just for you</p>
                </header>

                <div className={styles.offersGrid}>
                    {offers.map((offer) => (
                        <div key={offer.id} className={styles.offerCard}>
                            <div className={styles.cardImage}>
                                <img
                                    src={offer.imageUrl}
                                    alt={offer.title}
                                    className={styles.offerImage}
                                    loading="lazy"

                                />
                                <div className={styles.imageOverlay} />
                                {offer.isNew && (
                                    <div className={styles.newBadge}>
                                        <span>New</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.offerTitle}>{offer.title}</h3>
                                <p className={styles.offerDescription}>{offer.description}</p>
                                <div className={styles.offerPrice}>{offer.price}</div>
                                <button
                                    className={styles.ctaButton}
                                    onClick={() => handleViewOffer(offer.id)}
                                    aria-label={`View ${offer.title} offer`}
                                >
                                    View Offer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Offers;