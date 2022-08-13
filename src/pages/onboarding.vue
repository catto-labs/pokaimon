<template>
  <div>Poggers</div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

const router = useRouter();

onBeforeMount(() => {
  if (supabase.auth.session() === null) router.push("/signup");

  store.showOnboarding = false;
});
</script>
