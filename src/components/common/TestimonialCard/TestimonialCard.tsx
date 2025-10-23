
import Card from '../Card/Card';
import styles from './TestimonialCard.module.css';

const TestimonialCard = ({
    quote = "“Quote”",
    authorName = "Title",
    authorRole = "Description",
    authorImage = "imagePath",
    className = ""
}) => {
    return (
        <Card className={`${styles.testimonialCard} ${className}`}>
            <div className={styles.quoteSection}>
                <div className={styles.quoteText}>{quote}</div>
            </div>

            <div className={styles.authorSection}>
                <div className={styles.authorImage}>
                    <img
                        src={authorImage}
                        alt={authorName}
                        className={styles.image}
                    />
                </div>
                <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{authorName}</div>
                    <div className={styles.authorRole}>{authorRole}</div>
                </div>
            </div>
        </Card>
    );
};

export default TestimonialCard;