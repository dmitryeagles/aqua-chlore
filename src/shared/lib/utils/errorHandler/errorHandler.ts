import axios from 'axios';
import i18n from '@/shared/lib/locale';
import type { IError, IException, IResponse } from '@/shared/lib/types';
import { useToastService } from '@/shared/lib/utils';

export class ApiError extends Error {
  constructor(public errors: (IError | IException)[]) {
    super(errors[0]?.message || 'Unknown error');
    this.name = 'ApiError';
  }
}

export function handleApiResponse<T>(response: IResponse<T>): IResponse<T> {
  if (!response.status && (response.errors.length || response.exceptions?.length)) {
    throw new ApiError(response.exceptions || response.errors);
  }

  return response;
}

export function handleApiError(error: unknown): never {
  const toastService = useToastService();

  if (error instanceof ApiError) {
    error.errors.forEach((err) => {
      const message = err.message || 'Неизвестная ошибка';

      toastService.error(i18n.global.t(message));
    });
  } else if (axios.isAxiosError(error)) {
    toastService.error(i18n.global.t('message.network_error'));
  } else {
    toastService.error(i18n.global.t('message.something_went_wrong'));
  }

  throw error;
}
