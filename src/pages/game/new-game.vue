<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center px-2"
  >
    <div class="text-center">
      <h1 v-if="!state.gameCreated" class="mb-2 text-4xl font-bold text-head">
        Creating game in {{ capitalizeFirstLetter(region) }}...
      </h1>
      <h1 v-else class="mb-2 text-4xl font-bold text-head">
        Game created in {{ capitalizeFirstLetter(region) }}!
      </h1>
      <h2 v-if="isOffline" class="mb-2 text-xl text-note">
        Hang on for a few seconds, you'll be redirected soon!
      </h2>
      <h2
        v-else-if="!isOffline && !isHidden && state.gameCreated"
        class="mb-2 text-xl text-note"
      >
        Waiting for an opponent online...
      </h2>
      <h2
        v-else-if="!isOffline && isHidden && state.gameCreated"
        class="mb-2 text-xl text-note"
      >
        Send this URL to your opponent !
        <button>{{ getJoinFightUrl() }}</button>
      </h2>

      <LoadingPrimogems class="mt-6" />

      <button
        v-if="!isOffline"
        class="mt-8 rounded-xl bg-brand-main py-1 px-4"
        @click="router.push(`/game/fighting/${state.gameId}`)"
      >
        Play against a bot
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GamesTable } from "@/types/Database";
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

import { capitalizeFirstLetter } from "@/utils/globals";
import { supabase } from "@/utils/supabase";

import LoadingPrimogems from "@/components/game/LoadingPrimogems.vue";

const router = useRouter();
const route = useRoute();

const state = reactive({
  gameCreated: false,
  gameId: -1,
});

const region = (route.params.region as string) || "mondstadt";
const isOfflineRaw = (route.params.offline as "yes" | "no") || "yes";
const isOffline = isOfflineRaw === "yes";
const isHiddenRaw = (route.params.hidden as "yes" | "no") || "no";
const isHidden = isHiddenRaw === "yes";

const getJoinFightUrl = () =>
  window.location.origin + "/game/fighting/" + state.gameId;

onMounted(async () => {
  const { data: response, error } = await supabase.functions.invoke(
    "create-game",
    {
      body: {
        region,
        offline: isOffline,
        hidden: isHidden,
      },
    }
  );

  if (error || response.error || !response.success) {
    alert("An error occurred when creating the game. Redirecting to map...");
    router.push("/game");
    return;
  }

  const game = response.data[0];
  state.gameId = game.id;
  state.gameCreated = true;

  if (isOffline) {
    router.push(`/game/fighting/${game.id}`);
  } else {
    // Listen to table changes.
    supabase
      .channel(`public:games:id=eq.${game.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `id=eq.${game.id}`,
        },
        (data: { new: GamesTable }) => {
          const table_new_data = data.new;
          if (table_new_data.player2) {
            supabase.removeAllChannels();
            router.push(`/game/fighting/${game.id}`);
          }
        }
      )
      .subscribe();
  }
});
</script>

<route>
{
  name: "new-game"
}
</route>
