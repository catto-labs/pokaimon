<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">Loading game...</h1>
      <h2 class="mb-2 text-xl text-body">
        Hang on for a few seconds, you'll be redirected soon!
      </h2>
      <div class="mt-4 flex items-center justify-center gap-4">
        <PrimoIcon class="dot-flashing h-8" />
        <PrimoIcon class="dot-flashing h-8" />
        <PrimoIcon class="dot-flashing h-8" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import PrimoIcon from "@/components/game/PrimoIcon.vue";

onMounted(() => {
  console.log("pog");
});
</script>

<style>
.dot-flashing:first-of-type {
  color: white;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 1s;
}

.dot-flashing:nth-of-type(2) {
  color: white;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 2s;
}

.dot-flashing:last-of-type {
  color: white;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 3s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  color: white;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  color: white;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    color: white;
  }
  50%,
  100% {
    color: #c084fc;
  }
}
</style>
