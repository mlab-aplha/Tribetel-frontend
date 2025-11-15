import HeroSection from '../../components/features/hero/HeroSection/HeroSection';
import Showcase from '../../components/features/Showcase/Showcase';
import ServicesSection from '@components/features/service-section/ServiceSection';
import HotelLocations from '@components/features/hotel-locations/HotelLocations';
import ConvertSection from '@components/features/convert-section/Convert section';
import TestimonialsSection from '../../components/features/TestimonialsSection/TestimonialsSection';
import styles from './LandingPage.module.css';

interface Room {
    id: number;
    title: string;
    price: number;
    image?: string;
    description?: string;
}

const LandingPage = () => {
    const handleRoomClick = (room: Room) => {
        console.log('Room clicked:', room);
    };

    return (
        <div className={styles.landingPage}>
            <HeroSection />
            <Showcase onRoomClick={handleRoomClick} />
            <ConvertSection />
            <ServicesSection />
            <TestimonialsSection />
            <HotelLocations />
        </div>
    );
};

export default LandingPage;


