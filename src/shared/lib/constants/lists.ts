import i18n from '@/shared/lib/locale';
import { STATUS_VISIBLE } from './statusVisible';

export const visibilityOtherUser = [
  { name: 'Видно всем', code: true },
  { name: 'Только мне', code: false },
];

export const visibilityItemList = [
  { name: i18n.global.t('label.visibility_all'), code: STATUS_VISIBLE.ALL },
  { name: i18n.global.t('label.visibility_contacts'), code: STATUS_VISIBLE.CONTACTS },
  { name: i18n.global.t('label.visibility_me'), code: STATUS_VISIBLE.ME },
];
