import { app } from '@/app/main';
import i18n from '@/shared/lib/locale';

function useToastService() {
  const success = (detail: string) => {
    app?.config.globalProperties.$toast.add({
      severity: 'success',
      summary: i18n.global.t('label.success'),
      detail,
      life: 3000,
    });
  };

  const error = (detail: string) => {
    app?.config.globalProperties.$toast.add({
      severity: 'error',
      summary: i18n.global.t('label.error'),
      detail,
      life: 3000,
    });
  };

  return {
    success,
    error,
  };
}

export default useToastService;
