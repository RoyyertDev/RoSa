/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./public/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        blueClaro: "#1943FA",
        blueOscuro: "#01091d",
        blueMedio: "#040427",
      },
    },
  },
  plugins: [],
};
