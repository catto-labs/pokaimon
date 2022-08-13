<template>
  <div><h1>Signing you out...</h1></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

import { supabase } from "@/utils/supabase";
import { useRouter } from "vue-router";

const router = useRouter();

onBeforeMount(async () => {
  const { error } = await supabase.auth.signOut();
  if (error) alert(error);
  router.push("/");
});
</script>
