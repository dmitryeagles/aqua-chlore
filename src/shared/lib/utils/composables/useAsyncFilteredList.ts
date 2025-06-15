import { useDebounceFn } from '@vueuse/core';

export interface IFilteredList<T> {
  list: T[];
  totalPages: number;
  totalElements: number;
}

// WARNING: Это черновик! Функция не готова, с бэком еще не определились со стандартом обращения к ендпоинту
export default <T>(
  getListFn: (...args: any[]) => Promise<IFilteredList<T>>,
  params?: {
    page?: Ref<number>;
    sort?: Ref<string>;
    search?: Ref<string>;
    filters?: Record<string, any>;
  },
) => {
  const isLoading = ref(true);
  const list = ref<T[]>([]);
  const totalPages = ref(0);
  const totalElements = ref(0);

  const getFilteredList = async () => {
    isLoading.value = true;

    await getListFn(params)
      .then((res) => {
        list.value = res.list;
        totalPages.value = res.totalPages;
        totalElements.value = res.totalElements;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  const debouncedGetFilteredList = useDebounceFn(getFilteredList, 500);

  const resetPage = () => {
    if (params?.page) {
      params.page.value = 0;
    }
  };

  watch(
    [() => params?.search, () => params?.filters, () => params?.sort],
    () => {
      isLoading.value = true;
      resetPage();
      debouncedGetFilteredList();
    },
    { deep: true },
  );

  watch(
    () => params?.page,
    () => {
      isLoading.value = true;
      debouncedGetFilteredList();
    },
  );

  return {
    list,
    isLoading,
    totalPages,
    totalElements,
    getFilteredList,
    debouncedGetFilteredList,
  };
};
