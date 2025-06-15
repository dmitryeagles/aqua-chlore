import tailwindcssPrimeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7',
    'col-span-8',
    'col-span-9',
    'col-span-10',
    'col-span-11',
    'col-span-12',
    'max-w-modal-xs',
    'max-w-modal-sm',
    'max-w-modal-md',
    'max-w-modal-lg',
  ],
  theme: {
    extend: {
      fontFamily: {
        plex: ['"IBM Plex Sans"', 'sans-serif'],
        unbounded: ['"Unbounded"', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.5rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.25rem',
        '5xl': '2.5rem',
      },
      spacing: {
        9.5: '2.375rem', // 38px
        14.5: '3.625rem', // 58px
        15: '3.75rem',
        16: '4rem',
        17: '4.25rem', // for header
        18: '4.5rem', // 72px
        24: '6rem',
        26: '6.5rem',
        34: '8.5rem', // 136px for home
      },
      maxWidth: {
        'modal-xs': '28.125rem', // 450px
        'modal-sm': '40.625rem', // 650px
        'modal-md': '49.875rem', // 798px
        'modal-lg': '59.375rem', // 950px
      },
      colors: {
        // TEXT
        blackText: 'var(--color-black-text)',
        greyText: 'var(--color-grey-text)',
        darkBlueText: 'var(--color-dark-blue-text)',
        headerLink: 'var(--color-header-link)',
        // BG
        bodyBackground: 'var(--color-body-bg)',
        homeBackground: 'var(--color-home-bg)',
        headerBackground: 'var(--color-header-bg)',
        lightBlueBackground: 'var(--color-light-blue-bg)',
        // STATUS
        danger: 'var(--color-danger)',
        warningLight: 'var(--color-warning-light)',
        errorLight: 'var(--color-error-light)',
        infoLight: 'var(--color-info-light)',
        successLight: 'var(--color-success-light)',
        warningDark: 'var(--color-warning-dark)',
        errorDark: 'var(--color-error-dark)',
        infoDark: 'var(--color-info-dark)',
        successDark: 'var(--color-success-dark)',
        grey: {
          300: 'var(--color-grey-300)',
          350: 'var(--color-grey-350)',
          400: 'var(--color-grey-400)',
          450: 'var(--color-grey-450)',
          470: 'var(--color-grey-470)',
          500: 'var(--color-grey-500)',
          600: 'var(--color-grey-600)',
          700: 'var(--color-grey-700)',
          800: 'var(--color-grey-800)',
          900: 'var(--color-grey-900)',
          920: 'var(--color-grey-920)',
          930: 'var(--color-grey-930)',
          950: 'var(--color-grey-950)',
        },
        secondary: 'var(--color-grey-700)',
        primary: {
          700: 'var(--color-blue-600)',
          900: 'var(--color-blue-640)',
        },
      },
      boxShadow: {
        subheader: 'var(--subheader-shadow)',
        sidebar: 'var(--sidebar-shadow)',
        modal: 'var(--modal-shadow)',
      },
      borderRadius: {
        widget: '1.25rem',
      },
    },
  },
  plugins: [tailwindcssPrimeui],
};
