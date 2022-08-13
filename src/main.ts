// #region css imports
// raleway font
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";

// styles
import "@/assets/css/main.css";
import "@/assets/css/text.css";
// #endregion css imports

import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import App from "@/App.vue";
import routes from "virtual:generated-pages";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
