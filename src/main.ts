import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import '@/assets/css/main.css';
import '@m3e/icons/outlined';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
