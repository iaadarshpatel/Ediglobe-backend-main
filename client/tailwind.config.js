const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
      fontFamily: {
        'typo-round-thin': ['"Typo Round Thin Demo"', 'sans-serif'],
      },
      colors: {
        black: '#000000', 
        customGray: '#263238',
      },
      ringColor: {
        DEFAULT: '#000000', // Sets the default ring color to black
      },
      borderColor: {
        DEFAULT: '#000000', // Set the default border color to black
      },
    }
});