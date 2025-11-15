export interface CacheItem<T> {
    data: T;
    timestamp: number;
    expiresIn: number;
}

export interface CacheStore {
    hotels: CacheItem<Hotel[]>;
    searchResults: CacheItem<HotelSearchResponse>;
    user: CacheItem<User>;
}

