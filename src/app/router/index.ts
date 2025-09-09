import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { RouteNames } from '@/shared/lib/constants';
import { useAuthStore } from '@/shared/stores';
import { devRoutes } from './dev.routes';

const commonRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: () => import('@/pages/HomePage/HomePage.vue'),
    meta: {
      public: true,
      title: 'nav.home',
      module: RouteNames.HOME,
    },
  },
  {
    path: '/login',
    name: RouteNames.SIGNIN,
    component: () => import('@/pages/AuthPage/LoginPage.vue'),
    meta: {
      public: true,
      title: 'nav.login',
      requiresGuest: true,
    },
  },
  {
    path: '/register',
    name: RouteNames.SIGNUP,
    component: () => import('@/pages/AuthPage/RegisterPage.vue'),
    meta: {
      public: true,
      title: 'nav.register',
      requiresGuest: true,
    },
  },
  {
    path: '/:id',
    name: RouteNames.DEVICE,
    component: () => import('@/pages/DevicePage/DevicePage.vue'),
    meta: {
      public: true,
      title: 'nav.device',
    },
  },
  {
    path: '/404',
    name: RouteNames.NOT_FOUND,
    component: () => import('@/pages/ErrorPage.vue'),
    meta: {
      title: 'nav.not_found',
      public: true,
    },
  },
  {
    path: '/:pathMatch(.*)',
    redirect: RouteNames.NOT_FOUND,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...commonRoutes, ...devRoutes],
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Инициализируем авторизацию при первом заходе
  if (!authStore.isAuthenticated && authStore.token) {
    await authStore.initializeAuth();
  }

  // Проверяем, требует ли маршрут авторизации
  const requiresAuth = !to.meta.public;
  const requiresGuest = to.meta.requiresGuest;

  if (requiresAuth && !authStore.isLoggedIn) {
    // Перенаправляем на страницу входа, если пользователь не авторизован
    next({ name: RouteNames.SIGNIN });
  } else if (requiresGuest && authStore.isLoggedIn) {
    // Перенаправляем на главную страницу, если авторизованный пользователь пытается попасть на страницы входа/регистрации
    next({ name: RouteNames.HOME });
  } else {
    next();
  }
});

export default router;
