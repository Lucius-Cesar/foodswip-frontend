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
        sans: ["sans-serif"],
        title: ['var(--font-public-sans)", "sans-serif'],
        body: ["var(--font-urw-geometric)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "tilt-shaking-delay": {
          "0%": { transform: "rotate(0deg)" },
          "12.5%": { transform: "rotate(10deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "32.5%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "tilt-shaking-delay": "tilt-shaking-delay 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
