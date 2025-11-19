import React from 'react';
import { useNavigate } from 'react-router-dom';
import Vacations from '@components/features/vacations/Vacations';
import Deals from '@components/features/deals/Deals';
import { VacationPackage, Deal } from '@components/types/vacation';
import styles from './VacationsPage.module.css';

const VacationsPage: React.FC = () => {
    const navigate = useNavigate();

    const handleVacationClick = (vacation: VacationPackage) => {
        console.log('Vacation selected:', vacation);
        navigate(`/booking?package=${vacation.id}`);
    };

    const handleDealClick = (deal: Deal) => {
        console.log('Deal selected:', deal);
    };

    const handleViewAllVacations = () => {
        console.log('View all vacations clicked');
    };

    const handleViewAllDeals = () => {
        console.log('View all deals clicked');
    };

    return (
        <div className={styles.vacationsPage}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Vacations & Packages</h1>
                <p className={styles.pageSubtitle}>
                    Discover unforgettable experiences with our carefully curated vacation packages
                </p>
            </div>

            <Vacations
                onVacationClick={handleVacationClick}
                onViewAll={handleViewAllVacations}
            />

            <Deals
                onDealClick={handleDealClick}
                onViewAll={handleViewAllDeals}
            />
        </div>
    );
};

export default VacationsPage;