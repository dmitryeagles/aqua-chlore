<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps<{
  editingDevice?: {
    uuid: string;
    name: string;
    representative: string;
    phone: string;
    address: string;
  } | null;
}>();
const emit = defineEmits(['submit', 'update']);
const visible = defineModel<boolean>('visible', { required: true });
const toast = useToast();

interface DeviceForm {
  name: string;
  representative: string;
  phone: string;
  address: string;
}

const form = ref<DeviceForm>({
  name: '',
  representative: '',
  phone: '',
  address: '',
});

const isEditMode = computed(() => !!props.editingDevice);

watch(
  () => props.editingDevice,
  (newDevice) => {
    if (newDevice) {
      form.value = {
        name: newDevice.name,
        representative: newDevice.representative,
        phone: newDevice.phone,
        address: newDevice.address,
      };
    }
  },
  { immediate: true },
);

const submitForm = () => {
  if (!form.value.name || !form.value.representative || !form.value.phone || !form.value.address) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Заполните все обязательные поля',
      life: 3000,
    });

    return;
  }

  if (isEditMode.value && props.editingDevice) {
    emit('update', {
      uuid: props.editingDevice.uuid,
      ...form.value,
    });
  } else {
    emit('submit', {
      uuid: uuidv4(),
      ...form.value,
      dateCreated: new Date().toISOString(),
      status: 'active',
    });
  }

  closeModal();
};

const closeModal = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = {
    name: '',
    representative: '',
    phone: '',
    address: '',
  };
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    class="px-10"
    :header="isEditMode ? 'Редактировать оборудование' : 'Добавить новое оборудование'"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
  >
    <div class="grid gap-4">
      <div class="field">
        <label
          for="name"
          class="block text-sm font-medium text-surface-600 mb-2"
        >Название оборудования*</label>
        <InputText
          id="name"
          v-model="form.name"
          class="w-full"
          placeholder="Введите название оборудования"
        />
      </div>

      <div class="field">
        <label
          for="representative"
          class="block text-sm font-medium text-surface-600 mb-2"
        >Представитель*</label>
        <InputText
          id="representative"
          v-model="form.representative"
          class="w-full"
          placeholder="Введите ФИО представителя"
        />
      </div>

      <div class="field">
        <label
          for="phone"
          class="block text-sm font-medium text-surface-600 mb-2"
        >Телефон*</label>
        <InputMask
          id="phone"
          v-model="form.phone"
          mask="+7 (999) 999-99-99"
          placeholder="+7 (___) ___-__-__"
          class="w-full"
        />
      </div>

      <div class="field">
        <label
          for="address"
          class="block text-sm font-medium text-surface-600 mb-2"
        >Адрес объекта*</label>
        <Textarea
          id="address"
          v-model="form.address"
          class="w-full"
          rows="3"
          placeholder="Введите адрес объекта"
        />
      </div>
    </div>

    <template #footer>
      <Button
        label="Отмена"
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="closeModal"
      />
      <Button
        :label="isEditMode ? 'Обновить' : 'Сохранить'"
        icon="pi pi-check"
        severity="success"
        @click="submitForm"
      />
    </template>
  </Dialog>
</template>
