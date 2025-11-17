import React from 'react';
import styles from './Icons.module.css';

interface IconProps {
    className?: string;
    size?: number;
    color?: string;
}

export const DashboardIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.dashboardIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

export const HotelIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.hotelIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
        <polyline points="9,22 9,12 15,12 15,22"></polyline>
        <path d="M8 6h.01"></path>
        <path d="M16 6h.01"></path>
        <path d="M12 6h.01"></path>
        <path d="M12 12h.01"></path>
        <path d="M12 18h.01"></path>
    </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.targetIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.starIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.calendarIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export const DiamondIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.diamondIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.7 10.3l9-9 9 9-9 9-9-9z"></path>
        <path d="M7.5 7.5l9 9"></path>
        <path d="M7.5 16.5l9-9"></path>
    </svg>
);

export const AwardIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.awardIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.rocketIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.bookOpenIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

export const SmartphoneIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.smartphoneIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12" y2="18"></line>
    </svg>
);

export const CrownIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.crownIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path>
        <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8"></path>
        <path d="M21 12l-9 6-9-6"></path>
    </svg>
);

export const CloudIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.cloudIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.sparklesIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
        <path d="M20 3v4"></path>
        <path d="M22 5h-4"></path>
        <path d="M4 17v2"></path>
        <path d="M5 18H3"></path>
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
    <svg className={`${styles.icon} ${styles.arrowRightIcon} ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);