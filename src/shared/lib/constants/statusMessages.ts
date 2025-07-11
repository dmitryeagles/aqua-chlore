export const StatusMessages = {
  APPROVED: 'Данные одобрены',
  ON_MODERATION: 'На модерации',
  ON_MODERATION_FOR_DELETION: 'На модерации по удалению',
  DECLINED_BY_THE_CUSTOMER: 'Данные отклонены',
  PUBLISHED_MATERIAL: 'Материал опубликован',
  PUBLISHED: 'Опубликовано',
  PUBLISHING: 'Опубликована',
  DECLINED_MATERIAL: 'Материал отклонён',
  DECLINED: 'Отклонён',
  DELETED: 'Удалён',
  BLOCKED: 'Заблокирован',
  FINISHED: 'Завершена',
  ACTIVE: 'Активен',
  ACTIVATED: 'Активна',
  PLANNED: 'Запланирована',
  SENT: 'Отправлена',
  COMPANY_WITH_A_LINK_TO_THE_SITE: 'Компания с вами свяжется',
  REFUSED_TO_WORK: 'Отклик взят в работу',
  REFUSED: 'Отказ',
  NOT_ON_CONSIDERATION: 'На рассмотрении',
  REFUSED_ON_CONSIDERATION: 'Отклик на рассмотрении',
  CONFIRMED: 'Подтверждена',
  DECLINED_BY_CUSTOMER: 'Отклонена',
  DECLINED_BY_SYSTEM: 'Отклонено',
  DRAFT: 'Черновик',
  HIDDEN: 'Скрыта',
  ARCHIVE: 'В архиве',
} as const;

export const StatusIcons = {
  APPROVED: 'icon-ok-filled',
  ON_MODERATION: 'warning-filled',
  ON_MODERATION_FOR_DELETION: 'warning-filled',
  DECLINED_BY_THE_CUSTOMER: 'x-circle',
  PUBLISHED_MATERIAL: 'icon-ok-filled',
  PUBLISHED: 'icon-ok-filled',
  PUBLISHING: 'icon-ok-filled',
  DECLINED_MATERIAL: 'x-circle',
  DECLINED: 'x-circle',
  DELETED: 'x-circle',
  BLOCKED: 'prohibit',
  FINISHED: 'icon-ok-filled',
  ACTIVE: 'icon-ok-filled',
  ACTIVATED: 'icon-ok-filled',
  PLANNED: 'hourglass-high',
  SENT: 'icon-ok-filled',
  COMPANY_WITH_A_LINK_TO_THE_SITE: 'icon-ok-filled',
  REFUSED_TO_WORK: 'icon-ok-filled',
  REFUSED: 'x-circle',
  NOT_ON_CONSIDERATION: 'warning-filled',
  REFUSED_ON_CONSIDERATION: 'warning-filled',
  CONFIRMED: 'icon-ok-filled',
  DECLINED_BY_CUSTOMER: 'x-circle',
  DECLINED_BY_SYSTEM: 'x-circle',
  ARCHIVE: 'archive',
  DRAFT: 'file-text',
  HIDDEN: 'eye',
} as const;

export const StatusColors = {
  APPROVED: 'text-[var(--color-green-600)]',
  ON_MODERATION: 'text-[var(--color-orange-700)]',
  ON_MODERATION_FOR_DELETION: 'text-[var(--color-orange-700)]',
  DECLINED_BY_THE_CUSTOMER: 'text-[var(--color-red-500)]',
  PUBLISHED_MATERIAL: 'text-[var(--color-green-600)]',
  PUBLISHED: 'text-[var(--color-green-600)]',
  PUBLISHING: 'text-[var(--color-green-600)]',
  DECLINED_MATERIAL: 'text-[var(--color-red-500)]',
  DECLINED: 'text-[var(--color-red-500)]',
  DELETED: 'text-[var(--color-red-500)]',
  BLOCKED: 'text-[var(--color-red-500)]',
  FINISHED: 'text-[var(--color-grey-700)]',
  ACTIVE: 'text-[var(--color-green-600)]',
  ACTIVATED: 'text-[var(--color-green-600)]',
  PLANNED: 'text-[var(--color-orange-700)]',
  SENT: 'text-[var(--color-green-600)]',
  COMPANY_WITH_A_LINK_TO_THE_SITE: 'text-[var(--color-green-600)]',
  REFUSED_TO_WORK: 'text-[var(--color-green-600)]',
  REFUSED: 'text-[var(--color-red-500)]',
  NOT_ON_CONSIDERATION: 'text-[var(--color-orange-700)]',
  REFUSED_ON_CONSIDERATION: 'text-[var(--color-orange-700)]',
  CONFIRMED: 'text-[var(--color-green-600)]',
  DECLINED_BY_CUSTOMER: 'text-[var(--color-red-500)]',
  DECLINED_BY_SYSTEM: 'text-[var(--color-red-500)]',
  ARCHIVE: 'text-[var(--color-grey-700)]',
  DRAFT: 'text-[var(--color-grey-700)]',
  HIDDEN: 'text-[var(--color-grey-700)]',
} as const;
