import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';
import i18n from '@/shared/lib/locale';
import { useToastService } from '@/shared/lib/utils';
import { DeviceService } from '@/shared/api';


export const useDeviceStore = defineStore('device', () => {
  const toastService = useToastService();
  const isLoadingFormButton = ref(false);

  const {
    state: deviceData,
    isLoading: isLoadingDeviceData,
    execute: fetchDeviceData,
  } = useAsyncState(DeviceService.DeviceAPI.getMetrics, null, {
    immediate: false,
    shallow: false,
  });

  const updateMetrics = async (value: boolean) => {
    isLoadingFormButton.value = true;
    await DeviceService.DeviceAPI.updateMetrics(value)
      .then((res) => {
        deviceData.value = res,
        toastService.success(
          i18n.global.t('message.success_updated', { title: i18n.global.t('label.device_data') }),
        );
      })
      .finally(() => {
        isLoadingFormButton.value = false;
      });
  };


  return {
    isLoadingFormButton,
    isLoadingDeviceData,
    deviceData,
    fetchDeviceData,
    updateMetrics,
  };
});
