<script setup lang="ts">
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import { useConfirm } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { DeviceModal } from '@/features';
import type { DeviceService } from '@/shared/api';
import { RouteNames } from '@/shared/lib/constants';
import { useDeviceStore } from '@/shared/stores';
import { UiTypography } from '@/shared/ui';

const toast = useToast();
const deviceStore = useDeviceStore();
const { t } = useI18n();
const confirm = useConfirm();
const error = ref(false);

const { isLoadingDevices, devices } = storeToRefs(deviceStore);

const modalVisible = ref(false);
const editingDevice = ref(null);

const formatDate = (date: string) => DateTime.fromISO(date).toFormat('dd.MM.yyyy');

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Работает';
    case 'warning':
      return 'Требует внимания';
    case 'error':
      return 'Неисправно';
    default:
      return 'Неизвестно';
  }
};

const handleDelete = (id: string) => {
  confirm.require({
    header: t('title.delete_title', { title: t('title.device') }),
    message: t('message.delete_confirm_title', { title: 'оборудования' }),
    rejectProps: {
      label: t('button.cancel'),
      outlined: true,
      size: 'large',
      severity: 'danger',
    },
    acceptProps: {
      label: t('button.yes_delete'),
      size: 'large',
      severity: 'danger',
    },
    accept: () => {
      toast.add({
        severity: 'error',
        summary: 'Удаление',
        detail: `Оборудование: ${id} удалено`,
        life: 3000,
      });
    },
    reject: () => {},
  });
};

const handleAddDevice = (newDevice: DeviceService.TDevice.IDevice) => {
  deviceStore.createDevice(newDevice);
};

const handleUpdateDevice = (updatedDevice: DeviceService.TDevice.IDevice) => {
  deviceStore.updateDevice(updatedDevice);
};

const handleEditClick = (device: any) => {
  editingDevice.value = device;
  modalVisible.value = true;
};

const handleAddClick = () => {
  editingDevice.value = null;
  modalVisible.value = true;
};

onMounted(() => {
  deviceStore.fetchDevices();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <UiTypography
        as="h1"
        variant="h1-upper"
        class="text-primary mb-4"
      >
        Список оборудования
      </UiTypography>

      <UiTypography
        variant="text-base-normal"
        class="text-surface-600 mb-6"
      >
        Все зарегистрированные в системе единицы оборудования. Для получения детальной информации
        выберите оборудование из списка.
      </UiTypography>
    </div>

    <div
      v-if="isLoadingDevices"
      class="flex justify-center py-12"
    >
      <ProgressSpinner />
    </div>

    <div
      v-else-if="error"
      class="bg-danger-50 p-6 rounded-lg text-center"
    >
      <i
        class="pi pi-exclamation-circle text-danger-500 mx-auto mb-3"
        style="font-size: 2rem"
      />
      <UiTypography
        variant="text-sm-normal"
        class="text-danger-700 mb-2"
      >
        Ошибка загрузки данных
      </UiTypography>
      <UiTypography
        variant="text-base-normal"
        class="text-surface-700 mb-4"
      >
        Не удалось загрузить список оборудования. Попробуйте обновить страницу.
      </UiTypography>
      <Button
        severity="danger"
        @click="deviceStore.fetchDevices()"
      >
        <i
          class="pi pi-refresh"
          style="font-size: 1rem"
        />
        <span>Повторить попытку</span>
      </Button>
    </div>

    <div
      v-else-if="devices"
      class="grid gap-6"
    >
      <div
        v-for="device in devices"
        :key="device.uuid"
        class="bg-surface-0 border-round-lg shadow-1 p-6"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <UiTypography
              variant="h3"
              class="text-primary mb-1"
            >
              {{ device.name }}
            </UiTypography>
            <div class="flex items-center gap-2 mb-3">
              <i class="pi pi-calendar text-surface-500" />
              <UiTypography
                variant="text-sm-normal"
                class="text-surface-600"
              >
                Дата регистрации: {{ formatDate(device.dateCreated) }}
              </UiTypography>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span
              class="w-3 h-3 rounded-full"
              :class="getStatusColor(device.status)"
            />
            <UiTypography
              variant="text-sm-normal"
              class="text-surface-600"
            >
              {{ getStatusText(device.status) }}
            </UiTypography>
          </div>
        </div>

        <div class="grid gap-4 mb-6">
          <div class="flex items-start gap-3">
            <i class="pi pi-user text-surface-500 mt-1" />
            <div>
              <UiTypography
                variant="text-sm-normal"
                class="text-surface-500 mb-1"
              >
                Представитель
              </UiTypography>
              <UiTypography
                variant="text-base-normal"
                class="text-surface-700"
              >
                {{ device.representative }}
              </UiTypography>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <i class="pi pi-phone text-surface-500 mt-1" />
            <div>
              <UiTypography
                variant="text-sm-normal"
                class="text-surface-500 mb-1"
              >
                Телефон
              </UiTypography>
              <UiTypography
                variant="text-base-normal"
                class="text-surface-700"
              >
                {{ device.phone }}
              </UiTypography>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <i class="pi pi-map-marker text-surface-500 mt-1" />
            <div>
              <UiTypography
                variant="text-sm-normal"
                class="text-surface-500 mb-1"
              >
                Адрес объекта
              </UiTypography>
              <UiTypography
                variant="text-base-normal"
                class="text-surface-700"
              >
                {{ device.address }}
              </UiTypography>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <RouterLink :to="{ name: RouteNames.DEVICE, params: { id: device.uuid } }">
              <Button
                icon="pi pi-eye"
                label="Просмотр"
                severity="info"
                outlined
              />
            </RouterLink>
            <Button
              icon="pi pi-pencil"
              label="Редактировать"
              severity="secondary"
              outlined
              @click="handleEditClick(device)"
            />
          </div>
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            rounded
            @click="handleDelete(device.uuid)"
          />
        </div>
      </div>

      <div
        v-if="devices.length === 0"
        class="flex flex-col items-center py-6"
      >
        <i
          class="pi pi-inbox text-surface-400 mb-3"
          style="font-size: 3rem"
        />
        <UiTypography
          variant="text-sm-normal"
          class="text-surface-600 mb-1"
        >
          Оборудование не найдено
        </UiTypography>
        <UiTypography
          variant="text-sm-normal"
          class="text-surface-500"
        >
          Добавьте новое оборудование в систему
        </UiTypography>
      </div>
    </div>

    <div class="mt-8 flex justify-content-end">
      <Button
        label="Добавить оборудование"
        icon="pi pi-plus"
        severity="success"
        @click="handleAddClick"
      />
    </div>

    <DeviceModal
      v-model:visible="modalVisible"
      :editing-device="editingDevice"
      @submit="handleAddDevice"
      @update="handleUpdateDevice"
    />
  </div>
</template>

<style scoped lang="postcss">
.container {
  max-width: 1200px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
