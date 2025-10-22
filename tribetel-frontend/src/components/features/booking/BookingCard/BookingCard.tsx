import React from 'react';
import styles from './BookingCard.module.css';
import BookingForm from '../BookingForm/BookingForm';

interface Room {
  id: string;
  image: string;
  title: string;
  location: string;
  description: string;
  features: string[];
  pricePerNight: number;
}

interface BookingCardProps {
  room: Room;
}

const BookingCard: React.FC<BookingCardProps> = ({ room }) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.leftSplit}>
          <div className={styles.imageWrap}>
            <img src={room.image} alt={room.title} className={styles.image} />
          </div>

          <div className={styles.description}>
            <h2 className={styles.title}>{room.title}</h2>
            <p className={styles.location}>{room.location}</p>
            <p className={styles.text}>{room.description}</p>
            <ul className={styles.features}>
              {room.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <BookingForm room={room} />
      </div>
    </div>
  );
};

export default BookingCard;
