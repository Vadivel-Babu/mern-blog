/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#969aff",
        darkblue: "#0005a1",
      },
    },
  },
  plugins: [],
};
