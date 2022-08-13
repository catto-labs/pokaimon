<template>
  <div>
    <Navbar class="fixed top-0 z-50 w-full" />
    <main class="px-8 py-24">
      <section id="home" class="my-32 space-y-8">
        <h1 class="text-6xl font-bold">Embark the adventure.</h1>
        <p class="max-w-xl">
          A simple game inspired by Pokemon, where you can have 1v1 fights and
          collect character cards, items and ingame currency in the setting of
          the Genshin Impact world.
        </p>
        <div class="mt-4 flex flex-row gap-4">
          <a
            href="/game"
            class="transform rounded-2xl bg-brand-main px-8 py-2 text-xl font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5"
          >
            Play Now
          </a>
          <button
            class="transform rounded-2xl border-2 border-brand-second px-8 py-2 text-xl font-bold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-second"
          >
            Learn More
          </button>
        </div>
      </section>
      <section id="news" class="mt-64 mb-32 space-y-8">
        <h1 class="text-left text-6xl font-bold">
          What's cookin' in Pokaimon?
        </h1>
        <div class="flex justify-between gap-16">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
        <div class="flex space-x-8">
          <h2 class="text-xl">Check out more Pokaimon news:</h2>
          <a
            href="/news#featured"
            class="text-xl text-brand-main transition duration-300 ease-in-out hover:underline hover:brightness-125"
            >Featured</a
          >
          <a
            href="/news#patches"
            class="text-xl text-brand-main transition duration-300 ease-in-out hover:underline hover:brightness-125"
            >Patch Notes</a
          >
          <a
            href="/news#all"
            class="text-xl text-brand-main transition duration-300 ease-in-out hover:underline hover:brightness-125"
            >All</a
          >
        </div>
      </section>
      <section id="deck" class="mt-64 mb-32 flex flex-row">
        <div class="flex flex-col space-y-4">
          <h2 class="text-5xl font-bold">
            Discover cards and build your own deck!
          </h2>
          <button
            class="w-fit transform rounded-2xl bg-brand-main px-8 py-2 text-right text-xl font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5"
          >
            View All Cards
          </button>
          <button
            class="w-fit transform rounded-2xl border border-brand-second px-8 py-2 text-right text-xl font-bold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-second"
          >
            See Deck Builder
          </button>
        </div>
        <div
          class="cards-row flex flex-row items-start justify-between gap-8 space-y-0"
        >
          <PlayingCard />
          <PlayingCard />
          <PlayingCard />
          <PlayingCard />
        </div>
      </section>
    </main>
    <Footer class="bottom-0 w-full" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "../components/pages/global/Footer.vue";
import NewsCard from "@/components/pages/index/NewsCard.vue";
import PlayingCard from "@/components/pages/index/PlayingCard.vue";

import { supabase } from "@/utils/supabase";

import { store } from "@/utils/store";

const router = useRouter();

onBeforeMount(() => {
  if (supabase.auth.session() !== null && store.showOnboarding) {
    router.push("/onboarding");
  }
});
</script>
