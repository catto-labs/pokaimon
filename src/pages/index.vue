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
            class="transform rounded-2xl bg-brand-main px-8 py-2 text-center font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5 hover:text-white sm:text-xl"
          >
            Play Now
          </router-link>
          <button
            class="transform rounded-2xl border-2 border-brand-second px-8 py-2 text-center font-bold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-second sm:text-xl"
          >
            Learn More
          </button>
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
            class="w-fit transform rounded-2xl bg-brand-main px-8 py-2 text-right text-xl font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5"
          >
            View All Cards
          </router-link>
          <!-- <button
            class="w-fit transform rounded-2xl border border-brand-second px-8 py-2 text-right text-xl font-bold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-second"
          >
            See Deck Builder
          </button>
          -->
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

      <section id="news" class="mt-64 mb-32 space-y-8">
        <h1 class="text-left text-6xl font-bold">
          What's cookin' in Pokaimon?
        </h1>
        <div
          class="flex flex-wrap justify-center gap-16 lg:flex-nowrap lg:justify-between xl:justify-start"
        >
          <NewsCard class="md:max-w-sm lg:max-w-xs" />
          <NewsCard class="md:max-w-sm lg:max-w-xs" />
          <NewsCard class="lg:max-w-xs" />
        </div>

        <div class="flex flex-col space-x-8 sm:flex-row">
          <h2 class="text-xl">Check out more Pokaimon news:</h2>
          <router-link
            to="/news#featured"
            class="text-xl text-brand-main transition duration-300 ease-in-out hover:underline hover:brightness-125"
          >
            Featured
          </router-link>
          <router-link
            to="/news#patches"
            class="text-xl text-brand-main transition duration-300 ease-in-out hover:underline hover:brightness-125"
          >
            Patch Notes
          </router-link>
          <router-link
            to="/news#all"
            class="text-xl text-brand-main transition duration-300 ease-in-out hover:underline hover:brightness-125"
          >
            All
          </router-link>
        </div>
      </section>
    </main>
    <Footer class="bottom-0 w-full" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";
import NewsCard from "@/components/pages/index/NewsCard.vue";
import PlayingCard from "@/components/pages/index/PlayingCard.vue";
</script>
