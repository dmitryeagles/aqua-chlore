import i18n from '@/shared/lib/locale';

const getLocaleOfMonth = (numberOfMonth: number) =>
  i18n.global.t(`calendar.of_month.${numberOfMonth}`);

export default getLocaleOfMonth;
