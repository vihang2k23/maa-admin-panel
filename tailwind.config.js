/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009EC1', // Matching logo color
        dark: '#00546E',
      },
    },
  },
  plugins: [],
};
