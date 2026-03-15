import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';

// 1) Theme
import 'primevue/resources/themes/lara-light-indigo/theme.css';

// 2) Core + icons + (optional) primeflex
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// 3) Tailwind after the theme for overrides
import './assets/tailwind.css';

import './assets/style.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
