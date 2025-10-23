import styles from './TestimonialsSection.module.css';

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
}

const Testimonials = () => {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            quote: "“Absolutely amazing experience! The service was exceptional and the amenities were top-notch.”",
            name: "Sarah Johnson",
            role: "Business Traveler"
        },
        {
            id: 2,
            quote: "“The perfect getaway! Beautiful rooms, stunning views, and impeccable hospitality.”",
            name: "Michael Chen",
            role: "Vacationer"
        },
        {
            id: 3,
            quote: "“Exceptional value for money. Will definitely be returning for my next business trip.”",
            name: "Emily Rodriguez",
            role: "Corporate Client"
        },
        {
            id: 4,
            quote: "“The attention to detail was remarkable. Every aspect of our stay was perfect.”",
            name: "David Thompson",
            role: "Honeymooner"
        },
        {
            id: 5,
            quote: "“Outstanding service from check-in to check-out. The staff went above and beyond.”",
            name: "Lisa Wang",
            role: "Family Vacation"
        },
        {
            id: 6,
            quote: "“The most comfortable beds I've ever slept in. Woke up feeling completely refreshed.”",
            name: "James Wilson",
            role: "Solo Traveler"
        }
    ];

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.testimonialsContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Hear from our happy members</h2>
                    <p className={styles.sectionSubtitle}>Great places to stay, handpicked for you</p>
                </div>

                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className={styles.testimonialCard}>
                            <div className={styles.quoteSection}>
                                <p className={styles.quoteText}>{testimonial.quote}</p>
                            </div>
                            <div className={styles.authorSection}>
                                <div className={styles.avatar}>
                                    <img
                                        src="/src/assets/image-testi1.svg"
                                        alt={testimonial.name}
                                        className={styles.avatarImage}

                                    />
                                </div>
                                <div className={styles.authorInfo}>
                                    <div className={styles.authorName}>{testimonial.name}</div>
                                    <div className={styles.authorRole}>{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;