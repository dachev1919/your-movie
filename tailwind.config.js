/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        secondary: '#3a366b',
        header: '#292841',
        body: '#1C1B29',
      },
      screens: {
        'mobile': {
          max: '768px'
        },
        'ultra-xl': {
          max: '575px'
        }
      }
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp')
  ],
}
