/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkness: {
          100: '#212529',
          200: '#000',
        },
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif']
      },
    },
  },
  plugins: [],
}

