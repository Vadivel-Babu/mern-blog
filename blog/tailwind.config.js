/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#42f584",
        darkgreen: "#076921",
      },
    },
  },
  plugins: [],
};
