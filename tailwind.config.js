/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: "#141414",
        foreground: "#d8d8d8",
        dimmed_foreground: "#464646",
        background_darker: "#121212",
        background_light: "#161616",
        background_lighter: "#242424",
        black: "#323232",
        blue: "#7cafc2",
        cyan: "#86c1b9",
        green: "#a1b56c",
        magenta: "#ba8baf",
        red: "#ab4642",
        white: "#d8d8d8",
        yellow: "#f7ca88",
      },
    },
  },
  plugins: [],
}
