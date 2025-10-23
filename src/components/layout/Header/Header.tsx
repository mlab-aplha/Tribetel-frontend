import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../assets/logo-.svg';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleJoinClick = () => {
        console.log('Join button clicked');
        navigate('/register');
    };

    const handleSignInClick = () => {
        console.log('Sign In button clicked');
        navigate('/login');
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
        navigate('/');
    };

    const handleMyBookings = () => {
        setShowProfileDropdown(false);
        navigate('/my-bookings');
    };

    const handleProfileSettings = () => {
        setShowProfileDropdown(false);
        navigate('/profile');
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

                        </div>
                    </Link>
                </div>
                <div className={styles.rightSection}>
                    <nav className={styles.navMenu}>
                        <Link to="/hotels" className={`${styles.navItem} ${styles.active}`}>
                            Hotels
                        </Link>
                        <Link to="/deals" className={styles.navItem}>
                            Deals
                        </Link>
                        <Link to="/vacations" className={styles.navItem}>
                            Vacations
                        </Link>
                        <Link to="/about" className={styles.navItem}>
                            About
                        </Link>
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
                </div>
            </div>
        </header>
    );
};

export default Header;