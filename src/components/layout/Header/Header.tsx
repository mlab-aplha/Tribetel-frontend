import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../assets/logo-.svg';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/hotels', label: 'Hotels' },
        { path: '/deals', label: 'Deals' },
        { path: '/vacations', label: 'Vacations' },
        { path: '/about', label: 'About' },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleJoinClick = () => {
        console.log('Join button clicked');
        navigate('/register');
        setIsMobileMenuOpen(false);
    };

    const handleSignInClick = () => {
        console.log('Sign In button clicked');
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/');
        window.scrollTo(0, 0);
    };

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowProfileDropdown(false);
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const handleMyBookings = () => {
        setShowProfileDropdown(false);
        setIsMobileMenuOpen(false);
        navigate('/my-bookings');
    };

    const handleProfileSettings = () => {
        setShowProfileDropdown(false);
        setIsMobileMenuOpen(false);
        navigate('/profile');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (path: string) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                {/* Logo - Left side */}
                <div className={styles.logoSection}>
                    <Link
                        to="/"
                        className={styles.logoLink}
                        onClick={handleLogoClick}
                    >
                        <div className={styles.logoContainer}>
                            <img
                                src={logo}
                                alt="Tribtel Logo"
                                className={styles.logoImage}
                            />
                            <div className={styles.logoText}>Tribtel</div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className={styles.rightSection}>
                    <nav className={styles.navMenu}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {!isLoggedIn ? (
                        <div className={styles.authButtons}>
                            <button
                                className={styles.signInButton}
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </button>
                            <button
                                className={styles.joinButton}
                                onClick={handleJoinClick}
                                aria-label="Join Tribtel"
                            >
                                Join
                            </button>
                        </div>
                    ) : (
                        <div className={styles.profileSection}>
                            <div
                                className={styles.profileContainer}
                                onClick={handleProfileClick}
                            >
                                <div className={styles.profileAvatar}>
                                    <div className={styles.avatarCircle}></div>
                                    <div className={styles.avatarInitial}>W</div>
                                </div>
                                <span className={styles.profileName}>Wendy</span>
                                <div className={styles.dropdownArrow}>
                                    <div className={styles.arrowIcon}></div>
                                </div>
                            </div>

                            {showProfileDropdown && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleMyBookings}
                                    >
                                        My Bookings
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleProfileSettings}
                                    >
                                        Profile Settings
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileMenuButton}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileLogo}>
                        <img
                            src={logo}
                            alt="Tribtel Logo"
                            className={styles.mobileLogoImage}
                        />
                        <span>Tribtel</span>
                    </div>
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.active : ''}`}
                            onClick={() => handleNavClick(item.path)}
                        >
                            {item.label}
                        </button>
                    ))}
                    {!isLoggedIn ? (
                        <>
                            <button
                                className={styles.mobileNavLink}
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </button>
                            <button
                                className={styles.mobileJoinButton}
                                onClick={handleJoinClick}
                            >
                                Join
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={styles.mobileNavLink}
                                onClick={handleMyBookings}
                            >
                                My Bookings
                            </button>
                            <button
                                className={styles.mobileNavLink}
                                onClick={handleProfileSettings}
                            >
                                Profile Settings
                            </button>
                            <button
                                className={styles.mobileNavLink}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;