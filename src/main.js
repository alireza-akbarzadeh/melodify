import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VeeValidatePlugin from '@/includes/validation';
import { auth } from '@/includes/firebase';

import App from './App.vue';
import router from './router';
import './assets/css/main.css';
import './assets/css/index.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount('#app');
  }
});
