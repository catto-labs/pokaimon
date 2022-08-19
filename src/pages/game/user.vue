<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <router-link
      to="/game"
      class="group absolute top-0 left-0 z-10 flex flex-row items-center gap-4 p-4 hover:no-underline"
    >
      <IconArrowLeft
        class="text-grey-400 transition-colors group-hover:text-brand-second"
      />
      <span class="transition-colors group-hover:text-brand-second">
        Go back
      </span>
    </router-link>
    <div
      v-if="state.loaded"
      class="mb-4 flex w-full max-w-4xl justify-between rounded-xl bg-black p-8"
    >
      <div class="mx-8 flex flex-col space-y-8">
        <div class="flex flex-col">
          <img
            v-if="state.traveller === 'aether'"
            src="@/assets/game/traveller/aether.png"
            class="aspect-square h-auto w-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
          />
          <img
            v-if="state.traveller === 'lumine'"
            src="@/assets/game/traveller/lumine.png"
            class="aspect-square h-auto w-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
          />
          <div class="my-4">
            <h2 class="text-4xl font-bold">{{ state.username }}</h2>
            <h3 class="text-xl">
              Joined at {{ joinTime.toLocaleDateString("en-GB") }}
            </h3>
          </div>
          <div class="mt-auto mb-4 flex space-x-4">
            <IconConstruction
              v-if="state.is_developer"
              class="mt-auto text-2xl"
              v-tippy="{ content: 'Pokaimon Developer' }"
            />
            <IconGestureTap
              v-if="state.is_ui_designer"
              class="mt-auto mb-[0.1rem] text-2xl"
              v-tippy="{ content: 'Pokaimon User Interface' }"
            />
            <IconChartBar
              v-if="state.is_character_designer"
              class="mt-auto text-2xl"
              v-tippy="{ content: 'Pokaimon Characters' }"
            />
            <IconBrush
              v-if="state.is_artwork_designer"
              class="mt-auto text-2xl"
              v-tippy="{ content: 'Pokaimon Artwork' }"
            />
          </div>
        </div>
      </div>
      <div class="mx-auto rounded-full bg-grey-700 p-1"></div>
      <div class="mx-16 flex w-[50%] flex-col">
        <h2 class="text-2xl font-bold">Stats:</h2>
        <div class="mb-4">
          <p>Experience points: {{ state.xp.toLocaleString("en-GB") }}</p>
          <p>Primos: {{ state.primos.toLocaleString("en-GB") }}</p>
        </div>
        <h2 class="mb-4 text-2xl font-bold">Equipped card:</h2>
        <div class="mb-4 flex gap-4">
          <div class="flex w-32 flex-col justify-end rounded-md bg-grey-700">
            <img
              :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${state.selected_character.base_character.name.toLowerCase()}.png`"
              class="h-fit"
            />
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-xl font-semibold">
              {{ state.selected_character.base_character.name }}
            </h3>
            <p>
              Experience points:
              {{ state.selected_character.xp.toLocaleString("en-GB") }}
            </p>
            <p>
              Health:
              {{ state.selected_character.health.toLocaleString("en-GB") }}
            </p>
            <p>
              Element: {{ state.selected_character.base_character.element }}
            </p>
            <p>
              Region:
              {{
                capitalizeFirstLetter(
                  state.selected_character.base_character.region
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
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
import type {
  CharacterInventoryTable,
  CharacterInfoTable,
} from "@/types/Database";

import IconArrowLeft from "virtual:icons/mdi/arrow-left";
import IconConstruction from "virtual:icons/mdi/construction";
import IconGestureTap from "virtual:icons/mdi/gesture-tap";
import IconChartBar from "virtual:icons/mdi/chart-bar";
import IconBrush from "virtual:icons/mdi/brush";

import { reactive, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { getFullUser } from "@/utils/supabase";

import { store } from "@/utils/store";
import { capitalizeFirstLetter } from "@/utils/globals";

const router = useRouter();

// this isnt supposed to be permanent if it wasnt obvious
const joinTime = new Date();

const state = reactive<
  | {
      loaded: true;
      traveller: "lumine" | "aether" | null;
      username: string | null;
      xp: number;
      primos: number;
      selected_character: Omit<CharacterInventoryTable, "base_character"> & {
        base_character: CharacterInfoTable;
      };
      is_developer: boolean;
      is_ui_designer: boolean;
      is_character_designer: boolean;
      is_artwork_designer: boolean;
    }
  | { loaded: false }
>({
  loaded: false,
});

onMounted(async () => {
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

  Object.assign(state, {
    loaded: true,
    traveller: data.starter_traveller,
    username: data.username,
    xp: data.xp,
    primos: data.primos,
    selected_character: data.selected_character,
    is_developer: data.is_developer,
    is_ui_designer: data.is_ui_designer,
    is_character_designer: data.is_character_designer,
    is_artwork_designer: data.is_artwork_designer,
  });
});
</script>
