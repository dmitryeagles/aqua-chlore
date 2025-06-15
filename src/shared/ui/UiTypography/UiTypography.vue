<script setup lang="ts">
import type { TypographyTag, TypographyVariant } from './UiTypography.types';

withDefaults(
  defineProps<{
    as?: TypographyTag;
    variant?: TypographyVariant;
    label?: string;
  }>(),
  {
    as: 'p',
    variant: 'text-base-normal',
  },
);
</script>

<template>
  <component
    :is="as"
    :class="variant"
  >
    <slot>{{ label }}</slot>
  </component>
</template>
