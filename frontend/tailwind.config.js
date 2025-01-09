/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        jet: '#333333',
        onyx: '#0F0F29',
        'eerie-black-1': '#1E1E35',
        'eerie-black-2': '#1C1C32',
        'smoky-black': '#111111',
        'smoky-gray': '#383838',
        'gray': '#9f9f9f',
        white: '#FFFFFF',
        litewhite: '#FAFAFA',
        'orange-yellow-crayola': '#FFA823',
        'vegas-gold': '#FFC254',
        'light-gray': '#D6D6D6',
        'light-gray-70': 'rgba(214, 214, 214, 0.7)',
        'bittersweet-shimmer': '#FF6E84',
        'primary': '#0056b3',
        'primary-dark': '#004494',
        'secondary': '#f0f0f0',
        'accent': '#ff4500',
      },
      backgroundImage: {
        'smoky-black': '#121212',
        'eerie-black': '#1e1e1f',
        'smoky-gray': '#39393a',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      fontWeight: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'slide': 'slide 1s infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(36px, 0)' },
          '50%': { transform: 'translate(36px, 36px)' },
          '75%': { transform: 'translate(0, 36px)' },
          '100%': { transform: 'translate(0, 0)' },
        }
      },
      minHeight: {
        'screen-75': '75vh',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary-dark'),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'disabled'],
      textColor: ['active', 'disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
