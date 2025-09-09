<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTitle } from '@vueuse/core';
import { useAuthStore } from '@/shared/stores';
import { UiConfirmDialog, UiToast } from '@/shared/ui';

const route = useRoute();
const { t } = useI18n();
const authStore = useAuthStore();

const title = computed(
  () => `${t('title.bas')}${route.meta.title ? ` | ${t(String(route.meta.title))}` : ''}`,
);

useTitle(title);

// Инициализируем авторизацию при загрузке приложения
onMounted(async () => {
  await authStore.initializeAuth();
});
</script>

<template>
  <div>
    <UiConfirmDialog />
    <RouterView />
  </div>
  <UiToast />
</template>
