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

import tippy from "vue-tippy";
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import App from "@/App.vue";
import routes from "virtual:generated-pages";

import { store, initialize } from "@/utils/store";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from) => {
  if (!store.initialized) await initialize();

  if (to.path.startsWith("/login") || to.path.startsWith("/register")) {
    if (store.initialized) return { path: "/game" };
  }

  if (to.path.startsWith("/onboarding")) {
    if (!store.initialized) return { path: "/login" };
    if (
      !to.path.includes("welcome") &&
      store.user_data.username &&
      store.user_data.starter_traveller
    ) {
      return { path: "/onboarding/welcome" };
    }

    if (!to.path.includes("user") && !store.user_data.username) {
      return { path: "/onboarding/user" };
    }
    if (!to.path.includes("character") && !store.user_data.starter_traveller) {
      return { path: "/onboarding/character" };
    }
  }

  if (to.path.startsWith("/game")) {
    if (!store.initialized) return { path: "/login" };
    if (!store.user_data.username || !store.user_data.starter_traveller) {
      return { path: "/onboarding" };
    }
  }

  if (from.path.startsWith("/game/fighting")) {
    if (
      to.path.startsWith("/game/new-game") ||
      to.path.startsWith("/game/join-game")
    ) {
      return { path: "/game" };
    }
  }
});

createApp(App)
  .use(router)
  .use(tippy, {
    defaultProps: { animation: "shift-away" },
  })
  .mount("#app");
