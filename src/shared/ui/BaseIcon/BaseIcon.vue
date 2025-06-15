<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import FallbackIcon from './ui/FallbackIcon.vue';

const props = defineProps<{
  icon: string | Component;
  size: number;
  height?: number;
}>();
const iconComponent = ref();

const loadComponent = async (name: string) => {
  try {
    const res = await import(`@/shared/icons/${name}.svg?component`);

    iconComponent.value = res;
  } catch {
    console.error('Не найдена иконка:', name);
  }
};

watch(
  () => props.icon,
  (newVal) => {
    if (typeof newVal === 'string') {
      loadComponent(newVal);
    }
  },
);

onMounted(() => {
  if (typeof props.icon === 'string') {
    loadComponent(props.icon);
  }
});
</script>

<template>
  <component
    :is="typeof icon !== 'string' ? icon : (iconComponent ?? FallbackIcon)"
    :width="`${size}px`"
    :height="`${height || size}px`"
    :style="{
      minWidth: `${size}px`,
      minHeight: `${height || size}px`,
    }"
  />
</template>
