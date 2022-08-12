import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";
import "@/assets/css/main.css";

import { createApp } from "vue";

import router from "@/router/index";
import App from "@/App.vue";

createApp(App).use(router).mount("#app");
