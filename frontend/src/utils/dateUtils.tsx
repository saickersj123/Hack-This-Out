/**
 * Formats a date string into "YYYY-MM-DD HH:mm" format.
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 * @throws Will throw an error if the provided date string is invalid.
 */
export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided.');
  }

  const year = String(date.getFullYear()).slice(-2); // display last 2 digits of year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatRemainingTime = (endDateString: string | Date): string => {
  const now = new Date(); // 현재 시간
  const endDate = new Date(endDateString);

  if (isNaN(endDate.getTime())) {
    throw new Error('Invalid end date string provided.');
  }

  const diff = endDate.getTime() - now.getTime(); // 남은 시간(ms 단위)

  if (diff <= 0) {
    return "Time's up!"; // 시간이 만료된 경우
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // 남은 시간(일)
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24); // 남은 시간(시)
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // 남은 시간(분)

  return `${days}D ${hours}H ${minutes}M`;
};



/**
 * Formats a duration represented as a Date object into "HH:MM:SS" format.
 * The Date object is treated as the epoch plus the duration in milliseconds.
 *
 * @param timeSpent - The duration as a Date object.
 * @returns The formatted time string in "HH:MM:SS" format.
 * @throws Will throw an error if the provided timeSpent is invalid.
 */
export const formatTimeSpent = (timeSpent: Date): string => {
  // Validate input
  if (!(timeSpent instanceof Date) || isNaN(timeSpent.getTime())) {
    throw new Error('Invalid input: timeSpent must be a valid Date object.');
  }

  // Calculate duration in milliseconds from the epoch
  const durationMillis = timeSpent.getTime();

  if (durationMillis < 0) {
    throw new Error('Invalid input: duration cannot be negative.');
  }

  const totalSeconds = Math.floor(durationMillis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Helper function to pad numbers with leading zeros
  const pad = (num: number): string => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

