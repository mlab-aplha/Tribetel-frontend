import Button from '../../common/Button/Button';
import styles from './HotelLocations.module.css';

const HotelLocations = () => {
    const handleContactUs = () => {
        console.log('Contact us clicked');
    };

    const handleLearnMore = () => {
        console.log('Learn more clicked');
    };

    return (
        <section className={styles.hotelLocations}>
            <div className={styles.contentSection}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Over 50 Luxury stays</h2>
                    <p className={styles.description}>
                        Tribtel gives the best service to guest all over the country. Our members enjoy exclusive offers and the best rates.
                    </p>
                    <div className={styles.buttonGroup}>
                        <Button
                            variant="primary"
                            size="large"
                            onClick={handleContactUs}
                            className={styles.contactButton}
                        >
                            Contact us
                        </Button>
                        <Button
                            variant="secondary"
                            size="large"
                            onClick={handleLearnMore}
                            className={styles.learnMoreButton}
                        >
                            Learn more
                        </Button>
                    </div>
                </div>
            </div>

            <div className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.260715589847!2d28.047225375956!3d-26.19387727707076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950ea1a8cbe5a5%3A0x7a9d27d1b6f1b7e5!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1690000000000!5m2!1sen!2sza"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Tribtel Hotel Locations"
                        className={styles.mapIframe}
                    />
                </div>
            </div>
        </section>
    );
};

export default HotelLocations;