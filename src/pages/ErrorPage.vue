<script setup lang="ts">
import { RouteNames } from '@/shared/lib/constants';
import { UiTypography } from '@/shared/ui';
</script>

<template>
  <div class="h-full w-full flex">
    <div class="flex flex-col items-center w-min m-auto">
      <div
        :class="`
          code-container
          relative
          before:size-5
          after:size-5
          mb-10
          px-3
        `"
      >
        <div
          :class="`
            corners
            absolute
            top-0
            left-0
            w-full
            h-full
            before:size-5
            after:size-5
          `"
        />

        <h1 class="font-unbounded text-[9.25rem] leading-[10rem] font-bold text-center">
          404
        </h1>
      </div>

      <UiTypography
        as="p"
        variant="text-base-normal"
        class="mb-8 text-center text-surface-500"
      >
        {{ $t('not_found.description') }}
      </UiTypography>

      <Button
        as="router-link"
        :to="{ name: RouteNames.HOME }"
        :label="$t('not_found.go_home')"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.code-container::before,
.code-container::after,
.corners::before,
.corners::after {
  content: '';
  position: absolute;
  border: 2px solid var(--color-grey-450);
}

.code-container::before {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.code-container::after {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.corners::before {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.corners::after {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}
</style>
