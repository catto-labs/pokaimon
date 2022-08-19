<template>
  <div class="bg-gray-900 flex h-screen w-screen flex-col p-8 py-16">
    <router-link
      to="/game"
      class="group absolute top-0 left-0 z-10 flex flex-row items-center gap-2 p-4 hover:no-underline"
    >
      <IconArrowLeft
        class="text-grey-400 transition-colors group-hover:text-brand-second"
      />
      <span class="transition-colors group-hover:text-brand-second">
        Go back
      </span>
    </router-link>
    <h1 class="text-4xl font-bold">Inventory</h1>
    <h2>View all the characters you own.</h2>
    <div class="mt-8 flex flex-row flex-wrap" v-if="state.loaded">
      <CharacterInventoryCard
        v-for="(character, index) in state.characters"
        :key="index"
        :character_id="1"
        :index="1"
        :bound_character_id="state.user.selected_character.id"
        :character_name="character.base_character.name"
      />
    </div>
  </div>
</template>

<route>
{
  meta: {
    requiresAuth: true,
    checkForCompletedOnboarding: true
  }
}
</route>

<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";

import IconArrowLeft from "virtual:icons/mdi/arrow-left";

import CharacterInventoryCard from "@/components/game/CharacterInventoryCard.vue";

import { store } from "@/utils/store";
import { supabase, getFullUser } from "@/utils/supabase";

const router = useRouter();

const state = reactive<
  | {
      loaded: true;
      user: unknown | null;
      characters: unknown[] | null;
    }
  | { loaded: false }
>({
  loaded: false,
});

onBeforeMount(async () => {
  const user_id = store.authSession?.user?.id;
  if (!user_id) {
    router.push("/game");
    return;
  }

  const { data, error } = await getFullUser(user_id);

  if (error || !data) {
    alert("Something went wrong getting your user info, going back to map...");
    router.push("/game");
    return;
  }

  const charactersData = await supabase
    .from("character_inventory")
    .select(
      `
      id,
      base_character(
        name
      ),
      owner
    `
    )
    .match({ owner: user_id });

  if (charactersData.error || !charactersData.data) {
    alert("Something went wrong getting your characters, going back to map...");
    router.push("/game");
    return;
  }

  Object.assign(state, {
    loaded: true,
    user: data,
    characters: charactersData.data,
  });

  console.log(state);
});
</script>
