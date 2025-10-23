import React, { useState } from 'react';
import styles from './Add-Review.module.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

interface ReviewFormData {
    rating: number;
    comment: string;
    title: string;
}

interface AddReviewProps {
    onSubmit?: (data: ReviewFormData) => Promise<void>;
    initialRating?: number;
}

const AddReview: React.FC<AddReviewProps> = ({
    onSubmit = async (data: ReviewFormData) => console.log('Review submitted:', data),
    initialRating = 0
}) => {
    const [rating, setRating] = useState<number>(initialRating);
    const [comment, setComment] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }

        if (!comment.trim()) {
            alert('Please add a comment before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({ rating, comment, title });
            setRating(0);
            setComment('');
            setTitle('');
            alert('Thank you for your review!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('There was an error submitting your review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
    };
    const StarIcon = ({ filled }: { filled: boolean }) => (
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill={filled ? "#FDC959" : "none"}
            stroke="#FDC959"
            strokeWidth="2"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );

    return (
        <div className={styles.reviewSection}>
            <div className={styles.container}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Rate our service</h2>
                    <p className={styles.sectionSubtitle}>
                        Share your experience and help us improve
                    </p>
                </header>

                <form onSubmit={handleSubmit} className={styles.reviewForm}>
                    <div className={styles.ratingSection}>
                        <label className={styles.ratingLabel}>
                            How would you rate your experience?
                        </label>
                        <div className={styles.starRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`${styles.star} ${star <= rating ? styles.active : ''}`}
                                    onClick={() => handleRatingClick(star)}
                                    aria-label={`Rate ${star} out of 5 stars`}
                                >
                                    <StarIcon filled={star <= rating} />
                                </button>
                            ))}
                        </div>
                        <div className={styles.ratingText}>
                            {rating === 0 ? 'Select your rating' : `${rating} out of 5 stars`}
                        </div>
                    </div>

                    <Input
                        type="text"
                        value={title}
                        onChange={setTitle}
                        label="Review Title (Optional)"
                        placeholder="Summarize your experience"
                        maxLength={100}
                    />

                    <Input
                        type="textarea"
                        value={comment}
                        onChange={setComment}
                        label="Your Review *"
                        placeholder="Tell us about your experience... What did you like? What could be improved?"
                        required={true}
                        maxLength={1000}
                        rows={6}
                    />

                    {comment && (
                        <div className={styles.charCount}>
                            {comment.length}/1000 characters
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        disabled={isSubmitting || rating === 0 || !comment.trim()}
                        fullWidth
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;