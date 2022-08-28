module.exports = {
  content: ['./src/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif']
      },
      colors: {
        primary: {
          medium: '#4a77e5',
          dark: '#1f2a4b'
        },
        secondary: {
          lighter: '#f6f7f8',
          light: '#e1e1e1',
          medium: '#a1a4ad',
          dark: '#d7dae0'
        }
      }
    }
  },
  variants: {
    extend: {}
  }
};
