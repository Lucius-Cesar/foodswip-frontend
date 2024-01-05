/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97247",
        "primary-500": "#f98059",
        magnolia: "#FCFBFF",
        "dark-grey": "#3F3E3F",
        gravel: "#BCBBBC",
        "medium-grey": "#A2A2A2",
        "light-grey": "#eeeeee",
        "light-grey-700": "#d6d6d6",
        "light-pink": "#ECCEC8",
        success: "#01733e",
        "error-danger": "red",
      },

      fontFamily: {
        title: ["Public Sans", "sans-serif"],
        body: ["URW Geometric", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
