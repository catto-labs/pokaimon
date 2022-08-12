/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // other important colours
      brand: {
        main: "#FB7185",
        second: "#C084FC",
      },

      // text colours
      head: "#F3F4F6",
      body: "#E5E7EB",
      note: "#9CA3AF",

      // other colours
      danger: "#F87171",
      warn: "#FDE047",
      success: "#34D399",

      // shades of grey
      grey: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
        DEFAULT: "#4B5563",
      },

      // etc
      white: "#F3F4F6",
      black: "#1F2937",
      red: "#EF4444",
      orange: "#FB923C",
      yellow: "#ffc82c",
      green: "#4ADE80",
      blue: "#38BDF8",
      purple: "#A78BFA",
      fuchsia: "#E879F9",
      pink: "#F472B6",
      rose: "#FB7185",
    },
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
