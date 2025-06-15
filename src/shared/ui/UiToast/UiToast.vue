<script setup lang="ts">
import type { ToastMessageOptions, ToastPassThroughOptions } from 'primevue';
import ErrorFilledIcon from '@/shared/icons/error-filled.svg?component';
import SuccessFilledIcon from '@/shared/icons/success-filled.svg?component';
import WarningFilledIcon from '@/shared/icons/warning-filled.svg?component';
import { BaseIcon, UiTypography } from '@/shared/ui';

const pt: ToastPassThroughOptions = {
  root: { style: 'top: 70px; right: 80px;' },
  message: {
    class: 'bg-white border-[var(--color-grey-470)] shadow-none',
  },
};

const getCloseBtnClass = (message: ToastMessageOptions | undefined) => {
  switch (message?.severity) {
    case 'success':
      return 'text-successDark';
    case 'error':
      return 'text-errorDark';
    case 'info':
      return 'text-infoDark';
    case 'warn':
      return 'text-warningDark';
    default:
      return '';
  }
};

const getStatusIconName = (message: ToastMessageOptions | undefined) => {
  switch (message?.severity) {
    case 'success':
      return SuccessFilledIcon;
    case 'error':
      return ErrorFilledIcon;
    case 'info':
      return WarningFilledIcon;
    case 'warn':
      return WarningFilledIcon;
    default:
      return '';
  }
};

const getStatusIconClass = (message: ToastMessageOptions | undefined) => {
  switch (message?.severity) {
    case 'success':
      return 'text-[var(--color-green-500)]';
    case 'error':
      return 'text-[var(--color-rose-500)]';
    case 'info':
      return 'text-[var(--color-blue-550)] rotate-180';
    case 'warn':
      return 'text-[var(--color-orange-500)]';
    default:
      return '';
  }
};
</script>

<template>
  <Toast :pt>
    <template #container="{ message, closeCallback }">
      <section class="flex gap-2 p-4">
        <BaseIcon
          v-if="message?.severity !== 'secondary'"
          :icon="getStatusIconName(message)"
          :size="20"
          :class="getStatusIconClass(message)"
          class="mr-3"
        />

        <div class="flex flex-col gap-1 text-blackText">
          <UiTypography
            v-if="message.summary"
            as="p"
            variant="text-base-bold"
          >
            {{ message.summary }}
          </UiTypography>
          <UiTypography
            v-if="typeof message.detail === 'string' || typeof message.detail?.message === 'string'"
            as="p"
            variant="text-sm-normal"
          >
            {{ typeof message.detail === 'string' ? message.detail : message.detail?.message }}
          </UiTypography>
        </div>

        <Button
          size="small"
          rounded
          variant="text"
          class="ml-auto p-0 !h-8 !min-h-8 !w-8 !min-w-8"
          severity="secondary"
          :class="getCloseBtnClass(message)"
          @click="closeCallback"
        >
          <i class="pi pi-times text-sm" />
        </Button>
      </section>
    </template>
  </Toast>
</template>
