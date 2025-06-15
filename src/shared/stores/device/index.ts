import { defineStore } from 'pinia';
import { useAsyncState } from '@vueuse/core';
import { DeviceService } from '@/shared/api';
import i18n from '@/shared/lib/locale';
import { useToastService } from '@/shared/lib/utils';
import type { TDevice } from '../../api/deviceService';

type DeviceState = {
  device: TDevice.IDevice | null;
  metrics: TDevice.IDeviceMetricValue[];
};

export const useDeviceStore = defineStore('device', () => {
  const toastService = useToastService();
  const isLoadingFormButton = ref(false);

  const defaultDeviceState = useAsyncState<DeviceState>(
    async () => {
      const [device] = await DeviceService.DeviceAPI.getDevices();
      const metrics = await DeviceService.DeviceAPI.getDeviceMetrics(device.uuid);

      return { device, metrics };
    },
    {
      device: null,
      metrics: [],
    },
  );

  const currentDevice = ref(defaultDeviceState.state.value.device);

  const updateMetrics = async (value: boolean) => {
    isLoadingFormButton.value = true;
    await DeviceService.DeviceAPI.updateMetrics(value)
      .then(() => {
        if (currentDevice.value?.uuid == null) {
          throw new Error('Device UUID is null or undefined');
        }

        return DeviceService.DeviceAPI.getDeviceMetrics(currentDevice.value?.uuid);
      })
      .then((res) => {
        defaultDeviceState.state.value.metrics = res;
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
    isLoadingDeviceData: defaultDeviceState.isLoading,
    deviceData: defaultDeviceState.state,
    fetchDeviceData: defaultDeviceState.execute,
    updateMetrics,
  };
});
