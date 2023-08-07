import {createApp} from 'vue'
import './assets/css/styles.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router.js";
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const pinia = createPinia();

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Vue3Toastify);

app.mount('#app')
