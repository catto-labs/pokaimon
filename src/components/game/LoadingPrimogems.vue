<template>
  <div class="flex items-center justify-center gap-4">
    <PrimoIcon class="dot-flashing h-8" />
    <PrimoIcon class="dot-flashing h-8" />
    <PrimoIcon class="dot-flashing h-8" />
  </div>
</template>

<script setup lang="ts">
import PrimoIcon from "@/components/game/PrimoIcon.vue";
</script>

<style>
.dot-flashing {
  @apply text-white;
  animation: dotFlashing 1s infinite;
}

.dot-flashing:nth-of-type(2) {
  animation-delay: 250ms;
}

.dot-flashing:nth-of-type(3) {
  animation-delay: 500ms;
}

@keyframes dotFlashing {
  50% {
    @apply text-brand-main;
  }
}
</style>
