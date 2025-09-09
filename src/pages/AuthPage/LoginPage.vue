<script setup lang="ts">
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { RouteNames } from '@/shared/lib/constants';
import { useAuthStore } from '@/shared/stores';

const authStore = useAuthStore();
const router = useRouter();

// Схема валидации
const loginSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
    password: z
      .string()
      .min(1, 'Пароль обязателен')
      .min(6, 'Пароль должен содержать минимум 6 символов'),
  }),
);

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: loginSchema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  const success = await authStore.login(values.email, values.password);

  if (success) {
    router.push({ name: RouteNames.HOME });
  }
});

const goToRegister = () => {
  router.push({ name: RouteNames.SIGNUP });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
          <i class="pi pi-user text-primary-600 text-xl" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Вход в систему
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Или
          <button
            type="button"
            class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            @click="goToRegister"
          >
            создайте новый аккаунт
          </button>
        </p>
      </div>

      <Card class="mt-8">
        <template #content>
          <form
            class="space-y-6"
            @submit="onSubmit"
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email адрес
              </label>
              <InputText
                id="email"
                v-model="email"
                v-bind="emailAttrs"
                type="email"
                autocomplete="email"
                placeholder="Введите ваш email"
                class="w-full"
                :class="{ 'p-invalid': errors.email }"
              />
              <small
                v-if="errors.email"
                class="text-red-500 mt-1 block"
              >
                {{ errors.email }}
              </small>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Пароль
              </label>
              <Password
                id="password"
                v-model="password"
                v-bind="passwordAttrs"
                placeholder="Введите ваш пароль"
                class="w-full"
                :class="{ 'p-invalid': errors.password }"
                :feedback="false"
                toggle-mask
              />
              <small
                v-if="errors.password"
                class="text-red-500 mt-1 block"
              >
                {{ errors.password }}
              </small>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <Checkbox id="remember-me" />
                <label
                  for="remember-me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  Запомнить меня
                </label>
              </div>

              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                >
                  Забыли пароль?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                label="Войти"
                class="w-full"
                :loading="authStore.isLoading"
                :disabled="authStore.isLoading"
              />
            </div>
          </form>
        </template>
      </Card>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Нет аккаунта?
          <button
            type="button"
            class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            @click="goToRegister"
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.min-h-screen {
  min-height: 100vh;
}
</style>
