<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">Loading game...</h1>
      <h2 class="mb-2 text-xl text-body">
        Hang on for a few seconds, you'll be redirected soon!
      </h2>
      <div class="mt-6 flex items-center justify-center gap-4">
        <PrimoIcon class="dot-flashing h-8" />
        <PrimoIcon class="dot-flashing h-8" />
        <PrimoIcon class="dot-flashing h-8" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

import PrimoIcon from "@/components/game/PrimoIcon.vue";

const router = useRouter();

onMounted(async () => {
  const user_id = store.authSession?.user?.id;
  if (!user_id) return router.push("/game");

  const { data, error } = await supabase
    .from("games")
    .insert([
      {
        player1: user_id,
        player2: null /** Since it's a bot. */,
      },
    ])
    .select();

  const game = data[0];

  if (error || !game.id) {
    alert("An error occurred when creating the game. Redirecitng to map...");
    router.push("/game");
    return;
  }

  router.push(`/game/fighting/${game.id}`);
});
</script>

<style>
.dot-flashing {
  @apply text-white;
  animation: dotFlashing 1s infinite;
}

.dot-flashing:nth-of-type(2) {
  animation-delay: 250ms;
}

.dot-flashing:nth-of-type(3) {
  animation-delay: 500ms;
}

@keyframes dotFlashing {
  50% {
    @apply text-brand-main;
  }
}
</style>
