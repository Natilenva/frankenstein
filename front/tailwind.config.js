/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {

            fontFamily: {
                myFontFamily: [ 'Nunito', 'sans-serif' ],
              },
        
              colors: {
                'frankgreen': '#829821',
              },

        },
    },
    plugins: [],
};
