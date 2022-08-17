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

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";
import { wait } from "@/utils/globals";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  // If we are coming from the register page, wait for the session to be filled
  if (
    (to.path === "/onboarding/user" && from.path === "/") ||
    (to.path === "/game" && from.path === "/")
  ) {
    await wait(1000);
  }

  const authSession = await supabase.auth.getSession();
  if (authSession.error) alert(authSession.error.message);

  if (to.meta.requiresAuth && !authSession.data.session) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (to.meta.registerRedirect) return { path: "/register" };

    return {
      path: "/login",
    };
  }

  if (authSession.data.session && !authSession.error) {
    store.authSession = authSession.data.session; // Set the supabase session in our global state
  }

  if (to.meta.checkForCompletedOnboarding) {
    const { data, error } = await supabase
      .from("users")
      .select()
      .match({ id: store.authSession?.user?.id })
      .select();

    if (error) throw error;

    if (!error && data.length !== 0) {
      if (data[0].username !== null && data[0].starter_traveller !== null) {
        // If username and traveller are set we are assuming full signup has been completed already
        return;
      }
    }

    // Otherwise, push the user to do the onboarding process
    router.push("/onboarding/user");
  }
});

createApp(App)
  .use(router)
  .use(tippy, {
    defaultProps: { animation: "shift-away" },
  })
  .mount("#app");
