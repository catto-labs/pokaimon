<template>
  <Navbar class="fixed top-0 z-50 w-full" />
  <main class="px-8 py-32">
    <h2 v-if="!cards">Fetching cards...</h2>
    <div class="flex flex-wrap justify-center gap-4" v-else>
      <div
        :key="character.id"
        class="flex w-full flex-col justify-between gap-4 rounded-xl border border-grey-700 bg-grey-800 p-4 sm:w-96"
        v-for="character in cards"
      >
        <div>
          <h3 class="text-lg font-bold text-head">{{ character.name }}</h3>
          <p>{{ character.description }}</p>
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
