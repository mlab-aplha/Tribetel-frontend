import React, { useState } from 'react';
import styles from "./SearchResultsPage.module.css";
import type { HotelSummary } from "../../types/common";
import SearchBar from "../../components/common/SearchBar/SearchBar";

const sampleHotels: HotelSummary[] = [
  {
    id: "1",
    name: "The Grand suite",
    location: "Lanseria",
    rating: 5.8,
    reviews: 1000,
    description:
      "This suite is perfect for a romantic getaway. It is spacious and comes fully equipped with a kitchen and a private balcony.",
    pricePerNight: 550,
    image: "/images/grand-suite.jpg",
    distanceKm: 2.1,
    tags: ["Free parking", "Kitchen"],
    amenities: ["Free WiFi", "Swimming Pool", "Kitchen"]
  },
  {
    id: "2",
    name: "Ebumnandini",
    location: "Lanseria",
    rating: 7.9,
    reviews: 1000,
    description:
      "This suite is perfect for a relaxing vacation. It is spacious and comes fully equipped with a kitchen and a private balcony.",
    pricePerNight: 700,
    image: "/images/ebumnandini.jpg",
    distanceKm: 3.7,
    tags: ["Pool", "Breakfast"],
    amenities: ["Free WiFi", "Swimming Pool", "Breakfast Included"]
  },
];

const sampleDestinations = [
  { id: "lanseria", name: "Lanseria", type: 'region' as const, country: "South Africa" },
  { id: "johannesburg", name: "Johannesburg", type: 'city' as const, country: "South Africa" },
  { id: "capetown", name: "Cape Town", type: 'city' as const, country: "South Africa" },
];

const SearchResultsPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recommended" | "distance" | "price">(
    "recommended"
  );
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchParams: any) => {
    console.log('Search params:', searchParams);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // You can update the hotels based on search params here
    }, 1000);
  };

  const fetchDestinations = async () => {
    // Simulate API call for destinations
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve(sampleDestinations);
      }, 500);
    });
  };

  const calculatePrice = async (params: {
    destinationId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    rooms?: number;
  }) => {
    // Simulate price calculation
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const nights = Math.ceil(
          (new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) /
          (1000 * 3600 * 24)
        );
        resolve({
          min: 500 * nights,
          max: 1500 * nights,
          currency: 'ZAR',
          nights: nights,
          isEstimated: true
        });
      }, 800);
    });
  };

  const handlePriceEstimate = (estimate: any) => {
    console.log('Price estimate:', estimate);
  };

  const filtered = sampleHotels
    .filter((h) =>
      query
        ? h.location.toLowerCase().includes(query.toLowerCase()) ||
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        (h.tags ?? []).some((t) =>
          t.toLowerCase().includes(query.toLowerCase())
        )
        : true
    )
    .filter((h) => (priceMin !== "" ? h.pricePerNight >= Number(priceMin) : true))
    .filter((h) => (priceMax !== "" ? h.pricePerNight <= Number(priceMax) : true))
    .sort((a, b) => {
      if (sortBy === "distance") return (a.distanceKm ?? 0) - (b.distanceKm ?? 0);
      if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
      return b.rating - a.rating;
    });

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Lanseria — 08 Oct - 09 Oct</h1>

          <div className={styles.searchWrap}>
            <SearchBar
              onSearch={handleSearch}
              fetchDestinations={fetchDestinations}
              calculatePrice={calculatePrice}
              enablePriceEstimation={true}
              onPriceEstimate={handlePriceEstimate}
              disabled={loading}
            />
          </div>
        </div>
      </header>

      <section className={styles.content}>
        <aside className={styles.filters}>
          <div className={styles.filterCard}>
            <h3 className={styles.filterTitle}>Price</h3>
            <div className={styles.rangeRow}>
              <input
                className={styles.inputSmall}
                type="number"
                placeholder="Min"
                value={priceMin === "" ? "" : String(priceMin)}
                onChange={(e) => setPriceMin(e.target.value === "" ? "" : Number(e.target.value))}
                aria-label="Minimum price"
              />
              <input
                className={styles.inputSmall}
                type="number"
                placeholder="Max"
                value={priceMax === "" ? "" : String(priceMax)}
                onChange={(e) => setPriceMax(e.target.value === "" ? "" : Number(e.target.value))}
                aria-label="Maximum price"
              />
            </div>
          </div>

          <div className={styles.filterCard}>
            <h3 className={styles.filterTitle}>Sort</h3>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort results"
            >
              <option value="recommended">Recommended</option>
              <option value="distance">Distance</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className={styles.filterCard}>
            <h3 className={styles.filterTitle}>Amenities</h3>
            <label className={styles.checkbox}>
              <input type="checkbox" /> Free parking
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" /> Pool
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" /> Breakfast
            </label>
          </div>
        </aside>

        <section className={styles.results}>
          <div className={styles.resultsHeader}>
            <div>{filtered.length} stays</div>
            <div className={styles.sortHint}>
              Sort: <strong>{sortBy}</strong>
            </div>
          </div>

          <div className={styles.list}>
            {filtered.map((h) => (
              <article key={h.id} className={styles.card}>
                <img
                  className={styles.thumb}
                  src={h.image || "/images/placeholder.jpg"}
                  alt={h.name}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <div>
                      <h2 className={styles.hotelName}>{h.name}</h2>
                      <div className={styles.location}>{h.location}</div>
                    </div>
                    <div className={styles.rating}>
                      <div className={styles.score}>{h.rating}</div>
                      <div className={styles.reviews}>{h.reviews} reviews</div>
                    </div>
                  </div>

                  <p className={styles.description}>{h.description}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.price}>
                      R{h.pricePerNight}
                      <span className={styles.perNight}> / night</span>
                    </div>
                    <button className={styles.bookBtn} aria-label={`Book ${h.name}`}>
                      Book
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default SearchResultsPage;