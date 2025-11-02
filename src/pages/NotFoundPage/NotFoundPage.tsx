import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import Button from '../../components/common/Button/Button';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* Animated 404 Number */}
                <div className={styles.errorNumber}>
                    <span className={styles.number}>4</span>
                    <span className={styles.number}>0</span>
                    <span className={styles.number}>4</span>
                </div>

                {/* Main Message */}
                <div className={styles.message}>
                    <h1 className={styles.title}>Page Not Found</h1>
                    <p className={styles.description}>
                        Oops! The page you're looking for seems to have wandered off into the digital wilderness.
                        It might have been moved, deleted, or perhaps it never existed in the first place.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                    <Button
                        variant="primary"
                        size="large"
                        onClick={handleGoHome}
                        className={styles.primaryButton}
                    >
                        Go Home
                    </Button>
                    <Button
                        variant="secondary"
                        size="large"
                        onClick={handleGoBack}
                        className={styles.secondaryButton}
                    >
                        Go Back
                    </Button>
                    <Link to="/contact" className={styles.contactLink}>
                        Contact Support
                    </Link>
                </div>

                {/* Quick Links */}
                <div className={styles.quickLinks}>
                    <h3 className={styles.quickLinksTitle}>Quick Links</h3>
                    <div className={styles.linksGrid}>
                        <Link to="/rooms" className={styles.quickLink}>
                            Browse Rooms
                        </Link>
                        <Link to="/bookings" className={styles.quickLink}>
                            My Bookings
                        </Link>
                        <Link to="/about" className={styles.quickLink}>
                            About Us
                        </Link>
                        <Link to="/help" className={styles.quickLink}>
                            Help Center
                        </Link>
                    </div>
                </div>


            </div>

            {/* Background Pattern */}
            <div className={styles.backgroundPattern}>
                <div className={styles.patternCircle}></div>
                <div className={styles.patternCircle}></div>
                <div className={styles.patternCircle}></div>
            </div>
        </div>
    );
};

export default NotFoundPage;