import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/rooms', label: 'Rooms' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoSection}>
                <Link to="/" className={styles.logoLink}>
                    <div className={styles.logoContainer}>
                        <img
                            src="/logo-.svg"
                            alt="Tribtel Logo"
                            className={styles.logoImage}
                        />
                        <div className={styles.logoText}>Tribtel</div>
                    </div>
                </Link>
            </div>

            <div className={styles.navLinks}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`${styles.navLink} ${isActive(item.path) ? styles.active : styles.default
                            }`}
                    >
                        <span className={styles.linkText}>{item.label}</span>
                    </Link>
                ))}

                <Link
                    to="/login"
                    className={`${styles.navLink} ${styles.signIn}`}
                >
                    <span className={styles.linkText}>Sign In</span>
                </Link>
            </div>

            <div className={styles.joinSection}>
                <Link to="/register" className={styles.joinButton}>
                    <span className={styles.joinText}>Join</span>
                </Link>
            </div>

            <button
                className={styles.mobileMenuButton}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileLogo}>
                        <img
                            src="/logo-.svg"
                            alt="Tribtel Logo"
                            className={styles.mobileLogoImage}
                        />
                        <span>Tribtel</span>
                    </div>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.active : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        to="/login"
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className={styles.mobileJoinButton}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Join
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;