/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
        "fira-sans": ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
