/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A'
      },
      gridTemplateRows: {
        7: 'reapeat(7, minmax(0, 1fr))'
      },
      gridTemplateColumns:{
        7: 'reapeat(7, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
}
