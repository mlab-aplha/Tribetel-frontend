import { useState,} from "react";
import styles from "./SearchFilterPage.module.css";
import type { HotelSummary } from "./types";
import { SearchBar } from "../../components/common/searchBar/searchBar";

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
  },
];

const sampleDestinations = [
  { id: "lanseria", label: "Lanseria" },
  { id: "johannesburg", label: "Johannesburg" },
  { id: "capetown", label: "Cape Town" },
];

export default function SearchFilterPage(): JSX.Element {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recommended" | "distance" | "price">(
    "recommended"
  );
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");

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
              destinations={sampleDestinations}
              initialDestinationId="lanseria"
              onSearch={({ destinationId }) => setQuery(destinationId)}
              performSearch={async () => Promise.resolve()}
              disabled={false}
              size="medium"
              className=""
              ariaLabel="Search available stays"
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
                      <div className={styles.reviews}>{h.reviews}</div>
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

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>Use cases · Explore · Company · Legal</div>
          <div className={styles.social}>FB · TW · IG</div>
        </div>
      </footer>
    </main>
  );
}
