import React from 'react';
import AboutUs from '@components/features/AboutUs/AboutUs';
import styles from './AboutUsPage.module.css';
const AboutUsPage: React.FC = () => {
    const handleTeamMemberClick = (member: any) => {
        console.log('Team member selected:', member);
    };

    const handleContactClick = () => {
        console.log('Contact us clicked');
        window.location.href = '/contact';
    };

    return (
        <div className={styles.aboutus}>
            <AboutUs
                onTeamMemberClick={handleTeamMemberClick}
                onContactClick={handleContactClick}
            />
        </div>
    );
};

export default AboutUsPage;