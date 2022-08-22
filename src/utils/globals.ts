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

export const konamiCodeHandler = (callback: () => unknown) => {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
  ];

  // A variable to remember the 'position' the user has reached so far.
  let konamiCodePosition = 0;

  return (e: KeyboardEvent) => {
    // Get the value of the required key from the Konami code.
    const requiredKey = konamiCode[konamiCodePosition];

    // Compare the key with the required key.
    if (e.code == requiredKey) {
      // Move to the next key in the Konami code sequence.
      konamiCodePosition++;

      // If the last key is reached, activate "cheats".
      if (konamiCodePosition == konamiCode.length) {
        callback();

        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  };
};
