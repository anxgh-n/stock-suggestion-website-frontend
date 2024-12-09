/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'red-hat': ['"Red Hat Display"', 'sans-serif'],
      },
      animation: {
        scrollTicker: "scrollTicker 200s linear infinite",
        'slide-in-left': 'slideInFromLeft 3.5s ease-out forwards',
      'slide-in-right': 'slideInFromRight 3.5s ease-out forwards',
      },
      keyframes: {
        scrollTicker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
