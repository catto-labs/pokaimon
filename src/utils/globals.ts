/** Wait for `ms` milliseconds. */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Returns an integer between min (inclusive) and max (exclusive). */
export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/** Copy `text` to the user's clipboard. */
export const copyToClipboard = (text: string) =>
  navigator.clipboard.writeText(text);

/** Capitalize the first letter of `str`. */
export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** Show + sign when formatting numbers to string. */
export const showPlusSign = (n: number) => (n > 0 ? "+" : "") + n;
