<!-- eslint-disable vue/no-static-inline-styles -->
<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useDeviceStore } from '@/shared/stores';
import { DataCard, UiTypography } from '@/shared/ui';

const toast = useToast();
const installationData = ref<any[]>([]);
const loading = ref(true);
const error = ref(false);
const lastUpdate = ref<Date>();
let pollingInterval: ReturnType<typeof setInterval>;

const deviceStore = useDeviceStore();

const fetchData = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockData = [
      {
        type: 'TEMPERATURE',
        name: 'Реактор №1',
        value: `${Math.floor(250 + Math.random() * 50)}°C`,
        status: Math.random() > 0.8 ? 'warning' : 'normal',
        updatedAt: new Date(),
      },
      {
        type: 'PRESSURE',
        name: 'Компрессор А2',
        value: `${Math.floor(15 + Math.random() * 5)} атм`,
        status: Math.random() > 0.9 ? 'critical' : 'normal',
        updatedAt: new Date(),
      },
      {
        type: 'VOLTAGE',
        name: 'Генератор Г3',
        value: `${Math.floor(6000 + Math.random() * 500)} В`,
        updatedAt: new Date(),
      },
      {
        type: 'CURRENT',
        name: 'Линия передачи',
        value: `${Math.floor(1200 + Math.random() * 300)} А`,
        updatedAt: new Date(),
      },
      {
        type: 'FLOW_RATE',
        name: 'Трубопровод В4',
        value: `${Math.floor(120 + Math.random() * 20)} м³/ч`,
        updatedAt: new Date(),
      },
      {
        type: 'TEMPERATURE',
        name: 'Охладитель С1',
        value: `${Math.floor(80 + Math.random() * 10)}°C`,
        updatedAt: new Date(),
      },
    ];

    if (installationData.value.length === 0) {
      installationData.value = mockData;
    } else {
      mockData.forEach((newItem, index) => {
        if (index < installationData.value.length) {
          Object.assign(installationData.value[index], newItem);
        }
      });
    }

    lastUpdate.value = new Date();
    error.value = false;

    if (loading.value) {
      toast.add({
        severity: 'success',
        summary: 'Данные получены',
        detail: 'Мониторинг запущен',
        life: 3000,
      });
    }
  } catch (e) {
    console.error('Ошибка получения данных:', e);
    error.value = true;

    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось обновить данные',
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  deviceStore.fetchDeviceData();
  fetchData();
  pollingInterval = setInterval(fetchData, 5000);
});

onBeforeUnmount(() => {
  clearInterval(pollingInterval);
});

const formattedTime = computed(() => {
  if (!lastUpdate.value) {
    return '';
  }

  return lastUpdate.value.toLocaleTimeString();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-2">
        <UiTypography
          as="h1"
          variant="h1-upper"
          class="text-primary"
        >
          Мониторинг установки
        </UiTypography>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <Badge severity="success" />
            <UiTypography variant="text-sm-normal">
              Норма
            </UiTypography>
          </div>
          <div class="flex items-center gap-2">
            <Badge severity="warning" />
            <UiTypography variant="text-sm-normal">
              Предупреждение
            </UiTypography>
          </div>
          <div class="flex items-center gap-2">
            <Badge severity="danger" />
            <UiTypography variant="text-sm-normal">
              Критично
            </UiTypography>
          </div>
        </div>
      </div>

      <UiTypography
        variant="text-base-normal"
        class="text-surface-600 mb-4"
      >
        Реальный мониторинг параметров оборудования. Данные обновляются автоматически.
      </UiTypography>

      <div class="flex flex-wrap items-center gap-4 bg-surface-50 p-4 rounded-lg">
        <div class="flex items-center gap-2">
          <i
            class="pi pi-sync text-primary-500 animate-spin"
            style="font-size: 1rem"
          />
          <UiTypography variant="text-sm-semibold">
            Автообновление:
          </UiTypography>
          <UiTypography
            variant="text-sm-normal"
            class="text-surface-700"
          >
            каждые 5 секунд
          </UiTypography>
        </div>

        <div class="flex items-center gap-2">
          <i
            class="pi pi-clock text-surface-500"
            style="font-size: 1rem"
          />
          <UiTypography variant="text-sm-semibold">
            Последнее обновление:
          </UiTypography>
          <UiTypography
            variant="text-sm-normal"
            class="text-surface-700"
          >
            {{ formattedTime }}
          </UiTypography>
        </div>

        <Button
          severity="secondary"
          size="small"
          @click="fetchData"
        >
          <i
            class="pi pi-refresh"
            style="font-size: 1rem"
          />
          <span>Обновить сейчас</span>
        </Button>
      </div>
    </div>

    <div
      v-if="loading"
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
        Не удалось получить данные с сервера. Попробуйте обновить страницу.
      </UiTypography>
      <Button
        severity="danger"
        @click="fetchData"
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
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <DataCard
        v-for="(item, index) in installationData"
        :key="index"
        :data="item"
      />
    </div>

    <div class="mt-10 pt-6 border-t border-surface-200">
      <UiTypography
        variant="h2-upper"
        class="mb-4"
      >
        О системе мониторинга
      </UiTypography>
      <UiTypography
        variant="text-base-normal"
        class="text-surface-700"
      >
        Система обеспечивает непрерывный контроль параметров работы установки в реальном времени.
        Все данные обновляются автоматически каждые 5 секунд. Критические изменения параметров
        выделяются цветом для быстрого визуального определения проблемных зон.
      </UiTypography>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
