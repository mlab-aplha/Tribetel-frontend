
import styles from "./HotelListingsPage.module.css";
import type { Hotel } from "./types";
import { SearchBar } from "../../components/common/searchBar/searchBar";
import { Button } from "../../components/common/button/button";


const sampleHotels: Hotel[] = [
  {
    id: "1",
    name: "The Fly Stay",
    location: "Cape Town, South Africa",
    description:
      "Located in the heart of Cape Town, The Fly Stay offers a luxurious experience with stunning views of Table Mountain.",
    priceStarting: 750,
    image: "/images/fly-stay.jpg",
  },
  {
    id: "2",
    name: "Elangeni",
    location: "Mbombela, South Africa",
    description:
      "Elangeni is a beachfront hotel in Durban, perfect for a relaxing getaway with top-notch amenities.",
    priceStarting: 500,
    image: "/images/bellagen.jpg",
  },
  {
    id: "3",
    name: "Diamond Crown",
    location: "Johannesburg, South Africa",
    description:
      "Diamond Crown provides a royal experience in Johannesburg with elegant rooms and exceptional service.",
    priceStarting: 600,
    image: "/images/diamond-crown.jpg",
  },
];

export default function HotelListingsPage(): JSX.Element {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Our hotels</h1>
          <p className={styles.subtitle}>
            We strive to give the best stays at the click of a button. See our range of stays, book and enjoy.
          </p>
          <div className={styles.searchWrap}>
            <SearchBar
              destinations={[]}
              initialDestinationId=""
              onSearch={() => {}}  
            />
          </div>
        </div>
      </div>

      <section className={styles.results}>
        <div className={styles.grid}>
          {sampleHotels.map((hotel) => (
            <article key={hotel.id} className={styles.card}>
              <div
                className={styles.thumb}
                style={{ backgroundImage: `url(${hotel.image || "/images/placeholder.jpg"})` }}
                role="img"
                aria-label={hotel.name}
              />
              <div className={styles.cardBody}>
                <h2 className={styles.hotelName}>{hotel.name}</h2>
                <p className={styles.location}>{hotel.location}</p>
                <p className={styles.description}>{hotel.description}</p>
                <div className={styles.row}>
                  <div className={styles.price}>From <span className={styles.priceValue}>R{hotel.priceStarting}</span></div>
                  <Button className={styles.visitBtn}>Visit</Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.promo}>
          <h3>Over 50 Luxury stays</h3>
          <p>Book your next stay with us and enjoy exclusive offers and discounts.</p>
          <Button className={styles.cta}>Book now</Button>
        </div>
      </section>
    </main>
  );
}
