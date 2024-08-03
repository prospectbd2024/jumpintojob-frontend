module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#007BFF', // Replaced with your primary color
        'primary-link-color': '#3498DB', // Replaced with your primary link color
        'secondary-color': '#cccccc', // Replaced with your secondary color
        'darker-secondary-color': '#616161', // Replaced with your darker secondary color
      },
    },
  },
  plugins: [],
};
