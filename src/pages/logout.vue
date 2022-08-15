<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        We're sad to see you go!
      </h1>
      <h2 class="mb-2 text-xl text-body">Until next time, traveller.</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

import { supabase } from "@/utils/supabase";
import { useRouter } from "vue-router";

const router = useRouter();

onBeforeMount(async () => {
  const { error } = await supabase.auth.signOut();
  if (error) alert(error.message);
  router.push("/");
});
</script>
