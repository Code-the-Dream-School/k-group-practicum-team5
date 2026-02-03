/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zooGreen: "#2F6F3E",
        zooDark: "#1F3D2B",
        zooLight: "#EAF4ED",
        zooOrange: "#E67E22",
      },
    },
  },
  plugins: [],
};
