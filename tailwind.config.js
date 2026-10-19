/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: '#f0f9fa',
          100: '#dbeef0',
          200: '#b8dde2',
          300: '#8ac4cc',
          400: '#5aa5b0',
          500: '#3d8895',
          600: '#326e7a',
          700: '#2c5860',
          800: '#284a50',
          900: '#243f44',
        },
      },
    },
  },
  plugins: [],
};
