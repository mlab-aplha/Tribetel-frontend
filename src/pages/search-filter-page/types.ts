export type HotelSummary = {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  pricePerNight: number;
  image?: string;
  distanceKm?: number;
  tags?: string[];
};
