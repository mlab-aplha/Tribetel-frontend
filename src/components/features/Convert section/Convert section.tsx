import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import styles from './ConvertSection.module.css';

const ConvertSection = () => {
    const handleJoinFree = () => {
        console.log('Join for free clicked');
    };

    const handleSignIn = () => {
        console.log('Sign in clicked');
    };

    return (
        <div className={styles.convertSection}>
            <Card className={styles.convertCard}>
                <div className={styles.contentSection}>
                    <div className={styles.textContent}>
                        <h2 className={styles.title}>Become a Tribtel Tribe member</h2>
                        <p className={styles.subtitle}>
                            Get exclusive rates, earn points towards free nights, and more.
                        </p>
                        <div className={styles.buttonGroup}>
                            <Button
                                variant="secondary"
                                size="large"
                                onClick={handleJoinFree}
                                className={styles.joinButton}
                            >
                                Join for free
                            </Button>
                            <Button
                                variant="outline"
                                size="large"
                                onClick={handleSignIn}
                                className={styles.signInButton}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ConvertSection;