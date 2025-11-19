import React from 'react';
import Button from '@components/common/Button/Button';
import styles from './AboutUs.module.css';

import aboutHero from '@/assets/about-hero.jpg';
import team1 from '@/assets/team1.jpg';
import team2 from '@/assets/team2.jpg';
import team3 from '@/assets/team3.jpg';

interface TeamMember {
    id: number;
    name: string;
    position: string;
    image?: string;
    description?: string;
    social?: {
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

interface AboutUsProps {
    title?: string;
    subtitle?: string;
    mission?: string;
    vision?: string;
    story?: string;
    team?: TeamMember[];
    backgroundColor?: string;
    onTeamMemberClick?: (member: TeamMember) => void;
    onContactClick?: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({
    title = "About TribTel Hotels",
    subtitle = "Redefining luxury hospitality with exceptional experiences",
    mission = "To provide unparalleled luxury accommodations and create memorable experiences that exceed guest expectations through innovative service and authentic hospitality.",
    vision = "To be the world's most admired luxury hotel brand, known for exceptional service, sustainable practices, and unforgettable guest experiences.",
    story = "Founded in 2023, TribTel Hotels began as a single boutique property with a vision to transform the hospitality industry. Today, we operate 5+ luxury properties, our core values of excellence, innovation, and genuine care for our guests.",
    team = [],
    backgroundColor = "#FFFFFF",
    onTeamMemberClick,
    onContactClick
}) => {
    const defaultTeam: TeamMember[] = [
        {
            id: 1,
            name: "Frank Ndlovu",
            position: "CEO & Founder",
            image: team1,
            description: "Hospitality industry veteran with 20+ years of experience",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "frankdafrica@tribtel.com"
            }
        },
        {
            id: 2,
            name: "Mbali Madonsela",
            position: "Chief Operations Officer",
            image: team2,
            description: "Operations expert specializing in luxury service delivery",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "mbalimadonselal@tribtel.com"
            }
        },
        {
            id: 3,
            name: "Thokozane Tshabalalaz",
            position: "Head of Guest Experience",
            image: team3,
            description: "Passionate about creating unforgettable guest journeys",
            social: {
                linkedin: "#",
                twitter: "#",
                email: "likatshabalala@tribtel.com"
            }
        }
    ];

    const displayTeam = team.length > 0 ? team : defaultTeam;

    const stats = [
        { number: "5+", label: "Luxury Properties" },
        { number: "1", label: "Countries" },
        { number: "1k+", label: "Happy Guests" },
        { number: "24/7", label: "Premium Service" }
    ];

    const values = [
        {
            title: "Excellence",
            description: "We strive for perfection in every detail of our service"
        },
        {
            title: "Innovation",
            description: "Continuously evolving to enhance guest experiences"
        },
        {
            title: "Sustainability",
            description: "Committed to eco-friendly practices and communities"
        },
        {
            title: "Authenticity",
            description: "Genuine care and personalized service for every guest"
        }
    ];

    return (
        <section
            className={styles.aboutSection}
            style={{ backgroundColor }}
            id="about-us"
        >
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.mainTitle}>{title}</h1>
                        <p className={styles.mainSubtitle}>{subtitle}</p>
                        <div className={styles.heroStats}>
                            {stats.map((stat, index) => (
                                <div key={index} className={styles.statItem}>
                                    <span className={styles.statNumber}>{stat.number}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <img
                            src={aboutHero}
                            alt="TribTel Luxury Hotel"
                            className={styles.heroImg}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                {/* Story Section */}
                <div className={styles.storySection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Our Story</h2>
                        <p className={styles.sectionSubtitle}>From humble beginnings to global excellence</p>
                    </div>
                    <div className={styles.storyContent}>
                        <p className={styles.storyText}>{story}</p>
                        <div className={styles.milestones}>
                            <div className={styles.milestone}>
                                <span className={styles.milestoneYear}>2023</span>
                                <span className={styles.milestoneText}>First boutique hotel opened</span>
                            </div>
                            <div className={styles.milestone}>
                                <span className={styles.milestoneYear}>2024</span>
                                <span className={styles.milestoneText}>Expanded to international markets</span>
                            </div>
                            <div className={styles.milestone}>
                                <span className={styles.milestoneYear}>2025</span>
                                <span className={styles.milestoneText}>Launched sustainability initiative</span>
                            </div>
                            <div className={styles.milestone}>
                                <span className={styles.milestoneYear}>2026</span>
                                <span className={styles.milestoneText}>5+ properties worldwide</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className={styles.missionVisionSection}>
                    <div className={styles.missionCard}>
                        <div className={styles.cardIcon}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="#470F51">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Our Mission</h3>
                        <p className={styles.cardText}>{mission}</p>
                    </div>
                    <div className={styles.visionCard}>
                        <div className={styles.cardIcon}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="#470F51">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Our Vision</h3>
                        <p className={styles.cardText}>{vision}</p>
                    </div>
                </div>

                {/* Values Section */}
                <div className={styles.valuesSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Our Values</h2>
                        <p className={styles.sectionSubtitle}>The principles that guide everything we do</p>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <div key={index} className={styles.valueCard}>
                                <h4 className={styles.valueTitle}>{value.title}</h4>
                                <p className={styles.valueDescription}>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className={styles.teamSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Meet Our Leadership</h2>
                        <p className={styles.sectionSubtitle}>The passionate team behind TribTel's success</p>
                    </div>
                    <div className={styles.teamGrid}>
                        {displayTeam.map((member) => (
                            <article
                                key={member.id}
                                className={styles.teamCard}
                                onClick={() => onTeamMemberClick?.(member)}
                            >
                                <div className={styles.teamImageContainer}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className={styles.teamImage}
                                        loading="lazy"
                                    />
                                    <div className={styles.teamOverlay} />
                                </div>
                                <div className={styles.teamInfo}>
                                    <h3 className={styles.teamName}>{member.name}</h3>
                                    <p className={styles.teamPosition}>{member.position}</p>
                                    <p className={styles.teamDescription}>{member.description}</p>
                                    {member.social && (
                                        <div className={styles.socialLinks}>
                                            {member.social.linkedin && (
                                                <a href={member.social.linkedin} className={styles.socialLink} aria-label="LinkedIn">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {member.social.twitter && (
                                                <a href={member.social.twitter} className={styles.socialLink} aria-label="Twitter">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {member.social.email && (
                                                <a href={`mailto:${member.social.email}`} className={styles.socialLink} aria-label="Email">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={styles.ctaSection}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Ready to Experience TribTel?</h2>
                        <p className={styles.ctaSubtitle}>
                            Join thousands of satisfied guests who have discovered the TribTel difference
                        </p>
                        <div className={styles.ctaButtons}>
                            <Button
                                variant="primary"
                                size="large"
                                onClick={onContactClick}
                                className={styles.ctaButton}
                            >
                                Contact Us
                            </Button>
                            <Button
                                variant="outline"
                                size="large"
                                onClick={() => window.location.href = '/hotels'}
                                className={styles.ctaButton}
                            >
                                Explore Hotels
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;