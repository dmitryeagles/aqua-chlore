import { createI18n } from 'vue-i18n';
import en from './en.json';
import ru from './ru.json';

// example 'нет бананов | {n} банан | {n} банана | {n} бананов'
function customRule(choice: number, choicesLength: number) {
  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;

  if (!teen && endsWithOne) {
    return 1;
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return choicesLength < 4 ? 2 : 3;
}

const i18n = createI18n({
  seo: true,
  legacy: false,
  locale: 'ru',
  globalInjection: true,
  fallbackLocale: 'en',
  pluralRules: {
    ru: customRule,
  },
  messages: {
    ru,
    en,
  },
});

export default i18n;
