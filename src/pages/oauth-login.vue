<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        Getting your account ready.
      </h1>
      <h2 class="mb-2 text-xl text-body">
        Hang on for a few seconds, you'll be redirected soon!
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";
import { wait } from "@/utils/globals";

const router = useRouter();

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session !== null) {
      await wait(100); // Small timeout to wait for everything to be loaded
      router.push("/game");
    }
  });
});
</script>
