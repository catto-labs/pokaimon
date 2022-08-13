<template>
  <div>
    <Navbar class="fixed top-0 z-50 w-full" />
    <main class="px-8 py-24">
      <div class="space-y-8">
        <h1 class="mt-32 text-6xl font-bold">Embark the adventure.</h1>
        <p class="max-w-xl">
          A simple game inspired by Pokemon, where you can have 1v1 fights and
          collect character cards, items and ingame currency in the setting of
          the Genshin Impact world.
        </p>
        <div class="mt-4 flex flex-row gap-4">
          <button
            class="transform rounded-2xl bg-brand-main px-8 py-2 text-xl font-bold text-white duration-300 ease-in-out hover:-translate-y-0.5"
          >
            Play Now
          </button>
          <button
            class="transform rounded-2xl border border-brand-second px-8 py-2 text-xl font-bold text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-brand-second"
          >
            Learn More
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>
