const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        successfulHover: "#298267",
        successful: "#3ac0a0",
        successfulSecondary: "#e7f4e8",
        bgLight: "#fff",
        mainSoil: "#503a3a",
        mainGreen: "#45594e",
        warningHover: "#e86339",
        warning: "#ffb37c",
        warningSecondary: "#fff4e4",
        errorHover: "#ed3241",
        error: "#ff616d",
        errorSecondary: "#ffe2e5",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      playWrite: "Playwrite GB S",
    },
  },
  plugins: [],
  plugins: [nextui()],
};
