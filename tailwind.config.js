/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        lavender: "#E6E6FA",
        charcoal: "#36454F",
        lightBlue: "#caf0f8",
        darkBlue: "#0077b6",
      },
    },
    fontFamily: {
      merriweather: ["Merriweather Sans", "sans-serif"],
    },
  },
  plugins: [],
};
