import React from 'react';
import { LoaderProps } from '@components/types/common';
import styles from './Loader.module.css';

const Loader: React.FC<LoaderProps> = ({
    type = 'spinner',
    size = 'medium',
    variant = 'primary',
    text,
    overlay = false,
    fullscreen = false,
    inline = false,
    className = '',
}) => {
    const renderSpinner = () => (
        <div
            className={`
        ${styles.spinner} 
        ${styles[size]} 
        ${styles[variant]}
      `}
        />
    );

    const renderDots = () => (
        <div className={`${styles.dots} ${styles[`dots${size.charAt(0).toUpperCase() + size.slice(1)}`]}`}>
            {[1, 2, 3].map((dot) => (
                <div
                    key={dot}
                    className={`
            ${styles.dot} 
            ${styles[`dot${size.charAt(0).toUpperCase() + size.slice(1)}`]} 
            ${styles[`dot${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}
          `}
                />
            ))}
        </div>
    );

    const renderLoader = () => {
        const loaderContent = (
            <div className={`
        ${styles.loaderContainer} 
        ${inline ? styles.inline : ''}
        ${className}
      `}>
                {type === 'spinner' ? renderSpinner() : renderDots()}
                {text && (
                    <div className={`
            ${styles.text} 
            ${styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}`]}
            ${inline ? styles.inlineText : ''}
          `}>
                        {text}
                    </div>
                )}
            </div>
        );

        if (fullscreen) {
            return <div className={styles.fullscreen}>{loaderContent}</div>;
        }

        if (overlay) {
            return (
                <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                        {loaderContent}
                    </div>
                </div>
            );
        }

        return loaderContent;
    };

    return renderLoader();
};

export default Loader;


