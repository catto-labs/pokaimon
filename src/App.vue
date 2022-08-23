<template>
  <div
    class="flex h-screen w-screen items-center justify-center"
    v-if="!store.first_load"
  >
    <LoadingPrimogems />
  </div>

  <router-view></router-view>
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view> -->
</template>

<style>
#app {
  min-height: 100vh;
  min-width: 100%;
  background: #111827;
}
</style>

<script setup lang="ts">
import LoadingPrimogems from "@/components/game/LoadingPrimogems.vue";
import { store } from "@/utils/store";
</script>
