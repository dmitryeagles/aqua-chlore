<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTitle } from '@vueuse/core';
import { UiConfirmDialog, UiToast } from '@/shared/ui';

const route = useRoute();
const { t } = useI18n();

const title = computed(
  () => `${t('title.bas')}${route.meta.title ? ` | ${t(String(route.meta.title))}` : ''}`,
);

useTitle(title);
</script>

<template>
  <component>
    <UiConfirmDialog />
    <RouterView />
  </component>
  <UiToast />
</template>
