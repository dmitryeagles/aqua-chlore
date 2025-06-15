import type { RouteRecordRaw } from 'vue-router';

export let devRoutes: Readonly<RouteRecordRaw[]> = [];

if (import.meta.env.VITE_APP_MODE === 'development') {
  devRoutes = [
    {
      path: '/dev',
      name: 'dev',
      component: () => import('@/pages/DevPage/DevPage.vue'),
      meta: {
        public: true,
      },
    },
  ];
}
