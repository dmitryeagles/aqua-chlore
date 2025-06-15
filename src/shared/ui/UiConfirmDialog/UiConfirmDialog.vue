<script setup lang="ts">
import { type ConfirmDialogPassThroughOptions, useConfirm } from 'primevue';
import { UiTypography } from '@/shared/ui';

const confirm = useConfirm();

const pt: ConfirmDialogPassThroughOptions = {
  root: {
    class: `
      w-full
      md:max-w-modal-xs
      p-8
      h-max
      max-h-[90dvh]
      md:max-h-[80dvh]
      mt-auto
      md:mt-[initial]
      rounded-b-none
      md:rounded-b-[var(--p-dialog-border-radius)]
    `,
  },
};
</script>

<template>
  <ConfirmDialog :pt>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex justify-between gap-6 w-full mb-4">
        <UiTypography
          v-if="message.header"
          as="h3"
          variant="h3"
          class="mt-1"
        >
          {{ message.header }}
        </UiTypography>

        <Button
          rounded
          variant="text"
          severity="secondary"
          class="!max-w-8 !max-h-8 !min-w-8 !min-h-8"
          @click="confirm.close"
        >
          <i class="pi pi-times text-sm" />
        </Button>
      </div>

      <div
        v-if="message.message"
        class="overflow-y-auto overflow-x-hidden"
      >
        <!-- без py-[1px] появляется скролл у текста, даже если он в одну строчку -->
        <UiTypography
          as="p"
          variant="text-base-normal"
          class="w-full py-[1px]"
        >
          {{ message.message }}
        </UiTypography>
      </div>

      <Button
        size="large"
        v-bind="message.acceptProps"
        class="mt-4 mb-3"
        @click="acceptCallback"
      />

      <Button
        size="large"
        v-bind="message.rejectProps"
        @click="rejectCallback"
      />
    </template>
  </ConfirmDialog>
</template>
