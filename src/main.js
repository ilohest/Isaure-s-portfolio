// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import VueTelInput from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';
import router from './router';

import PrimeVue from 'primevue/config';

// 1) Thème
import 'primevue/resources/themes/lara-light-indigo/theme.css';

// 2) Core + icônes + (optionnel) primeflex
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; // optionnel

// 3) Tailwind après le thème pour pouvoir surcharger
import './assets/tailwind.css';

import './assets/style.css';

// Empêche le navigateur de "restaurer" une position de scroll pour toi
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const app = createApp(App);
app.use(VueTelInput);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
