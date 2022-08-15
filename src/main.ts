// #region css imports
// raleway font
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";

// roboto mono
import "@fontsource/roboto-mono/400.css";

// styles
import "@/assets/css/main.css";
import "@/assets/css/text.css";
import "@/assets/css/transitions.css";

// tippy.js animations and styles
import "@/assets/css/tippy.css";
import "tippy.js/animations/shift-away.css";
// #endregion css imports

import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import App from "@/App.vue";
import routes from "virtual:generated-pages";

import tippy from "vue-tippy";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .use(tippy, {
    defaultProps: { animation: "shift-away" },
  })
  .mount("#app");
