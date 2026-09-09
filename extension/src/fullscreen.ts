import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FullscreenApp from './FullscreenApp.vue';
import '@/assets/css/main.css';
import '@m3e/icons/outlined';

const app = createApp(FullscreenApp);

app.use(createPinia());

app.mount('#app');
