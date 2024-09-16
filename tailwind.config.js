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
                'screen-xl': '850px', // Custom value for max-w-screen-xl
                'screen-2xl': '800px', // Custom value for max-w-screen-2xl
            },
            borderWidth: {
                '3': '3px', // Make sure to include this if it's not present
            },
            borderColor: {
                'custom-gray': 'rgb(183 183 183 / 81%)' // Custom gray border color
            },
            boxShadow: {
                'custom-shadow': '0 4px 10px -1px rgba(183, 183, 183, 0.5), 0 1px 10px rgba(183, 183, 183, 0.5)' // Custom shadow color
            }
        },
    },
    plugins: [],
};
