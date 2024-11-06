/**
 * ![UTILS]!
 */

/**
 * Generate a random number in the specified range
 * @param {number} min
 * @param {number} max
 * @returns
 */
export const generateRandomNumInRange = (min = 0, max = 1) =>
  Math.random() * (max - min) + min;

/**
 * Generate a unique id
 * @returns
 */
export const generateId = () => {
  return `id-${Date.now()}`;
};
