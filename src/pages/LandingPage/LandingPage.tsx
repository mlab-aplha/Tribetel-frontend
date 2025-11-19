import React from 'react';
import HeroSection from '@components/features/hero/HeroSection/HeroSection';
import Showcase from '@components/features/Showcase/Showcase';
import ServicesSection from '@components/features/service-section/ServiceSection';
import ConvertSection from '@components/features/convert-section/ConvertSection';
import Testimonials from '@components/features/TestimonialsSection/TestimonialsSection';
import HotelLocations from '@components/features/hotel-locations/HotelLocations';
import styles from './LandingPage.module.css';

const HomePage: React.FC = () => {
  const handleRoomClick = (room: any) => {
    console.log('Room selected:', room);
  };

  const handleServiceClick = (service: any) => {
    console.log('Service selected:', service);
  };


  return (
    <div className={styles.homePage}>
      <HeroSection />

      <Showcase
        title="Our best places - on offer"
        onRoomClick={handleRoomClick}
      />

      <ServicesSection onServiceClick={handleServiceClick} />

      <ConvertSection />

      <Testimonials />

      <HotelLocations />
    </div>
  );
};

export default HomePage;