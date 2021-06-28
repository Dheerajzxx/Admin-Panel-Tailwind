module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        teal:{
          50: '#edfafa',
          100: '#d5f5f6',
          200: '#afecef',
          300: '#7edce2',
          400: '#16bdca',
          500: '#0694a2',
          600: '#047481',
          700: '#036672',
          800: '#05505c',
          900: '#014451',
        },
      primary:'#0694a2',
      secondary:'#374151',
      },
      width: {
        '95.5': '95.5%',
      },
      boxShadow: {
        'shadow1': '0px 16px 8px rgba(0,0,0,0.4)',
      },
      borderRadius: {
        '3': '3rem',
      },
    },
  },
  // variants: {
  //   extend: {},
  // },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded'],
    extend: {
    backgroundColor: ['checked'],
    borderColor: ['checked'],
    borderRadius:['checked'],
  },
}
}
