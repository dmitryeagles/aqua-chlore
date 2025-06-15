<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import {
  BaseIcon,
  UiCard,
  UiTypography,
} from '@/shared/ui';
import ToastDemo from './ui/ToastDemo.vue';

const confirm = useConfirm();

const callConfirmDialog = (severity?: string) => {
  confirm.require({
    header: 'Сохранить черновик?',
    message: 'Чтобы не потерять заполненные вами данные, сохраните черновик.',
    acceptProps: {
      label: 'Сохранить черновик',
      severity,
    },
    rejectProps: {
      label: 'Закрыть без сохранения',
      severity,
      variant: 'outlined',
    },
    accept: () => {},
    reject: () => {},
  });
};

const name = ref('user');
const toggle = () => {
  name.value = name.value === 'user' ? 'bell-ringing' : 'user';
};

const selectedMultySelectItems = ref<string[]>([]);

watch(selectedMultySelectItems, (newVal) => {
  console.log('selectedMultySelectItems:', newVal);
});

</script>

<template>

  <div class="flex flex-col gap-2">
    <UiTypography
      as="h1"
      variant="h1-upper"
      class="text-danger"
    >
      Development
    </UiTypography>

    <Fieldset
      legend="Buttons"
      toggleable
      collapsed
    >
      <div class="flex items-center flex-wrap gap-2 pt-2">

        <Button size="large">
          <UiTypography
            as="span"
            variant="text-sm-semibold"
          >
            Primary default large-size 44px
          </UiTypography>
        </Button>

        <Button @click="toggle">
          <BaseIcon
            :icon="name"
            :size="16"
          />
          <UiTypography
            as="span"
            variant="text-sm-semibold"
          >
            Primary default normal-size 38px
          </UiTypography>
        </Button>

        <Button severity="secondary">
          <UiTypography
            as="span"
            variant="text-sm-semibold"
          >
            Secondary default
          </UiTypography>
        </Button>

        <Button
          severity="secondary"
          variant="text"
        >
          <UiTypography
            as="span"
            variant="text-sm-semibold"
          >
            Secondary text
          </UiTypography>
        </Button>

        <Button
          severity="danger"
          variant="outlined"
        >
          <UiTypography
            as="span"
            variant="text-sm-semibold"
          >
            Danger outlined
          </UiTypography>
        </Button>
      </div>
    </Fieldset>

    <Fieldset
      legend="Badges"
      toggleable
      collapsed
    >
      <div class="flex items-center flex-wrap gap-2 pt-2">
        <Badge
          class="tag-1"
          value="1"
          size="small"
        />
        <Badge
          class="tag-1"
          value="1"
        />
        <Badge
          class="tag-2"
          value="2"
        />
        <Badge
          class="tag-3"
          value="3"
        />
        <Badge
          class="tag-4"
          value="4"
        />
        <Badge
          class="tag-5"
          value="5"
        />
        <Badge
          class="tag-6"
          value="6"
        />
        <Badge
          class="tag-7"
          value="7"
        />
        <Badge
          class="tag-8"
          value="8"
        />
        <Badge
          class="tag-9"
          value="9"
        />
        <Badge
          class="tag-11"
          value="11"
        />
        <Badge
          class="tag-12"
          value="12"
        />
        <Badge
          class="tag-13"
          value="13"
        />
        <Badge
          class="tag-14"
          value="14"
        />
        <Badge
          class="tag-15"
          value="15"
        />
        <Badge
          class="tag-16"
          value="16"
        />
        <Badge
          class="tag-17"
          value="17"
        />
        <Badge
          class="tag-18"
          value="18"
        />
        <Badge
          class="tag-19"
          value="19"
        />
        <Badge value="primary" />
        <Badge
          value="secondary"
          severity="secondary"
        />
        <Badge
          value="success"
          severity="success"
        />
        <Badge
          value="info"
          severity="info"
        />
        <Badge
          value="warn"
          severity="warn"
        />
        <Badge
          value="danger"
          severity="danger"
        />
        <Badge
          value="contrast"
          severity="contrast"
        />
      </div>
    </Fieldset>

    <Fieldset
      legend="Fields"
      toggleable
      collapsed
    >
      <div class="flex items-center flex-wrap gap-2 pt-2">
        <InputText placeholder="Normal size" />
        <InputText
          placeholder="Small size"
          size="small"
        />

        <div class="flex flex-col gap-1">
          <UiTypography
            as="label"
            variant="text-sm-normal"
            class="text-surface-500"
          >
            Some label
          </UiTypography>
          <InputText
            placeholder="Invalid"
            invalid
          />
          <Message
            size="small"
            severity="error"
            variant="simple"
          >
            Field is invalid
          </Message>
        </div>

        <div class="flex flex-col gap-1">
          <UiTypography
            as="label"
            variant="text-sm-normal"
            class="text-surface-500"
          >
            Some label
          </UiTypography>
          <InputText placeholder="Help text" />
          <Message
            size="small"
            severity="secondary"
            variant="simple"
          >
            Enter some text
          </Message>
        </div>
      </div>
    </Fieldset>

    <Fieldset
      legend="Card"
      toggleable
      collapsed
    >
      <pre>
    props:
    -border?
    -grey?
  </pre>

      <UiCard border>
        <template #header>
          <div>#header(optional)</div>
        </template>
        <template #body>
          <div>#body</div>
        </template>
      </UiCard>
    </Fieldset>

    <Fieldset
      legend="ConfirmDialog"
      toggleable
      collapsed
    >
      <div class="pt-4">
        <Button
          label="Удалить"
          severity="danger"
          @click="callConfirmDialog('danger')"
        />
        <Button
          label="Сохранить"
          @click="callConfirmDialog()"
        />
      </div>
    </Fieldset>

    <Fieldset
      legend="Paginator"
      toggleable
      collapsed
    />
    <Paginator
      :rows="10"
      :total-records="120"
      :rows-per-page-options="[10, 20, 30]"
    />

    <ToastDemo />
  
  </div>
</template>
