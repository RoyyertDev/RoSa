/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./public/js/**/*.js",
    "./public/svg/**/*.svg",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blueClaro: "#1943FA",
        blueOscuro: "#01091d",
        blueMedio: "#040427",
      },
    },
  },
  variants: {
    extend: {
      fill: ["dark"],
      borderColor: ["focus-within", "hover"],
    },
  },
  plugins: [],
};
