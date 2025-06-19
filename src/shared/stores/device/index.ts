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
    isLoadingFormButton.value = true;
    try {
      const res = await DeviceService.DeviceAPI.getDeviceMetrics(id);

      console.log(res);
    } finally {
      isLoadingFormButton.value = false;
    }
  };

  const createDevice = async (value: DeviceService.TDevice.IDevice) => {
    isLoadingFormButton.value = true;
    try {
      const res = await DeviceService.DeviceAPI.createDevice(value);

      devices.value = res;
    } finally {
      isLoadingFormButton.value = false;
    }
  };
  const updateDevice = async (value: DeviceService.TDevice.IDevice) => {
    isLoadingFormButton.value = true;
    try {
      const res = await DeviceService.DeviceAPI.updateDevice(value);

      devices.value = res;
    } finally {
      isLoadingFormButton.value = false;
    }
  };
  const deleteDevice = async (id: string) => {
    isLoadingFormButton.value = true;
    try {
      await DeviceService.DeviceAPI.deleteDevice(id);
    } finally {
      isLoadingFormButton.value = false;
    }
  };

  return {
    devices,
    isLoadingDevices,
    fetchDevices,
    getMetricsById,
    createDevice,
    deleteDevice,
    updateDevice,
  };
});
