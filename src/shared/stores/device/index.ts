import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';
import { DeviceService } from '@/shared/api';

export const useDeviceStore = defineStore('device', () => {
  const isLoadingFormButton = ref(false);

  const {
    state: devices,
    isLoading: isLoadingDevices,
    execute: fetchDevices,
  } = useAsyncState(DeviceService.DeviceAPI.getDevices, null, { immediate: false });

  const getMetricsById = async (id: string) => {
    (isLoadingFormButton.value = true),
      await DeviceService.DeviceAPI.getDeviceMetrics(id)
        .then((resp) => {
          console.log(resp);
        })
        .finally(() => {
          isLoadingFormButton.value = false;
        });
  };

  return {
    devices,
    isLoadingDevices,
    fetchDevices,
    getMetricsById,
  };
});
