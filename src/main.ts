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

import type { CharacterInventoryTable, UsersTable } from "@/types/Database";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  // Check if the route needs auth.
  if (to.meta.requiresAuth && !store.user_session) {
    // Get session and check if it exists.
    const { data, error } = await supabase.auth.getSession();
    if (!data.session || error) {
      // Redirect to register page instead.
      if (to.meta.registerRedirect) return { path: "/register" };
      return { path: "/login" };
    }

    // If authenticated, store the user's session.
    store.user_session = data.session.user;

    // Get the user's data and store them.
    const { data: user_data, error: user_error } = await supabase
      .from("users")
      .select()
      .match({ id: data.session.user.id })
      .single();

    if (!user_data || user_error) {
      alert("An error occurred when fetching user's data.");
      window.location.reload();
      return;
    }

    store.user_data = user_data;

    const { data: user_characters, error: user_characters_error } =
      await supabase
        .from("character_inventory")
        .select()
        .match({ owner: data.session.user.id })
        .select(`*, base_character(*)`);

    if (user_characters_error) {
      alert("An error occurred when fetching user's characters.");
      window.location.reload();
      return;
    }

    store.user_inventory = user_characters;

    supabase
      .channel(`public:users:id=eq.${user_data.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${user_data.id}`,
        },
        (payload: { new: UsersTable }) => {
          console.info("[store:user_data] new data", payload);
          store.user_data = payload.new;
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "character_inventory",
          filter: `owner=eq.${user_data.id}`,
        },
        (payload: { new: CharacterInventoryTable }) => {
          console.log("[store:user_inventory] new data", payload);
        }
      )
      .subscribe(() => console.info("[store] subscribed to database changes."));
  }

  if (to.meta.checkForCompletedOnboarding) {
    if (!store.user_session) return { path: "/login" };

    const { data, error } = await supabase
      .from("users")
      .select()
      .match({ id: store.user_session.id })
      .single();

    if (error) throw error;

    if (!error) {
      if (data.username !== null && data.starter_traveller !== null) {
        // If username and traveller are set we are
        // assuming full signup has been completed already.
        return;
      }
    }

    // Otherwise, push the user to do the onboarding process.
    router.push("/onboarding/user");
  }
});

createApp(App)
  .use(router)
  .use(tippy, {
    defaultProps: { animation: "shift-away" },
  })
  .mount("#app");
