import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '@/assets/logo-.svg';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/hotels', label: 'Hotels' },
        { path: '/deals', label: 'Deals' },
        { path: '/vacations', label: 'Vacations' },
        { path: '/about', label: 'About' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

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
        if (isLoggedIn) {
            setShowProfileDropdown(!showProfileDropdown);
        } else {
            // If not logged in, redirect to login
            navigate('/login');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowProfileDropdown(false);
        setIsMobileMenuOpen(false);
        navigate('/');
        console.log('User logged out');
    };

    const handleMyBookings = () => {
        if (isLoggedIn) {
            setShowProfileDropdown(false);
            setIsMobileMenuOpen(false);
            navigate('/my-bookings');
        } else {
            navigate('/login');
        }
    };

    const handleProfileSettings = () => {
        if (isLoggedIn) {
            setShowProfileDropdown(false);
            setIsMobileMenuOpen(false);
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (path: string) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleMockLogin = () => {
        setIsLoggedIn(true);
        setShowProfileDropdown(false);
        console.log('Mock login - user is now logged in');
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
                            {/* Demo button - remove in production */}
                            <button
                                className={styles.demoLoginButton}
                                onClick={handleMockLogin}
                                title="Demo: Simulate login"
                            >
                                Demo Login
                            </button>
                        </div>
                    ) : (
                        <div className={styles.profileSection} ref={dropdownRef}>
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
                                    <div className={`${styles.arrowIcon} ${showProfileDropdown ? styles.arrowUp : ''}`}></div>
                                </div>
                            </div>

                            {showProfileDropdown && isLoggedIn && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleMyBookings}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.dropdownIcon}>
                                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        My Bookings
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleProfileSettings}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.dropdownIcon}>
                                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                                stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
                                            <path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
                                                stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
                                        </svg>
                                        Profile Settings
                                    </button>
                                    <div className={styles.dropdownDivider}></div>
                                    <button
                                        className={`${styles.dropdownItem} ${styles.logoutItem}`}
                                        onClick={handleLogout}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.dropdownIcon}>
                                            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
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
                            {/* Demo button - remove in production */}
                            <button
                                className={styles.mobileDemoButton}
                                onClick={handleMockLogin}
                            >
                                Demo Login
                            </button>
                        </>
                    ) : (
                        <>
                            <div className={styles.mobileUserInfo}>
                                <div className={styles.mobileUserAvatar}>
                                    <div className={styles.avatarInitial}>W</div>
                                </div>
                                <span className={styles.mobileUserName}>Wendy</span>
                            </div>
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
                            <div className={styles.mobileDivider}></div>
                            <button
                                className={`${styles.mobileNavLink} ${styles.mobileLogout}`}
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