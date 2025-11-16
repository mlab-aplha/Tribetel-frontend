// components/Showcase/Showcase.tsx
import React from 'react';
import Button from '@components/common/Button/Button';
import styles from './Showcase.module.css';

import showcase1 from '@/assets/showcase1.png';
import showcase2 from '@/assets/showcase2.png';
import showcase3 from '@/assets/showcase3.png';

interface Room {
    id: number;
    title: string;
    price: number;
    image?: string;
    description?: string;
    rating?: number;
    features?: string[];
}

interface ShowcaseProps {
    title?: string;
    subtitle?: string;
    rooms?: Room[];
    backgroundColor?: string;
    onRoomClick?: (room: Room) => void;
    onViewAll?: () => void;
}

const Showcase: React.FC<ShowcaseProps> = ({
    title = "Our best places - on offer",
    subtitle = "Handpicked luxury accommodations for your perfect stay",
    rooms = [],
    backgroundColor = "#FDC959",
    onRoomClick,
    onViewAll
}) => {
    const defaultRooms: Room[] = [
        {
            id: 1,
            title: "Luxury Suite",
            price: 299,
            image: showcase1,
            description: "Premium accommodation with exclusive amenities",
            rating: 4.9,
            features: ["Sea View", "Free Breakfast", "Spa Access"]
        },
        {
            id: 2,
            title: "Business Class",
            price: 199,
            image: showcase2,
            description: "Perfect for corporate travelers",
            rating: 4.7,
            features: ["Work Desk", "High-speed WiFi", "Meeting Room Access"]
        },
        {
            id: 3,
            title: "Family Room",
            price: 249,
            image: showcase3,
            description: "Spacious family comfort",
            rating: 4.8,
            features: ["Connecting Rooms", "Kids Club", "Family Activities"]
        }
    ];

    const displayRooms = rooms.length > 0 ? rooms : defaultRooms;

    return (
        <section
            className={styles.showcaseSection}
            style={{ backgroundColor }}
            id="rooms-showcase"
        >
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{title}</h2>
                    {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
                </div>

                <div className={styles.showcaseGrid}>
                    {displayRooms.map((room) => (
                        <article
                            key={room.id}
                            className={styles.roomCard}
                            onClick={() => onRoomClick?.(room)}
                        >
                            <div className={styles.imageContainer}>
                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className={styles.roomImage}
                                    loading="lazy"
                                />
                                {room.rating && (
                                    <div className={styles.ratingBadge}>
                                        {room.rating}
                                    </div>
                                )}
                                <div className={styles.roomOverlay} />
                            </div>
                            <div className={styles.roomInfo}>
                                <h3 className={styles.roomTitle}>{room.title}</h3>
                                <p className={styles.roomDescription}>{room.description}</p>

                                {room.features && (
                                    <div className={styles.roomFeatures}>
                                        {room.features.slice(0, 2).map((feature, index) => (
                                            <span key={index} className={styles.featureTag}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className={styles.roomFooter}>
                                    <div className={styles.roomPrice}>
                                        <span className={styles.priceAmount}>R{room.price}</span>
                                        <span className={styles.pricePeriod}>/night</span>
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="small"
                                        className={styles.bookButton}
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {onViewAll && (
                    <div className={styles.viewAllSection}>
                        <Button
                            variant="outline"
                            size="large"
                            onClick={onViewAll}
                            className={styles.viewAllButton}
                        >
                            View All Rooms
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Showcase;