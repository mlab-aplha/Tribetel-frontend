import React from 'react';
import styles from "./SearchFilter.module.css";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

interface SearchFilterProps {
  onFilter: (filters: any) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilter }) => {
  const [filters] = React.useState({
    priceRange: [0, 1000],
    amenities: [] as string[],
    rating: 0
  });

  const handleSearch = (query: string) => {
    onFilter({ ...filters, query });
  };

  return (
    <div className={styles.filterContainer}>
      <SearchBar onSearch={handleSearch} />
      {/* Add other filter components here */}
    </div>
  );
};

export default SearchFilter;
