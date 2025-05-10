import { createApp } from "vue";
import App from "./App.vue";
import './style.css';
import PrimeVue from "primevue/config";
import Nora from "@primeuix/themes/nora";

createApp(App).use(
    PrimeVue, {
    theme: {
        preset: Nora
    }
}
).mount('#app');
