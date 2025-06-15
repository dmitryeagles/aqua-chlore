<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Message Content',
    life: 3000,
  });
};

const showInfo = () => {
  toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
};

const showWarn = () => {
  toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', life: 3000 });
};

const showError = () => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
};

// Данный пример показывает как использовать тост для уведомлений
// ключ detail может быть как строкой, так и объектом
// в будущем можно передать в объект функцию и название кнопки действия
const showNotify = () => {
  toast.add({
    severity: 'secondary',
    summary: 'Notification',
    detail: { message: 'Message Content' },
    life: 3000,
  });
};
</script>

<template>
  <Fieldset
    legend="Toast"
    toggleable
    collapsed
  >
    <div class="flex gap-4 pt-2">
      <Button
        label="Success"
        severity="success"
        @click="showSuccess"
      />
      <Button
        label="Info"
        severity="info"
        @click="showInfo"
      />
      <Button
        label="Warn"
        severity="warn"
        @click="showWarn"
      />
      <Button
        label="Error"
        severity="danger"
        @click="showError"
      />
      <Button
        label="Notify"
        severity="secondary"
        @click="showNotify"
      />
    </div>
  </Fieldset>
</template>
