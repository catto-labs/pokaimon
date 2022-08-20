<template>
  <Navbar class="fixed top-0 z-50 w-full" />
  <main class="min-h-screen px-8 py-32">
    <div v-if="!cards" class="flex justify-center">
      <div class="flex flex-col text-center">
        <h1 class="mb-2 text-4xl font-bold text-head">Fetching cards...</h1>
        <h2 class="mb-2 text-xl text-note">Hang on for a few seconds!</h2>
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-4" v-else>
      <div
        :key="character.id"
        class="flex w-full flex-col justify-between gap-4 rounded-xl border border-grey-700 bg-grey-800 p-4 sm:w-96"
        v-for="character in cards"
      >
        <div class="flex gap-4">
          <div>
            <h3 class="text-lg font-bold text-head">{{ character.name }}</h3>
            <p>{{ character.description }}</p>
          </div>
          <div class="min-w-fit">
            <img
              :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${character.name.toLowerCase()}.png`"
              class="aspect-square h-16 w-16 rounded-full border-2 border-grey-700"
              :alt="`A picture of ${character.name}`"
            />
          </div>
        </div>

        <span class="block text-note"
          >{{ character.element }} /
          {{ capitalizeFirstLetter(character.region) }} / Min.
          {{ character.base_health }}HP</span
        >
      </div>
    </div>
  </main>
  <Footer class="bottom-0 w-full" />
</template>

<script setup lang="ts">
import IconWindy from "virtual:icons/mdi/weather-windy";

import type { CharacterInfoTable } from "@/types/Database";

import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";

import { capitalizeFirstLetter } from "@/utils/globals";
import { supabase } from "@/utils/supabase";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const cards = ref<CharacterInfoTable[] | null>(null);
const getCards = async () => {
  const { data, error } = await supabase.from("character_info").select();

  if (error) {
    alert("An error happenned when fetching the cards.");
    router.push("/");
    return;
  }

  cards.value = data;
};

onBeforeMount(() => getCards());
</script>