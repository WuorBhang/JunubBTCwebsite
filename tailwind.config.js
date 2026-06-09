/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bitcoin: "#F7931A",
        "bitcoin-dark": "#E47A0E",
        ink: "#0F0F0F",
        cream: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
