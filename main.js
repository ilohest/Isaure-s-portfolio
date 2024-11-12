import { createApp } from 'vue';
import App from './App.vue';
import router from './src/router/index.js';

// Création et montage de l'application Vue
createApp(App).use(router).mount('#app');