import React from 'react';
import styles from './Showcase.module.css';

// Import images
import showcase1 from '../../../assets/showcase1.png';
import showcase2 from '../../../assets/showcase2.png';
import showcase3 from '../../../assets/showcase3.png';

interface Room {
    id: number;
    title: string;
    price: number;
    image?: string;
    description?: string;
}

interface ShowcaseProps {
    title?: string;
    rooms?: Room[];
    backgroundColor?: string;
    onRoomClick?: (room: Room) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({
    title = "Our best places - on offer",
    rooms = [],
    backgroundColor = "#FDC959", // Using direct color value
    onRoomClick
}) => {
    // Default rooms if none provided
    const defaultRooms: Room[] = [
        {
            id: 1,
            title: "Luxury Suite",
            price: 299,
            image: showcase1,
            description: "Premium accommodation with exclusive amenities"
        },
        {
            id: 2,
            title: "Business Class",
            price: 199,
            image: showcase2,
            description: "Perfect for corporate travelers"
        },
        {
            id: 3,
            title: "Family Room",
            price: 249,
            image: showcase3,
            description: "Spacious family comfort"
        }
    ];

    const displayRooms = rooms.length > 0 ? rooms : defaultRooms;

    return (
        <section
            className={styles.showcaseSection}
            style={{ backgroundColor }}
        >
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{title}</h2>
            </div>

            <div className={styles.showcaseGrid}>
                {displayRooms.map((room) => (
                    <div
                        key={room.id}
                        className={styles.roomCard}
                        onClick={() => onRoomClick?.(room)}
                    >
                        <img
                            src={room.image}
                            alt={room.title}
                            className={styles.roomImage}
                        />
                        <div className={styles.roomOverlay} />
                        <div className={styles.roomInfo}>
                            <h3 className={styles.roomTitle}>{room.title}</h3>
                            <p className={styles.roomDescription}>{room.description}</p>
                            <div className={styles.roomPrice}>R{room.price}/night</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Showcase;