// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // register your new font under a key
        jakarta: ['"Plus Jakarta Sans"', 'sans‑serif'],
      },
    },
  },
  plugins: [],
}
