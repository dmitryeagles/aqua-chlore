<script setup lang="ts">
import { DateTime } from 'luxon';
import { UiCard, UiTypography } from '@/shared/ui';

const props = defineProps<{
  data: {
    type: string;
    name: string;
    value: string | boolean;
    updatedAt?: string;
  };
}>();

const updatedAt = computed(() => {
  if (!props.data.updatedAt) {
    return 'только что';
  }
  const dateTime = DateTime.fromISO(props.data.updatedAt);

  return dateTime.toFormat('dd.MM.yyyy HH:mm:ss');
});

const ControlElements = {
  pump1: 'Насос 1',
  pump2: 'Насос 2',
  valve1: 'Клапан/кран 1',
  valve2: 'Клапан/кран 2',
  power: 'Питание',
  du: 'Датчик уровня',
  current: 'Ток',
  pressure: 'Давление',
  water_flow: 'Поток воды',
  chlore_flow: 'Поток хлора',
} as const;

const formatValue = (value: string | number | boolean, isValve: boolean): string => {
  if (typeof value === 'boolean') {
    if (!isValve) {
      return value ? 'Включен' : 'Выключен';
    } else {
      return value ? 'Открыт' : 'Закрыт';
    }
  }

  return String(value);
};

const getStatusIconClass = (value: boolean | string) => {
  if (typeof value !== 'boolean') {
    return 'text-primary-500';
  }

  switch (value) {
    case true:
      return 'text-[var(--color-green-500)]';
    case false:
      return 'text-[var(--color-rose-500)]';
    default:
      return 'text-primary-500';
  }
};

const getControlElementDescription = (key: keyof typeof ControlElements): string =>
  ControlElements[key];
</script>

<template>
  <UiCard
    border
    class="data-card"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <UiTypography
          variant="text-base-semibold"
          class="text-surface-900"
        >
          {{ getControlElementDescription(data.name as keyof typeof ControlElements) }}
        </UiTypography>
      </div>
    </template>

    <template #body>
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <i
            class="pi pi-chart-line text-primary-500"
            style="font-size: 1rem"
          />
          <UiTypography variant="text-sm-normal">
            Значение:
          </UiTypography>
          <UiTypography
            variant="text-sm-semibold"
            :class="getStatusIconClass(data.value)"
          >
            {{ formatValue(data.value, data.name === 'valve1' || data.name === 'valve2') }}
          </UiTypography>
        </div>

        <div class="flex items-center gap-2 mt-1">
          <i
            class="pi pi-clock text-surface-400"
            style="font-size: 1rem"
          />
          <UiTypography
            variant="text-xs-normal"
            class="text-surface-500"
          >
            Обновлено: {{ updatedAt }}
          </UiTypography>
        </div>
      </div>
    </template>
  </UiCard>
</template>

<style scoped lang="postcss">
.data-card {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
}
</style>
