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
          <router-link
            to="/game"
            class="transform rounded-2xl bg-brand-main px-8 py-2 text-center font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5 hover:text-white hover:no-underline sm:text-xl"
          >
            Play Now
          </router-link>
          <router-link
            to="linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9uL2Jsb2IvbWFpbi9SRUFETUUubWQ="
            class="transform rounded-2xl border-2 border-brand-second px-8 py-2 text-center font-bold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-second sm:text-xl"
          >
            Learn More
          </router-link>
        </div>
      </section>

      <section
        id="deck"
        class="mt-64 mb-32 flex flex-col items-start justify-between gap-8 lg:flex-row"
      >
        <div class="flex flex-col space-y-4 lg:mt-12">
          <h2 class="max-w-lg text-5xl font-bold">
            Discover cards and build your own deck!
          </h2>
          <router-link
            to="/cards"
            class="w-fit transform rounded-2xl bg-brand-main px-8 py-2 text-right text-xl font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5 hover:text-white hover:no-underline"
          >
            View All Cards
          </router-link>
        </div>
        <div
          class="cards-row flex flex-row flex-wrap items-start justify-end gap-6 space-y-0 md:self-end"
        >
          <PlayingCard />
          <PlayingCard class="hidden sm:block" />
          <PlayingCard class="hidden md:block" />
          <PlayingCard class="hidden lg:block" />
        </div>
      </section>
    </main>
    <Footer class="bottom-0 w-full" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";
import PlayingCard from "@/components/pages/index/PlayingCard.vue";
</script>
