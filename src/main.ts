import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "@/assets/css/main.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";

createApp(App).use(router).mount("#app");
