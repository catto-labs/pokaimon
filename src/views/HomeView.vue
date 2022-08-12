<template>
  <div>
    <Navbar class="fixed top-0 w-full" />
    <main class="px-8 pt-16">
      <h1 class="mt-32 text-6xl font-bold">Embark the adventure.</h1>
      <p class="max-w-xl">
        A simple game inspired by Pokemon, where you can have 1v1 fights and
        collect character cards, items and ingame currency in the setting of the
        Genshin Impact world.
      </p>
      <div class="mt-4 flex flex-row gap-4">
        <button class="rounded-2xl bg-purple px-8 py-2 text-xl font-bold">
          Play Now
        </button>
        <button
          class="rounded-2xl border border-blue px-8 py-2 text-xl font-bold hover:bg-blue"
        >
          Learn More
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>
