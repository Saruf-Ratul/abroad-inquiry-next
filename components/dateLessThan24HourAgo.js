/**
 * Check is a date is less than 24 hrs.
 * @param {Date} date 
 * @returns {Date}
 */
export function isLessThan24HourAgo(date) {
    // 👇️                    hour  min  sec  milliseconds
    const twentyFourHrInMs = 24 * 60 * 60 * 1000;
  
    const twentyFourHoursAgo = Date.now() + twentyFourHrInMs;
  
    return new Date(date).getTime() < new Date().getTime();
  }
  