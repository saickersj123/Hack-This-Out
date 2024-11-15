export const avatarUrls: string[] = [
  '../assets/img/machines/computer1.png',
  '../assets/img/machines/computer2.png',
  '../assets/img/machines/computer3.png',
  '../assets/img/machines/computer4.png',
  '../assets/img/machines/computer5.png',
  '../assets/img/machines/computer6.png',
  // Add more URLs or keep it dynamic as needed
];

export const avatarBackgroundColors: string[] = [
  '#f44336', // Red
  '#e91e63', // Pink
  '#9c27b0', // Purple
  '#3f51b5', // Indigo
  '#2196f3', // Blue
  '#4caf50', // Green
  '#ff9800', // Orange
  '#795548', // Brown
  '#607d8b', // Blue Grey
  '#00bcd4', // Cyan
  // Add more colors for greater variation
];

/**
 * Assigns a consistent avatar index based on a unique identifier.
 *
 * @param {string | undefined} id - The unique identifier of the entity.
 * @returns {number} - The index of the avatar to use.
 */
export const getAvatarIndex = (id?: string): number => {
  if (!id) {
    return 0; // Default avatar index
  }
  const hash = id
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % avatarUrls.length;
};

/**
 * Assigns a consistent background color index based on a unique identifier.
 *
 * @param {string | undefined} id - The unique identifier of the entity.
 * @returns {number} - The index of the background color to use.
 */
export const getAvatarColorIndex = (id?: string): number => {
  if (!id) {
    return 0; // Default color index
  }
  const hash = id
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % avatarBackgroundColors.length;
}; 