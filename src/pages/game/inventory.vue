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
    <h2>Here's all the characters you own.</h2>
    <div class="mt-8 flex flex-row flex-wrap gap-4" v-if="state.loaded">
      <CharacterInventoryCard
        v-for="(character, index) in state.characters"
        :key="index"
        :character_id="character.id"
        :index="1"
        :bound_character_id="state.user?.selected_character?.id"
        :character_name="character.base_character.name"
        @equip-character="equipCharacter"
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

import { UsersTable } from "@/types/Database";

const router = useRouter();

interface BaseCharacter {
  name: string;
}

interface Character {
  id: number;
  base_character: BaseCharacter;
  owner: string;
}

const state = reactive<
  | {
      loaded: true;
      user: UsersTable | null;
      characters: Character[] | null;
    }
  | { loaded: false }
>({
  loaded: false,
});

const equipCharacter = async (character_id: number) => {
  const equipData = await supabase
    .from("users")
    .update({ selected_character: character_id })
    .match({ id: store.authSession?.user?.id });

  if (equipData.error) {
    return alert(equipData.error.message);
  }

  // Refresh user
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

  if (!state.loaded) return;
  state.user = data;
};

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
});
</script>
