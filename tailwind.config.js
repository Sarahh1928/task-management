/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-bg': '#1F2937', // This matches the bg-gray-800 we used in the sidebar
      },
    },
  },
  plugins: [],
}
