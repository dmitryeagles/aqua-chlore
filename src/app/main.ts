import './styles/style.pcss';
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import i18n from '@/shared/lib/locale';
import { DateMask } from '@/shared/lib/utils';
import App from './App.vue';
import { setupPrimeVue } from './plugins/prime-vue';
import router from './router';

export const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(ToastService);
app.use(ConfirmationService);

app.directive('date-mask', DateMask);
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);

setupPrimeVue(app);

router.isReady().then(() => {
  app.mount('#app');
});

// @ts-expect-error: для проверки переменных
window.VITE_APP_MODE = import.meta.env.VITE_APP_MODE;
// @ts-expect-error: для проверки переменных
window.VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;
// @ts-expect-error: для проверки переменных
window.VITE_MINIO_URL = import.meta.env.VITE_MINIO_URL;
