module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bi: {
          400: '#966CF0',
          300: '#6E3DD6',
          200: '#D1D5DB',
          100: '#EEF0F1',
        },
      },
      fontFamily: {
        merriweather: "'Merriweather' , 'Noto Sans Arabic'",
      },
      minWidth: {
        prose: '65ch',
        kratos: '1600px',
        atreus: '1200px',
      },
      maxWidth: {
        kratos: '1600px',
        atreus: '1200px',
      },
    },
    screens: {
      xs: '520px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
