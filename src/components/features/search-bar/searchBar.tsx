//Self contained SearchBar component for selecting destination and date range
// - a destination dropdown (left)
// - two date inputs for check-in and check-out (middle)
// - a search button (right)

import React from 'react';
import './searchBar.module.css';

type Destination = {id: string; label: string};
type DateRange = {startDate: Date; endDate: Date};

export type SearchBarProps = {
    destinations: Destination[]; //list destinations to choose from
    initialDestinationId?: string;//optionally pre-select a destination
    initialDateRange?: DateRange;//optionally pre-select a date range
    onSearch?: (payload:{destinationId: string, dateRange: DateRange}) => void;//callback when search is performed
    performSearch?: (payload: {destinationId: string; dateRange: DateRange}) => Promise<any>;//async search function
    disabled?: boolean;//disable the entire search bar
    size?: 'small' | 'medium' | 'large';//size of the search bar
    className?: string;//custom class name for the search bar
    ariaLabel?: string;//aria-label for accessibility
};

export const SearchBar: React.FC<SearchBarProps> = ({
    destinations,
    initialDestinationId = '',
    initialDateRange,
    onSearch,
    performSearch,
    disabled = false,
    size = 'medium',
    className = '',
    ariaLabel = 'Search available rooms',
}) => {
    // Use ISO date strings for inputs internally, convert to Date objects only when emitting
  const toISO = (d?: Date) => (d instanceof Date && !Number.isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : "");
  const fromISO = (s: string) => (s ? new Date(s + "T00:00:00") : null);

  // internal states
  const [selectedDestinationId, setSelectedDestinationId] = React.useState<string>(initialDestinationId);
  const [startIso, setStartIso] = React.useState<string>(toISO(initialDateRange?.startDate));
  const [endIso, setEndIso] = React.useState<string>(toISO(initialDateRange?.endDate));
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // validate before search
  const validate = (): boolean => {
    if (!selectedDestinationId) {
      setError("Please select a destination");
      return false;
    }
    if (!startIso || !endIso) {
      setError("Please choose check-in and check-out dates");
      return false;
    }
    const start = fromISO(startIso);
    const end = fromISO(endIso);
    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Invalid dates");
      return false;
    }
    if (start > end) {
      setError("Check-out must be the same day or after check-in");
      return false;
    }
    setError(null);
    return true;
  };

  // on click handler
  const handleSearch = async () => {
    if (disabled || isLoading) return;
    if (!validate()) return;

    const payload = {
      destinationId: selectedDestinationId,
      dateRange: {
        startDate: fromISO(startIso) as Date,
        endDate: fromISO(endIso) as Date,
      } as DateRange,
    };

    if (performSearch) {
      try {
        setIsLoading(true);
        await performSearch(payload);
        setIsLoading(false);
        onSearch?.(payload);
      } catch {
        setIsLoading(false);
        setError("Search failed. Please try again.");
      }
      return;
    }

    onSearch?.(payload);
};

return (
    <div
      className={`wrapper ${size} ${className}`}
      role="search"
      aria-label={ariaLabel}
    >
      {/* Destination dropdown */}
      <div className="block">
        <label className="label" htmlFor="sb-destination">Destination</label>
        <div className="selectWrap">
          <select
            id="sb-destination"
            className="select"
            value={selectedDestinationId}
            onChange={(e) => setSelectedDestinationId(e.target.value)}
            disabled={disabled || isLoading}
            aria-label="Destination"
          >
            <option value="">Select destination</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
          <span className="caret" aria-hidden>▾</span>
        </div>
      </div>

      {/* Dates - check-in and check-out */}
      <div className="blockDates">
        <div className="dateField">
          <label className="label" htmlFor="sb-start">Check-in</label>
          <input
            id="sb-start"
            className="dateInput"
            type="date"
            value={startIso}
            onChange={(e) => setStartIso(e.target.value)}
            disabled={disabled || isLoading}
            aria-label="Check-in date"
          />
        </div>

        <div className="dateField">
          <label className="label" htmlFor="sb-end">Check-out</label>
          <input
            id="sb-end"
            className="dateInput"
            type="date"
            value={endIso}
            onChange={(e) => setEndIso(e.target.value)}
            disabled={disabled || isLoading}
            aria-label="Check-out date"
          />
        </div>
      </div>

      {/* Search action */}
      <div className="blockAction">
        <button
          type="button"
          className={`button ${isLoading ? 'loading' : ''}`}
          onClick={handleSearch}
          disabled={disabled || isLoading}
          aria-disabled={disabled || isLoading}
        >
          {isLoading ? "Searching…" : "Search"}
        </button>
      </div>

      {/* Error / helper row */}
      <div className="statusRow">
        {error ? <div className="error" role="alert">{error}</div> : <div className="helper" />}
      </div>
    </div>
  );
};

