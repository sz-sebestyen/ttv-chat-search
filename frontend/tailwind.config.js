const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./public/index.html",
    "./src/**/*.jsx",
    "./src/pages/**/*.jsx",
    "./src/components/**/*.jsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FF984F",
        "primary-dark": "#702E00",
        secondary: "#4BB0DB",
        background: "#121212",
        surface: "#1F1F1F",
        violet: colors.violet,
        transparent: "transparent",
        current: "currentColor",
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        green: colors.emerald,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
