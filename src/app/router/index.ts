import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { RouteNames } from '@/shared/lib/constants';
import { devRoutes } from './dev.routes';

const commonRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: () => import('@/pages/Home/HomePage.vue'),
    meta: {
      public: true,
      title: 'nav.home',
      module: RouteNames.HOME,
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

export default router;
