<template>
  <div>
    <h1>Game UI will be here</h1>
    <IconBackpack />
  </div>
</template>

<script setup lang="ts">
import IconBackpack from "virtual:icons/mdi/backpack";

import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";

const router = useRouter();

onBeforeMount(() => {
  if (supabase.auth.session() === null) router.push("/login");
});
</script>
