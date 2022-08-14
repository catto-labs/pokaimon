<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        Getting your data ready.
      </h1>
      <h2 class="mb-2 text-xl text-body">
        Hang on for just a second, you will be redirected soon!
      </h2>
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

  setTimeout(async () => {
    if (supabase.auth.session() !== null && store.showOnboarding) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .match({ id: supabase.auth.session()?.user?.id });

      if (!error && data.length !== 0) {
        if (data[0].username !== null && data[0].starter_traveller !== null) {
          // If username and traveller are set we are assuming full signup has been completed already
          store.showOnboarding = false;
          localStorage.setItem("showOnboarding", "false");
          return router.push("/game");
        }
      }

      router.push("/onboarding/user");
    }
  }, 1000);
});
</script>
