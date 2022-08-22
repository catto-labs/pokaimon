<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center px-2"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">Joining a game...</h1>
      <h2 v-if="game_id" class="mb-2 text-xl text-note">
        Hang on for a few seconds, you'll be redirected soon!
      </h2>
      <h2 v-else class="mb-2 text-xl text-note">
        Selecting an available game for you...
      </h2>

      <LoadingPrimogems class="mt-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { supabase } from "@/utils/supabase";

import LoadingPrimogems from "@/components/game/LoadingPrimogems.vue";

const router = useRouter();
const route = useRoute();

const game_id = route.query.game_id as string;

const joinGame = async (id: number) => {
  const { data: response, error } = await supabase.functions.invoke(
    "join-game",
    {
      body: {
        game_id: id,
      },
    }
  );

  if (error || response.error || !response.success) {
    return false;
  }

  router.push(`/game/fighting/${id}`);
  return true;
};

onMounted(async () => {
  if (game_id) {
    // When joining a game, we don't need to refresh the available games.
    if (!(await joinGame(parseInt(game_id)))) {
      alert(
        "An error occurred when tried to join the mentionned game. Redirecting to map..."
      );
      router.push(`/game/fighting/${game_id}`);
      return;
    }
  }

  const { data, error } = await supabase
    .from("games")
    .select()
    .match({ available: true, hidden: false })
    .select();

  const games = data as {
    id: number;
    region: string;
  }[];

  if (error) {
    alert(
      "An error occurred while trying to get available games. Redirecting to map..."
    );
    router.push("/game");
    return;
  }

  let noGame = true;
  for (const game of games) {
    if (await joinGame(game.id)) {
      noGame = false;
      return;
    }
  }

  if (noGame) {
    alert("No game found, creating one for you...");
    router.push({ name: "new-game", params: { offline: "no" } });
  }
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
