<template>
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
