import { ru } from 'primelocale/js/ru.js';
import PrimeVue from 'primevue/config';
import type { App } from 'vue';
import { definePreset, palette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

// palette returns shades and tints of a given color from 50 to 950 as an object.
const primaryColor = palette('#008DE2');
const surfaceColor = palette('#6C757D');
const dangerColor = palette('#C22121');
const successColor = palette('#009947');
const warningColor = palette('#E04E06');
const darkBlueColor = palette('#006DAF');
const lightBlueColor = palette('#CDECFF');

// сustomise Aura styles here
const CustomAuraPreset = definePreset(Aura, {
  semantic: {
    primary: primaryColor,
    red: dangerColor,
    green: successColor,
    sky: primaryColor, // for status "info"
    orange: warningColor,
    colorScheme: {
      light: {
        surface: surfaceColor,
        formField: {
          hoverBorderColor: '{primary.color}',
          focusRingShadow: 'var(--field-shadow)',
          disabledBackground: 'var(--color-body-bg)',
        },
      },
    },
  },
  components: {
    datepicker: {
      colorScheme: {
        light: {
          dropdown: {
            background: 'var(--color-white)',
          },
        },
      },
    },
    button: {
      css: () => `
        .p-button-nav--active {
          background: ${lightBlueColor['400']} !important;
          color: ${darkBlueColor['500']} !important;
          border-color: ${lightBlueColor['400']} !important;
        }
        .p-button-nav--active:hover {
          background: ${lightBlueColor['500']} !important;
          color: ${darkBlueColor['600']} !important;
          border-color: ${lightBlueColor['500']} !important;
        }
        .p-button-nav--active:active {
          background: ${lightBlueColor['600']} !important;
          color: ${darkBlueColor['600']} !important;
          border-color: ${lightBlueColor['600']} !important;
        }
      `,
    },
    avatar: {
      colorScheme: {
        light: {
          root: {
            xl: {
              width: '7rem',
              height: '7rem',
            },
          },
        },
      },
    },
    dialog: {
      colorScheme: {
        light: {
          root: {
            headerPadding: '22px 0px 22px 0px',
          },
        },
      },
      css: () => `
        .p-dialog-content{
          padding-left: 0px;
          padding-right: 0px;
          padding-bottom: 1rem;
          overflow: hidden;
        }

      `,
    },
  },
});

// https://primevue.org/passthrough/#global
const pt = {
  scrollpanel: {
    barY: {
      class: 'bg-surface-500',
    },
    barX: {
      class: 'bg-surface-500',
    },
  },
  checkbox: {
    box: {
      class: 'border-2',
    },
  },
  radiobutton: {
    box: {
      class: 'border-2',
    },
  },
};

export function setupPrimeVue(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset: CustomAuraPreset,
      options: {
        darkModeSelector: false,
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities',
        },
      },
    },
    ripple: true,
    pt,
    locale: ru,
  });
}
