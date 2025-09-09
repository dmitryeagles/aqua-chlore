import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { AuthAPI } from '@/shared/api/authService';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
    userFullName: (state) => {
      if (!state.user) {
        return '';
      }

      const { firstName, lastName, middleName } = state.user;

      return middleName ? `${lastName} ${firstName} ${middleName}` : `${lastName} ${firstName}`;
    },
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true;
      const toast = useToast();

      try {
        const response = await AuthAPI.getToken({ username: email, password });

        this.token = response.jwtToken;
        this.refreshToken = response.refreshToken;
        this.isAuthenticated = true;

        // Сохраняем токены в localStorage
        localStorage.setItem('token', response.jwtToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Вы успешно вошли в систему',
          life: 3000,
        });

        return true;
      } catch (error: any) {
        console.error('Login error:', error);

        toast.add({
          severity: 'error',
          summary: 'Ошибка входа',
          detail: error.response?.data?.message || 'Неверный email или пароль',
          life: 5000,
        });

        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async register(userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      middleName?: string;
      phone?: string;
    }) {
      this.isLoading = true;
      const toast = useToast();

      try {
        // Создаем FormData для отправки
        const formData = new FormData();

        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        if (userData.middleName) {
          formData.append('middleName', userData.middleName);
        }

        if (userData.phone) {
          formData.append('phone', userData.phone);
        }

        const success = await AuthAPI.createUser(formData);

        if (success) {
          toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Регистрация прошла успешно. Теперь вы можете войти в систему.',
            life: 5000,
          });

          return true;
        } else {
          throw new Error('Ошибка регистрации');
        }
      } catch (error: any) {
        console.error('Registration error:', error);

        toast.add({
          severity: 'error',
          summary: 'Ошибка регистрации',
          detail: error.response?.data?.message || 'Произошла ошибка при регистрации',
          life: 5000,
        });

        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;

      // Удаляем токены из localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      const toast = useToast();

      toast.add({
        severity: 'info',
        summary: 'Выход',
        detail: 'Вы вышли из системы',
        life: 3000,
      });
    },

    async refreshAuthToken() {
      if (!this.refreshToken || !this.token) {
        this.logout();

        return false;
      }

      try {
        const response = await AuthAPI.refreshToken({
          refreshToken: this.refreshToken,
          jwtToken: this.token,
        });

        this.token = response.jwtToken;
        this.refreshToken = response.refreshToken;

        localStorage.setItem('token', response.jwtToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        return true;
      } catch (error) {
        console.error('Token refresh error:', error);
        this.logout();

        return false;
      }
    },

    // Инициализация при загрузке приложения
    async initializeAuth() {
      if (this.token && this.refreshToken) {
        // Проверяем валидность токена
        try {
          // Здесь можно добавить запрос для получения информации о пользователе
          // или проверки валидности токена
          this.isAuthenticated = true;
        } catch (error) {
          console.error('Auth initialization error:', error);
          this.logout();
        }
      }
    },
  },
});
