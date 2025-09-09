<script setup lang="ts">
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { RouteNames } from '@/shared/lib/constants';
import { useAuthStore } from '@/shared/stores';

const authStore = useAuthStore();
const router = useRouter();

// Схема валидации
const registerSchema = toTypedSchema(
  z
    .object({
      email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
      password: z
        .string()
        .min(1, 'Пароль обязателен')
        .min(6, 'Пароль должен содержать минимум 6 символов'),
      confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
      firstName: z
        .string()
        .min(1, 'Имя обязательно')
        .min(2, 'Имя должно содержать минимум 2 символа'),
      lastName: z
        .string()
        .min(1, 'Фамилия обязательна')
        .min(2, 'Фамилия должна содержать минимум 2 символа'),
      middleName: z.string().optional(),
      phone: z
        .string()
        .optional()
        .refine((val) => {
          if (!val) {
            return true; // Поле необязательное
          }

          // Простая проверка на российский номер телефона
          const phoneRegex =
            /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

          return phoneRegex.test(val);
        }, 'Введите корректный номер телефона'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    }),
);

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: registerSchema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');
const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [middleName, middleNameAttrs] = defineField('middleName');
const [phone, phoneAttrs] = defineField('phone');

const onSubmit = handleSubmit(async (values) => {
  const success = await authStore.register({
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName || undefined,
    phone: values.phone || undefined,
  });

  if (success) {
    router.push({ name: RouteNames.SIGNIN });
  }
});

const goToLogin = () => {
  router.push({ name: RouteNames.SIGNIN });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
          <i class="pi pi-user-plus text-primary-600 text-xl" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Регистрация
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Или
          <button
            type="button"
            class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            @click="goToLogin"
          >
            войдите в существующий аккаунт
          </button>
        </p>
      </div>

      <Card class="mt-8">
        <template #content>
          <form
            class="space-y-6"
            @submit="onSubmit"
          >
            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email адрес *
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

            <!-- Пароль -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Пароль *
              </label>
              <Password
                id="password"
                v-model="password"
                v-bind="passwordAttrs"
                placeholder="Введите пароль"
                class="w-full"
                :class="{ 'p-invalid': errors.password }"
                :feedback="true"
                toggle-mask
              />
              <small
                v-if="errors.password"
                class="text-red-500 mt-1 block"
              >
                {{ errors.password }}
              </small>
            </div>

            <!-- Подтверждение пароля -->
            <div>
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Подтвердите пароль *
              </label>
              <Password
                id="confirmPassword"
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                placeholder="Подтвердите пароль"
                class="w-full"
                :class="{ 'p-invalid': errors.confirmPassword }"
                :feedback="false"
                toggle-mask
              />
              <small
                v-if="errors.confirmPassword"
                class="text-red-500 mt-1 block"
              >
                {{ errors.confirmPassword }}
              </small>
            </div>

            <!-- Фамилия -->
            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Фамилия *
              </label>
              <InputText
                id="lastName"
                v-model="lastName"
                v-bind="lastNameAttrs"
                placeholder="Введите фамилию"
                class="w-full"
                :class="{ 'p-invalid': errors.lastName }"
              />
              <small
                v-if="errors.lastName"
                class="text-red-500 mt-1 block"
              >
                {{ errors.lastName }}
              </small>
            </div>

            <!-- Имя -->
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Имя *
              </label>
              <InputText
                id="firstName"
                v-model="firstName"
                v-bind="firstNameAttrs"
                placeholder="Введите имя"
                class="w-full"
                :class="{ 'p-invalid': errors.firstName }"
              />
              <small
                v-if="errors.firstName"
                class="text-red-500 mt-1 block"
              >
                {{ errors.firstName }}
              </small>
            </div>

            <!-- Отчество -->
            <div>
              <label
                for="middleName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Отчество
              </label>
              <InputText
                id="middleName"
                v-model="middleName"
                v-bind="middleNameAttrs"
                placeholder="Введите отчество (необязательно)"
                class="w-full"
                :class="{ 'p-invalid': errors.middleName }"
              />
              <small
                v-if="errors.middleName"
                class="text-red-500 mt-1 block"
              >
                {{ errors.middleName }}
              </small>
            </div>

            <!-- Телефон -->
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Номер телефона
              </label>
              <InputText
                id="phone"
                v-model="phone"
                v-bind="phoneAttrs"
                placeholder="+7 (999) 123-45-67"
                class="w-full"
                :class="{ 'p-invalid': errors.phone }"
              />
              <small
                v-if="errors.phone"
                class="text-red-500 mt-1 block"
              >
                {{ errors.phone }}
              </small>
            </div>

            <div>
              <Button
                type="submit"
                label="Зарегистрироваться"
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
          Уже есть аккаунт?
          <button
            type="button"
            class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            @click="goToLogin"
          >
            Войти
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
