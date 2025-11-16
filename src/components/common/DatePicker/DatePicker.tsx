import React, { useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  placeholder?: string;
  className?: string;
  format?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate = new Date(),
  maxDate,
  disabledDates = [],
  placeholder = 'Select date',
  className = '',
  format = 'MMM DD, YYYY'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close datepicker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setView('days');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    return format
      .replace('MMM', month)
      .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('YYYY', year.toString());
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if date is in the past
    if (date < today) return true;

    // Check min/max dates
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    // Check disabled dates
    return disabledDates.some(disabledDate =>
      disabledDate.toDateString() === date.toDateString()
    );
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange(date);
      setIsOpen(false);
      setView('days');
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const goToToday = () => {
    const today = new Date();
    if (!isDateDisabled(today)) {
      onChange(today);
      setIsOpen(false);
    }
    setCurrentMonth(new Date());
    setView('days');
  };

  const selectMonth = (month: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(month);
    setCurrentMonth(newDate);
    setView('days');
  };

  const selectYear = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setView('months');
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Generate years for year view (current year - 10 to current year + 10)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className={`${styles.container} ${className}`} ref={datePickerRef}>
      <div
        className={`${styles.input} ${isOpen ? styles.inputFocused : ''} ${value ? styles.hasValue : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value ? formatDate(value) : placeholder}
        </span>
        <div className={styles.calendarIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className={styles.datePicker}>
          {/* Header with navigation */}
          <div className={styles.header}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => view === 'days' ? navigateMonth('prev') : setView('days')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 19L8 12L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={styles.monthYear}>
              {view === 'days' && (
                <button
                  type="button"
                  className={styles.viewToggle}
                  onClick={() => setView('months')}
                >
                  {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
                </button>
              )}
              {view === 'months' && (
                <button
                  type="button"
                  className={styles.viewToggle}
                  onClick={() => setView('years')}
                >
                  {currentMonth.getFullYear()}
                </button>
              )}
              {view === 'years' && (
                <span className={styles.yearRange}>
                  {years[0]} - {years[years.length - 1]}
                </span>
              )}
            </div>

            <button
              type="button"
              className={styles.navButton}
              onClick={() => view === 'days' ? navigateMonth('next') : setView('days')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5L16 12L9 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Calendar Grid */}
          {view === 'days' && (
            <>
              <div className={styles.calendarGrid}>
                {weekDays.map(day => (
                  <div key={day} className={styles.weekDay}>
                    {day}
                  </div>
                ))}

                {calendarDays.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.day} ${date ? (
                      value && date.toDateString() === value.toDateString()
                        ? styles.selected
                        : isDateDisabled(date)
                          ? styles.disabled
                          : styles.available
                    ) : styles.empty
                      } ${date && date.getDate() === new Date().getDate() &&
                        date.getMonth() === new Date().getMonth() &&
                        date.getFullYear() === new Date().getFullYear() ? styles.today : ''}`}
                    onClick={() => date && handleDateSelect(date)}
                    disabled={!date || isDateDisabled(date)}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                ))}
              </div>

              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.todayButton}
                  onClick={goToToday}
                >
                  Today
                </button>
              </div>
            </>
          )}

          {/* Months View */}
          {view === 'months' && (
            <div className={styles.monthsGrid}>
              {months.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  className={`${styles.month} ${currentMonth.getMonth() === index ? styles.selected : ''
                    }`}
                  onClick={() => selectMonth(index)}
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          {/* Years View */}
          {view === 'years' && (
            <div className={styles.yearsGrid}>
              {years.map(year => (
                <button
                  key={year}
                  type="button"
                  className={`${styles.year} ${currentMonth.getFullYear() === year ? styles.selected : ''
                    }`}
                  onClick={() => selectYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;