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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
