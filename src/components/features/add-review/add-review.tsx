import React, { useState } from 'react';
import styles from './Add-Review.module.css';
import Button from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import Loader from '@components/common/Loader/Loader';
import ErrorMessage from '@components/common/ErrorMessage/ErrorMessage';
import { ReviewFormData, AddReviewProps } from '@components/types/common';

const AddReview: React.FC<AddReviewProps> = ({
    onSubmit = async (data: ReviewFormData) => {
        console.log('Review submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // const response = await fetch('/api/reviews', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return response.json();
    },
    initialRating = 0,
    hotelId,
    bookingId,
    userId,
    maxCommentLength = 1000,
    maxTitleLength = 100
}) => {
    const [rating, setRating] = useState<number>(initialRating);
    const [comment, setComment] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        if (rating === 0) {
            setError('Please select a rating before submitting.');
            return;
        }

        if (!comment.trim()) {
            setError('Please add a comment before submitting.');
            return;
        }

        if (comment.length > maxCommentLength) {
            setError(`Comment must be less than ${maxCommentLength} characters.`);
            return;
        }

        setIsSubmitting(true);

        try {
            const reviewData: ReviewFormData = {
                rating,
                comment: comment.trim(),
                title: title.trim(),
                hotelId,
                bookingId,
                userId
            };

            await onSubmit(reviewData);
            setRating(0);
            setComment('');
            setTitle('');
            setSuccess(true);

        } catch (error: any) {
            console.error('Error submitting review:', error);
            setError(error.message || 'There was an error submitting your review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
        setError(null);
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
    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <div className={styles.reviewSection}>
            <div className={styles.container}>
                <header className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Rate our service</h2>
                    <p className={styles.sectionSubtitle}>
                        Share your experience and help us improve
                    </p>
                </header>

                {success && (
                    <ErrorMessage
                        message="Thank you for your review! Your feedback has been submitted successfully."
                        variant="success"
                        dismissible
                        onDismiss={() => setSuccess(false)}
                    />
                )}

                {error && (
                    <ErrorMessage
                        message={error}
                        variant="error"
                        dismissible
                        onDismiss={() => setError(null)}
                    />
                )}

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
                                    disabled={isSubmitting}
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
                        maxLength={maxTitleLength}
                        disabled={isSubmitting}
                        error={title.length > maxTitleLength ? `Title must be less than ${maxTitleLength} characters` : undefined}
                    />

                    {title && (
                        <div className={styles.charCount}>
                            {title.length}/{maxTitleLength} characters
                        </div>
                    )}

                    <Input
                        type="textarea"
                        value={comment}
                        onChange={setComment}
                        label="Your Review *"
                        placeholder="Tell us about your experience... What did you like? What could be improved?"
                        required={true}
                        maxLength={maxCommentLength}
                        rows={6}
                        disabled={isSubmitting}
                        error={comment.length > maxCommentLength ? `Comment must be less than ${maxCommentLength} characters` : undefined}
                    />

                    {comment && (
                        <div className={styles.charCount}>
                            {comment.length}/{maxCommentLength} characters
                        </div>
                    )}

                    <div className={styles.submitSection}>
                        {isSubmitting ? (
                            <Loader text="Submitting your review..." size="small" />
                        ) : (
                            <Button
                                type="submit"
                                variant="primary"
                                size="large"
                                disabled={rating === 0 || !comment.trim() || comment.length > maxCommentLength}
                                fullWidth
                            >
                                Submit Review
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;


