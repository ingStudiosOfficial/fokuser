import { createApp } from 'vue';
import { createPinia } from 'pinia';
import SettingsApp from './SettingsApp.vue';
import '@/assets/css/main.css';
import '@m3e/icons/outlined';

const app = createApp(SettingsApp);

app.use(createPinia());

app.mount('#app');
