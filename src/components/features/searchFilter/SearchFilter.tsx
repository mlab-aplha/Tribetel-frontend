import React, { useState } from 'react';
import styles from "./SearchFilter.module.css";
import SearchBar from "../../../components/common/Searchbar/SearchBar";
import { SearchParams, PriceEstimate, SearchDestination } from "../../types/common";

const sampleDestinations: SearchDestination[] = [
  { id: "lanseria", name: "Lanseria", type: 'region' as const, country: "South Africa" },
  { id: "johannesburg", name: "Johannesburg", type: 'city' as const, country: "South Africa" },
  { id: "capetown", name: "Cape Town", type: 'city' as const, country: "South Africa" },
];

interface SearchFilterProps {
  onSearch: (searchParams: SearchParams) => void;
  disabled?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchParams: SearchParams) => {
    console.log('Search params:', searchParams);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSearch(searchParams);
    }, 1000);
  };

  const fetchDestinations = async (): Promise<SearchDestination[]> => {
    return new Promise<SearchDestination[]>((resolve) => {
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
  }): Promise<PriceEstimate> => {
    return new Promise<PriceEstimate>((resolve) => {
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

  const handlePriceEstimate = (estimate: PriceEstimate | null) => {
    console.log('Price estimate:', estimate);
  };

  return (
    <div className={styles.searchFilter}>
      <SearchBar
        onSearch={handleSearch}
        fetchDestinations={fetchDestinations}
        calculatePrice={calculatePrice}
        enablePriceEstimation={true}
        onPriceEstimate={handlePriceEstimate}
        disabled={disabled || loading}
        compact={true}
      />
    </div>
  );
};

export default SearchFilter;
