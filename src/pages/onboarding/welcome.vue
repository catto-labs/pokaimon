<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        Welcome aboard. You're all set.
      </h1>
      <h2 class="mb-8 text-xl text-body">
        You can now enter the game and start exploring!
      </h2>
      <router-link
        to="/game"
        class="transform rounded-2xl bg-brand-main px-8 py-2 text-center font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5 hover:text-white sm:text-xl"
      >
        Enter Game
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";

import { store } from "@/utils/store";

const router = useRouter();

onBeforeMount(async () => {
  if (!store.showOnboarding) router.push("/register");
  if (supabase.auth.session() === null) router.push("/register");

  // Reset all values for onboarding
  store.showOnboarding = false;
  localStorage.removeItem("showOnboarding");
});
</script>
