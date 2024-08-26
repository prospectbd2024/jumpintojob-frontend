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
            maxWidth: {
                // Custom max-width values
                'screen-md': '720px',  // Custom value for max-w-screen-md
                'screen-lg': '960px',  // Custom value for max-w-screen-lg
                'screen-xl': '450px', // Custom value for max-w-screen-xl
                'screen-2xl': '780px', // Custom value for max-w-screen-2xl
            },
        },
    },
    plugins: [],
};
