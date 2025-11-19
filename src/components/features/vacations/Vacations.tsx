import React from 'react';
import Button from '@components/common/Button/Button';
import styles from './Vacations.module.css';
import { VacationPackage } from '@components/types/vacation';

interface VacationsProps {
    title?: string;
    subtitle?: string;
    vacations?: VacationPackage[];
    backgroundColor?: string;
    onVacationClick?: (vacation: VacationPackage) => void;
    onViewAll?: () => void;
}

const Vacations: React.FC<VacationsProps> = ({
    title = "Vacation Packages",
    subtitle = "Discover amazing getaways at unbeatable prices",
    vacations = [],
    backgroundColor = "#F8F9FA",
    onVacationClick,
    onViewAll
}) => {
    const defaultVacations: VacationPackage[] = [
        {
            id: 1,
            title: "Cape Town Luxury Escape",
            description: "5-day luxury experience in the Mother City with Table Mountain and wine lands",
            price: 899,
            originalPrice: 1099,
            discount: 18,
            duration: "5 Days / 4 Nights",
            location: "Cape Town",
            image: "/api/placeholder/400/300",
            rating: 4.9,
            features: ["Table Mountain", "Wine Tasting", "V&A Waterfront"],
            includes: ["Hotel", "Breakfast", "Cable Car Ticket", "Airport Transfers"],
            tags: ["Luxury", "City", "Wine"],
            isFeatured: true,
            validUntil: "2025-12-31"
        },
        {
            id: 2,
            title: "Kruger National Park Safari",
            description: "4-day authentic safari experience with Big 5 game viewing",
            price: 1299,
            originalPrice: 1499,
            discount: 13,
            duration: "4 Days / 3 Nights",
            location: "Kruger National Park",
            image: "/api/placeholder/400/300",
            rating: 4.8,
            features: ["Big 5 Safari", "Game Drives", "Bush Walks"],
            includes: ["Lodge Accommodation", "All Meals", "Game Drives", "Professional Guide"],
            tags: ["Safari", "Wildlife", "Adventure"],
            isFeatured: true,
            validUntil: "2025-11-30"
        },
        {
            id: 3,
            title: "Garden Route Adventure",
            description: "7-day scenic coastal drive with stops at beautiful towns and attractions",
            price: 1599,
            originalPrice: 1899,
            discount: 16,
            duration: "7 Days / 6 Nights",
            location: "Garden Route",
            image: "/api/placeholder/400/300",
            rating: 4.7,
            features: ["Tsitsikamma Forest", "Knysna Heads", "Ostrich Farm"],
            includes: ["Hotels", "Breakfast", "Car Rental", "Activity Vouchers"],
            tags: ["Coastal", "Scenic", "Road Trip"],
            validUntil: "2025-12-15"
        },
        {
            id: 4,
            title: "Durban Beach Holiday",
            description: "5-day tropical beach vacation with cultural experiences",
            price: 699,
            originalPrice: 849,
            discount: 18,
            duration: "5 Days / 4 Nights",
            location: "Durban",
            image: "/api/placeholder/400/300",
            rating: 4.6,
            features: ["Golden Mile", "Ushaka Marine", "Indian Cuisine"],
            includes: ["Beachfront Hotel", "Breakfast", "Ushaka Ticket", "City Tour"],
            tags: ["Beach", "Cultural", "Family"],
            isFeatured: true,
            validUntil: "2025-10-31"
        },
        {
            id: 5,
            title: "Winelands Luxury Retreat",
            description: "3-day premium wine tasting experience in Stellenbosch and Franschhoek",
            price: 549,
            originalPrice: 699,
            discount: 21,
            duration: "3 Days / 2 Nights",
            location: "Stellenbosch",
            image: "/api/placeholder/400/300",
            rating: 4.9,
            features: ["Wine Tasting", "Gourmet Dining", "Vineyard Tours"],
            includes: ["Boutique Hotel", "All Meals", "Wine Tastings", "Wine Tram"],
            tags: ["Wine", "Luxury", "Gourmet"],
            validUntil: "2025-11-20"
        },
        {
            id: 6,
            title: "Johannesburg Cultural Tour",
            description: "4-day exploration of South Africa's economic hub with historical sites",
            price: 499,
            originalPrice: 599,
            discount: 17,
            duration: "4 Days / 3 Nights",
            location: "Johannesburg",
            image: "/api/placeholder/400/300",
            rating: 4.5,
            features: ["Apartheid Museum", "Soweto Tour", "Constitution Hill"],
            includes: ["Hotel", "Breakfast", "Museum Entries", "Guided Tours"],
            tags: ["Cultural", "Historical", "City"],
            validUntil: "2024-12-20"
        },
        {
            id: 7,
            title: "Sun City Luxury Resort",
            description: "4-day all-inclusive stay at Africa's premier entertainment resort",
            price: 1199,
            originalPrice: 1399,
            discount: 14,
            duration: "4 Days / 3 Nights",
            location: "Sun City",
            image: "/api/placeholder/400/300",
            rating: 4.7,
            features: ["Casino", "Water Park", "Golf Course", "Shows"],
            includes: ["Resort Accommodation", "All Meals", "Activity Pass", "Entertainment"],
            tags: ["Luxury", "Entertainment", "All Inclusive"],
            isFeatured: true,
            validUntil: "2025-11-15"
        },
        {
            id: 8,
            title: "Wild Coast Hiking Adventure",
            description: "6-day guided hiking tour along the pristine Wild Coast",
            price: 799,
            originalPrice: 949,
            discount: 16,
            duration: "6 Days / 5 Nights",
            location: "Wild Coast",
            image: "/api/placeholder/400/300",
            rating: 4.6,
            features: ["Coastal Hiking", "Traditional Villages", "Hole in the Wall"],
            includes: ["Lodges", "All Meals", "Guide", "Support Vehicle"],
            tags: ["Adventure", "Hiking", "Nature"],
            validUntil: "2025-10-25"
        },
        {
            id: 9,
            title: "Shark Cage Diving Experience",
            description: "2-day adrenaline-packed adventure in Gansbaai",
            price: 399,
            originalPrice: 499,
            discount: 20,
            duration: "2 Days / 1 Night",
            location: "Gansbaai",
            image: "/api/placeholder/400/300",
            rating: 4.8,
            features: ["Shark Cage Diving", "Marine Life", "Coastal Views"],
            includes: ["Accommodation", "Breakfast", "Cage Diving", "Equipment"],
            tags: ["Adventure", "Marine", "Thrilling"],
            isFeatured: true,
            validUntil: "2025-12-10"
        },
        {
            id: 10,
            title: "Blyde River Canyon Nature Tour",
            description: "3-day exploration of one of the world's largest canyons",
            price: 449,
            originalPrice: 549,
            discount: 18,
            duration: "3 Days / 2 Nights",
            location: "Mpumalanga",
            image: "/api/placeholder/400/300",
            rating: 4.7,
            features: ["Three Rondavels", "God's Window", "Bourke's Luck Potholes"],
            includes: ["Lodge", "Breakfast", "Park Fees", "Guide"],
            tags: ["Nature", "Scenic", "Photography"],
            validUntil: "2025-11-30"
        },
        {
            id: 11,
            title: "Eastern Cape Malaria-Free Safari",
            description: "5-day family-friendly safari in malaria-free game reserves",
            price: 1099,
            originalPrice: 1299,
            discount: 15,
            duration: "5 Days / 4 Nights",
            location: "Eastern Cape",
            image: "/api/placeholder/400/300",
            rating: 4.6,
            features: ["Malaria-Free", "Big 5", "Family Friendly", "Game Drives"],
            includes: ["Lodge", "All Meals", "Game Drives", "Family Activities"],
            tags: ["Safari", "Family", "Malaria-Free"],
            validUntil: "2025-12-25"
        },
        {
            id: 12,
            title: "Cape Peninsula Ultimate Tour",
            description: "Full-day tour covering Cape Point, Penguins, and Chapman's Peak",
            price: 199,
            originalPrice: 249,
            discount: 20,
            duration: "1 Day",
            location: "Cape Peninsula",
            image: "/api/placeholder/400/300",
            rating: 4.9,
            features: ["Cape Point", "Boulders Beach", "Chapman's Peak Drive"],
            includes: ["Transport", "Guide", "Park Entries", "Lunch"],
            tags: ["Day Tour", "Scenic", "Coastal"],
            isFeatured: true,
            validUntil: "2025-12-31"
        }
    ];

    const displayVacations = vacations.length > 0 ? vacations : defaultVacations;

    const calculateSavings = (original: number, current: number) => {
        return original - current;
    };

    return (
        <section
            className={styles.vacationsSection}
            style={{ backgroundColor }}
            id="vacations-packages"
        >
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{title}</h2>
                    {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
                </div>

                <div className={styles.vacationsGrid}>
                    {displayVacations.map((vacation) => (
                        <article
                            key={vacation.id}
                            className={`${styles.vacationCard} ${vacation.isFeatured ? styles.featured : ''}`}
                            onClick={() => onVacationClick?.(vacation)}
                        >
                            {vacation.isFeatured && (
                                <div className={styles.featuredBadge}>Featured</div>
                            )}

                            {vacation.discount && (
                                <div className={styles.discountBadge}>
                                    Save {vacation.discount}%
                                </div>
                            )}

                            <div className={styles.imageContainer}>
                                <img
                                    src={vacation.image}
                                    alt={vacation.title}
                                    className={styles.vacationImage}
                                    loading="lazy"
                                />
                                {vacation.rating && (
                                    <div className={styles.ratingBadge}>
                                        ⭐ {vacation.rating}
                                    </div>
                                )}
                                <div className={styles.vacationOverlay} />
                            </div>

                            <div className={styles.vacationInfo}>
                                <div className={styles.locationTag}>
                                    {vacation.location}
                                </div>

                                <h3 className={styles.vacationTitle}>{vacation.title}</h3>
                                <p className={styles.vacationDescription}>{vacation.description}</p>

                                <div className={styles.duration}>
                                    {vacation.duration}
                                </div>

                                <div className={styles.features}>
                                    {vacation.features.slice(0, 3).map((feature, index) => (
                                        <span key={index} className={styles.featureTag}>
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.includes}>
                                    <strong>Includes:</strong> {vacation.includes.join(', ')}
                                </div>

                                <div className={styles.vacationFooter}>
                                    <div className={styles.pricing}>
                                        {vacation.originalPrice && (
                                            <div className={styles.originalPrice}>
                                                R{vacation.originalPrice}
                                            </div>
                                        )}
                                        <div className={styles.currentPrice}>
                                            R{vacation.price}
                                        </div>
                                        {vacation.originalPrice && (
                                            <div className={styles.savings}>
                                                Save R{calculateSavings(vacation.originalPrice, vacation.price)}
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        variant="primary"
                                        size="small"
                                        className={styles.bookButton}
                                    >
                                        Book Now
                                    </Button>
                                </div>

                                {vacation.validUntil && (
                                    <div className={styles.validUntil}>
                                        Offer valid until: {new Date(vacation.validUntil).toLocaleDateString()}
                                    </div>
                                )}
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
                            View All Vacations
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Vacations;