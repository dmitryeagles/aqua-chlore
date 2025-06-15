<script setup lang="ts">
defineProps<{
  border?: boolean;
  grey?: boolean;
  clickable?: boolean;
  bodyClasses?: string;
}>();
</script>

<template>
  <div
    data-testid="ui-card"
    class="ui-card bg-white overflow-hidden rounded-2xl flex flex-col w-full"
    :class="{
      border,
      grey,
      'hover:shadow-modal cursor-pointer': clickable,
    }"
  >
    <div
      v-if="$slots.header"
      class="px-5 py-2"
      :class="`bg-[var(--color-grey-300)]`"
    >
      <slot name="header" />
    </div>
    <div
      class="p-5"
      :class="bodyClasses"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.ui-card.border {
  border-color: var(--color-grey-400);
}

.ui-card.grey {
  background: var(--color-grey-300);
}
</style>
