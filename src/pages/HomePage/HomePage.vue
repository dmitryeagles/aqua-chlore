<script setup lang="ts">
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import { useConfirm } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { RouteNames } from '@/shared/lib/constants';
import { useDeviceStore } from '@/shared/stores';
import { UiTypography } from '@/shared/ui';

const toast = useToast();
const deviceStore = useDeviceStore();
const { t } = useI18n();
const confirm = useConfirm();
const error = ref(false);

const { isLoadingDevices, devices } = storeToRefs(deviceStore);

const formatDate = (date: string) => DateTime.fromISO(date).toFormat('dd.MM.yyyy');

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
      v-else
      class="bg-surface-0 border-round-lg shadow-1 overflow-hidden"
    >
      <DataTable :value="devices">
        <Column
          field="name"
          header="Название"
          sortable
        >
          <template #body="{ data }">
            <div class="flex align-items-center gap-3">
              <span class="font-semibold">{{ data.name }}</span>
            </div>
          </template>
        </Column>

        <Column
          field="dateCreated"
          header="Дата регистрации"
          sortable
        >
          <template #body="{ data }">
            <div class="flex align-items-center gap-2">
              <i class="pi pi-calendar text-surface-500" />
              <span>{{ formatDate(data.dateCreated) }}</span>
            </div>
          </template>
        </Column>

        <Column header="Действия">
          <template #body="{ data }">
            <div class="flex gap-2">
              <RouterLink :to="{ name: RouteNames.DEVICE, params: { id: data.uuid } }">
                <Button
                  icon="pi pi-eye"
                  severity="info"
                  text
                  rounded
                />
              </RouterLink>
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                text
                rounded
                @click="
                  toast.add({
                    severity: 'success',
                    summary: 'Редактирование',
                    detail: `Оборудование: ${data.name}`,
                    life: 3000,
                  })
                "
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                @click="handleDelete(data.uuid)"
              />
            </div>
          </template>
        </Column>

        <template #empty>
          <div class="flex flex-col items-center py-6">
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
        </template>
      </DataTable>
    </div>

    <div class="mt-8 flex justify-content-end">
      <Button
        label="Добавить оборудование"
        icon="pi pi-plus"
        severity="success"
        @click="
          toast.add({
            severity: 'success',
            summary: 'Добавление',
            detail: 'Новое оборудование',
            life: 3000,
          })
        "
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.container {
  max-width: 1200px;
}

:deep(.p-datatable) {
  font-family: inherit;
}

:deep(.p-datatable-header) {
  background: transparent;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.25rem 1.5rem;
}

:deep(.p-column-header-content) {
  justify-content: flex-start;
}

:deep(.p-paginator) {
  background: transparent;
  border: none;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}
</style>
