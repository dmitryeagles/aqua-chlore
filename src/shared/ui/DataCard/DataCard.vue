<script setup lang="ts">
import { UiCard, UiTypography } from '@/shared/ui';

const props = defineProps<{
  data: {
    type: string;
    name: string;
    value: string;
    updatedAt?: Date;
  };
}>();

const updatedAt = computed(() => {
  if (!props.data.updatedAt) {
    return 'только что';
  }

  return props.data.updatedAt.toLocaleTimeString();
});
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
          {{ data.name }}
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
            class="text-primary-500"
          >
            {{ data.value }}
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
