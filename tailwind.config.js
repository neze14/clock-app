/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '806px',
      xl: '1050px',
    },
    backgroundImage: {
      "day-mobile": "url('/src/assets/mobile/bg-image-daytime.jpg')",
      "day-tablet": "url('/src/assets/tablet/bg-image-daytime.jpg')",
      "day-desktop": "url('/src/assets/desktop/bg-image-daytime.jpg')",
      "night-mobile": "url('/src/assets/mobile/bg-image-nighttime.jpg')",
      "night-tablet": "url('/src/assets/tablet/bg-image-nighttime.jpg')",
      "night-desktop": "url('/src/assets/desktop/bg-image-nighttime.jpg')",
    },
    letterSpacing: {
      wide: '0.2rem',
    },
    extend: {},
  },
  plugins: [],
}

