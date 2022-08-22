<template>
  <div
    v-if="store.user_data"
    class="bg-gray-900 flex flex-col items-center py-32 px-6"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        Welcome, {{ store.user_data.username }}!
      </h1>
      <h2 class="mb-2 text-xl text-body">Which character best suits you?</h2>
    </div>
    <form @submit="handleSubmit" class="flex flex-col gap-4 pt-16">
      <div class="flex flex-row gap-10 sm:gap-16">
        <button type="button" @click="state.traveller = 'aether'">
          <img
            src="@/assets/game/traveller/aether.png"
            class="aspect-square h-auto w-40 rounded-full border-2 outline-none transition"
            :class="{
              'border-brand-main bg-grey-700': state.traveller === 'aether',
              'border-grey-700 bg-grey-800 hover:bg-opacity-80 focus:border-grey-500':
                state.traveller !== 'aether',
            }"
          />
        </button>
        <button type="button" @click="state.traveller = 'lumine'">
          <img
            src="@/assets/game/traveller/lumine.png"
            class="aspect-square h-auto w-40 rounded-full border-2 outline-none transition"
            :class="{
              'border-brand-main bg-grey-700': state.traveller === 'lumine',
              'border-grey-700 bg-grey-800 hover:bg-opacity-80 focus:border-grey-500':
                state.traveller !== 'lumine',
            }"
          />
        </button>
      </div>
      <button
        type="submit"
        class="mt-2 w-full rounded-2xl bg-grey-700 py-2 px-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
      >
        Proceed
      </button>
    </form>
  </div>
  <div v-else>Loading...</div>
</template>

<route>
{
  meta: {
    requiresAuth: true,
    registerRedirect: true
  }
}
</route>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

const router = useRouter();

const state = reactive<{
  traveller: "lumine" | "aether" | null;
}>({
  traveller: null,
});

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!store.user_data) {
    return alert("User data not found, please try to refresh the page.");
  }

  if (!state.traveller) return alert("Please choose a traveller.");

  // These values comes from the `character_info` table.
  const AETHER_CHARACTER_ID = 1;
  const LUMINE_CHARACTER_ID = 2;
  const TRAVELLERS_BASE_HEALTH = 1300;

  // Insert character card to inventory
  const { data: insert_data, error: insert_error } = await supabase
    .from("character_inventory")
    .insert({
      base_character:
        state.traveller === "aether"
          ? AETHER_CHARACTER_ID
          : LUMINE_CHARACTER_ID,
      health: TRAVELLERS_BASE_HEALTH,
      xp: 0,
      owner: store.user_data.id,
    })
    .select();

  if (insert_error) return alert("Something went wrong setting your character");

  const { error: character_insert_error } = await supabase
    .from("users")
    .update({
      starter_traveller: state.traveller,
      selected_character: insert_data[0].id,
    })
    .match({ id: store.user_data.id });

  if (character_insert_error) return alert(character_insert_error.message);
  router.push("/onboarding/welcome");
};
</script>
