const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: ["./css/**/*.css", "./index.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          500: colors.green[500],
        },
      },
      transitionProperty: {
        width: "width",
      },
      boxShadow: {
        "3xl": "0 40px 55px -15px rgb(0, 0, 0, 0.5)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
