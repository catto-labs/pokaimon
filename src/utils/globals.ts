export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Returns an integer between min (inclusive) and max (exclusive)
 */
export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
