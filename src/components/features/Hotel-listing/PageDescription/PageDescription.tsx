import React from 'react';
import styles from './PageDescription.module.css';
import { PageDescriptionProps } from '@types/common';

export const PageDescription: React.FC<PageDescriptionProps> = ({
    title,
    description,
    backgroundImage = '/images/hotel-hero.jpg',
    overlayColor = '#470F51',
    textColor = 'white',
    accentColor = '#F4942F',
    height = '1286px',
    reverseLayout = false
}) => {
    return (
        <div className={styles.container} style={{ height }}>
            {/* Top Section with Background Image */}
            <section
                className={`${styles.topSection} ${reverseLayout ? styles.reverse : ''}`}
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined
                }}
            >
                <div className={styles.imageOverlay} />
                <img
                    className={styles.backgroundImage}
                    src={backgroundImage}
                    alt="Hotel showcase"
                />
            </section>

            {/* Bottom Section with Content */}
            <section
                className={`${styles.bottomSection} ${reverseLayout ? styles.reverse : ''}`}
                style={{
                    backgroundColor: overlayColor,
                    color: textColor
                }}
            >
                <div className={styles.content}>
                    <h2
                        className={styles.title}
                        style={{ color: accentColor }}
                    >
                        {title}
                    </h2>
                    <div
                        className={styles.description}
                        style={{ color: textColor }}
                    >
                        {description}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PageDescription;

