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
    }
});