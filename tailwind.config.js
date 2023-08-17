/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sideBarBg: '#191718',
        textPrimary: '#FFFFFF',
        textSecondary: '#000000',
        contentBg: '#EFEFEF'
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'sans-serif']
      },
      screens: {
        xs: '480px',
        ss: '620px',
        sm: '768px',
        md: '1060px',
        lg: '1200px',
        xl: '1700px'
      }
    }
  },
  plugins: []
};
