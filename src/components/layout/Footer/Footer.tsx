import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.style.display = 'none';
        const fallback = target.nextElementSibling as HTMLElement;
        if (fallback) {
            fallback.style.display = 'flex';
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.logoSection}>
                    <div className={styles.logoContainer}>
                        <img
                            src="/src/assets/logo-.svg"
                            alt="Tribtel Logo"
                            className={styles.logoImage}
                            onError={handleLogoError}
                        />
                        <div className={styles.logoFallback}>
                            <div className={styles.logoIcon}></div>
                            <span className={styles.logoText}>TRIBEL</span>
                        </div>
                    </div>

                    <div className={styles.socialMedia}>
                        <a href="https://facebook.com" className={styles.socialLink} aria-label="Facebook">
                            <span className={styles.socialIcon}>F</span>
                        </a>
                        <a href="https://twitter.com" className={styles.socialLink} aria-label="Twitter">
                            <span className={styles.socialIcon}>T</span>
                        </a>
                        <a href="https://instagram.com" className={styles.socialLink} aria-label="Instagram">
                            <span className={styles.socialIcon}>I</span>
                        </a>
                        <a href="https://linkedin.com" className={styles.socialLink} aria-label="LinkedIn">
                            <span className={styles.socialIcon}>L</span>
                        </a>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>Quick Links</div>
                    </div>
                    <div className={styles.linkList}>
                        <div className={styles.footerLink}>
                            <Link to="/" className={styles.linkText}>Home</Link>
                        </div>
                        <div className={styles.footerLink}>
                            <Link to="/rooms" className={styles.linkText}>Rooms & Suites</Link>
                        </div>
                        <div className={styles.footerLink}>
                            <Link to="/about" className={styles.linkText}>About Us</Link>
                        </div>
                        <div className={styles.footerLink}>
                            <Link to="/contact" className={styles.linkText}>Contact</Link>
                        </div>
                        <div className={styles.footerLink}>
                            <Link to="/booking" className={styles.linkText}>Book Now</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>Hotel Services</div>
                    </div>
                    <div className={styles.linkList}>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Spa & Wellness</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Restaurant</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Conference Rooms</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Swimming Pool</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Fitness Center</div>
                        </div>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>Support</div>
                    </div>
                    <div className={styles.linkList}>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>FAQ</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Booking Policies</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Cancellation</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Privacy Policy</div>
                        </div>
                        <div className={styles.footerLink}>
                            <div className={styles.linkText}>Terms of Service</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;