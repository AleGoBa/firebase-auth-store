import {createApp} from 'vue'
import './assets/css/styles.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router.js";
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {createVfm} from "vue-final-modal";
import 'vue-final-modal/style.css'
import {vue3Spinner} from 'vue3-spinner'

const app = createApp(App)

app.use(router)
app.use(vue3Spinner)
app.use(Vue3Toastify);
app.use(createPinia())
app.use(createVfm());

app.mount('#app')
