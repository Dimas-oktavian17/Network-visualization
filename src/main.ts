import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue/client'; // <--
import App from './App.vue';
import router from './router';
import JsonExcel from "vue-json-excel3";

const app = createApp(App);
const head = createHead();
app.component('download-excel', JsonExcel);
app.use(createPinia());
app.use(router);
app.use(head);
app.mount('#app');
