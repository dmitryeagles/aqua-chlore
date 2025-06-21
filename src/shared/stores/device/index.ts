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

  const {
    state: metricsById,
    isLoading: isLoadingMetrics,
    execute: fetchMetricsById,
  } = useAsyncState((id: string) => DeviceService.DeviceAPI.getDeviceMetrics(id), null, {
    immediate: false,
    shallow: false,
  });

  const createDevice = async (value: DeviceService.TDevice.IDevice) => {
    isLoadingFormButton.value = true;
    try {
      const res = await DeviceService.DeviceAPI.createDevice(value);

      if (!devices.value) {
        return;
      }
      devices.value.unshift(res);
    } finally {
      isLoadingFormButton.value = false;
    }
  };

  const updateDevice = async (value: DeviceService.TDevice.IDevice) => {
    isLoadingFormButton.value = true;
    try {
      const res = await DeviceService.DeviceAPI.updateDevice(value);
      const idx = devices.value?.findIndex((i) => i.uuid === res.uuid);

      if (!idx || idx === -1) {
        return;
      }
      if (!devices.value) {
        return;
      }
      devices.value[idx] = res;
    } finally {
      isLoadingFormButton.value = false;
    }
  };
  const deleteDevice = async (id: string) => {
    isLoadingFormButton.value = true;
    try {
      await DeviceService.DeviceAPI.deleteDevice(id);

      if (!devices.value) {
        return;
      }

      devices.value = devices.value.filter((i) => i.uuid !== id);
    } finally {
      isLoadingFormButton.value = false;
    }
  };

  return {
    devices,
    metricsById,
    isLoadingDevices,
    isLoadingMetrics,
    fetchDevices,
    fetchMetricsById,
    createDevice,
    deleteDevice,
    updateDevice,
  };
});
