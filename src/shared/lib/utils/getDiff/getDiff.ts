import { DateTime } from 'luxon';
import i18n from '@/shared/lib/locale';

export const getDiff = (startDate: string, endDate: string) => {
  const start = DateTime.fromISO(startDate).setLocale('ru');
  const end = DateTime.fromISO(endDate).setLocale('ru');
  const diff = end.diff(start, ['years', 'months', 'days']).toObject();

  return (['years', 'months', 'days'] as const)
    .filter((key) => Math.floor(diff[key] || 0))
    .map((key) => i18n.global.t(`date.${key}`, Math.floor(diff[key]!)))
    .join(' ');
};
