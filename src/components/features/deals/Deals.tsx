import React, { useState } from 'react';
import Button from '@components/common/Button/Button';
import styles from './Deals.module.css';
import { Deal } from '@components/types/vacation';

interface DealsProps {
    title?: string;
    subtitle?: string;
    deals?: Deal[];
    backgroundColor?: string;
    onDealClick?: (deal: Deal) => void;
    onViewAll?: () => void;
}

const Deals: React.FC<DealsProps> = ({
    title = "Special Deals & Offers",
    subtitle = "Limited time offers for your next vacation",
    deals = [],
    backgroundColor = "#470F51",
    onDealClick,
    onViewAll
}) => {
    const defaultDeals: Deal[] = [
        {
            id: 1,
            title: "Early Bird Special",
            description: "Book 60 days in advance and get exclusive discounts",
            discountPercentage: 25,
            code: "EARLY25",
            validUntil: "2024-12-31",
            applicablePackages: [1, 2, 3],
            isActive: true,
            image: "/api/placeholder/400/200"
        },
        {
            id: 2,
            title: "Family Package Deal",
            description: "Special rates for family bookings with extra amenities",
            discountPercentage: 30,
            code: "FAMILY30",
            validUntil: "2024-11-15",
            applicablePackages: [1, 3],
            isActive: true,
            image: "/api/placeholder/400/200"
        },
        {
            id: 3,
            title: "Last Minute Getaway",
            description: "Spontaneous trip? Get great deals for last-minute bookings",
            discountPercentage: 20,
            validUntil: "2024-10-30",
            applicablePackages: [2, 3],
            isActive: true,
            image: "/api/placeholder/400/200"
        }
    ];

    const displayDeals = deals.length > 0 ? deals : defaultDeals;
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const isDealExpired = (validUntil: string) => {
        return new Date(validUntil) < new Date();
    };

    return (
        <section
            className={styles.dealsSection}
            style={{ backgroundColor }}
            id="special-deals"
        >
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{title}</h2>
                    {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
                </div>

                <div className={styles.dealsGrid}>
                    {displayDeals.map((deal) => {
                        const expired = isDealExpired(deal.validUntil);

                        return (
                            <article
                                key={deal.id}
                                className={`${styles.dealCard} ${expired ? styles.expired : ''}`}
                                onClick={() => !expired && onDealClick?.(deal)}
                            >
                                {expired && (
                                    <div className={styles.expiredOverlay}>
                                        <span>Expired</span>
                                    </div>
                                )}

                                <div className={styles.dealBadge}>
                                    {deal.discountPercentage}% OFF
                                </div>

                                <div className={styles.imageContainer}>
                                    <img
                                        src={deal.image}
                                        alt={deal.title}
                                        className={styles.dealImage}
                                        loading="lazy"
                                    />
                                    <div className={styles.dealOverlay} />
                                </div>

                                <div className={styles.dealInfo}>
                                    <h3 className={styles.dealTitle}>{deal.title}</h3>
                                    <p className={styles.dealDescription}>{deal.description}</p>

                                    {deal.code && (
                                        <div className={styles.codeSection}>
                                            <div className={styles.codeLabel}>Promo Code:</div>
                                            <div className={styles.codeContainer}>
                                                <span className={styles.code}>{deal.code}</span>
                                                <button
                                                    className={styles.copyButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopyCode(deal.code!);
                                                    }}
                                                    disabled={expired}
                                                >
                                                    {copiedCode === deal.code ? 'Copied!' : 'Copy'}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className={styles.dealFooter}>
                                        <div className={styles.validity}>
                                            Valid until: {new Date(deal.validUntil).toLocaleDateString()}
                                        </div>

                                        <Button
                                            variant="primary"
                                            size="small"
                                            className={styles.claimButton}
                                            disabled={expired}
                                        >
                                            {expired ? 'Expired' : 'Claim Offer'}
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {onViewAll && (
                    <div className={styles.viewAllSection}>
                        <Button
                            variant="outline"
                            size="large"
                            onClick={onViewAll}
                            className={styles.viewAllButton}
                        >
                            View All Deals
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Deals;