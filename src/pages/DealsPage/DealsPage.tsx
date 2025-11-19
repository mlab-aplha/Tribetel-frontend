import React from 'react';
import { useNavigate } from 'react-router-dom';
import Deals from '@components/features/deals/Deals';
import { Deal } from '@components/types/vacation';
import styles from './DealsPage.module.css';

const DealsPage: React.FC = () => {
    const navigate = useNavigate();

    const handleDealClick = (deal: Deal) => {
        console.log('Deal selected:', deal);
        // Navigate to vacations page or apply deal
        navigate('/vacations');
    };

    const handleViewAllDeals = () => {
        console.log('View all deals clicked');
    };

    return (
        <div className={styles.dealsPage}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Special Deals & Offers</h1>
                <p className={styles.pageSubtitle}>
                    Limited time offers and exclusive discounts for your next getaway
                </p>
            </div>

            <Deals
                title="Current Promotions"
                subtitle="Take advantage of these amazing deals before they're gone"
                onDealClick={handleDealClick}
                onViewAll={handleViewAllDeals}
            />
        </div>
    );
};

export default DealsPage;