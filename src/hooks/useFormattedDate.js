import { useMemo } from 'react';

/**
 * Custom Hook to format a date.
 * @param {Date | string} date - The date to format.
 * @returns {string} - The formatted date string.
 */
const useFormattedDate = (date) => {
  return useMemo(() => {
    if (!date) return 'N/A'; // Return 'N/A' if no date is provided

    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();

    let daySuffix;
    if (day % 10 === 1 && day !== 11) {
      daySuffix = 'st';
    } else if (day % 10 === 2 && day !== 12) {
      daySuffix = 'nd';
    } else if (day % 10 === 3 && day !== 13) {
      daySuffix = 'rd';
    } else {
      daySuffix = 'th';
    }

    // Format the date as "day month"
    return `${day}${daySuffix} ${month}`;
  }, [date]);
};

export default useFormattedDate;
