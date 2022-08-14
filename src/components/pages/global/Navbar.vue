<template>
  <div class="py-4 px-8">
    <header
      class="h-13 flex w-full flex-row items-center justify-between rounded-xl border border-grey-700 bg-grey-800 bg-opacity-60 py-2 px-4 filter backdrop-blur-md"
    >
      <a href="/" class="cursor-pointer">
        <div class="flex flex-row items-center gap-4">
          <img
            src="@/assets/logo.png"
            alt="Pokaimon Logo"
            class="my-auto h-8"
            id="header-logo"
          />
          <label
            for="header-logo"
            class="my-auto cursor-pointer text-lg font-bold text-white"
            >Pokaimon</label
          >
        </div>
      </a>

      <div class="flex gap-6 rounded-xl pl-4 md:bg-grey-700 md:bg-opacity-40">
        <nav class="hidden flex-row items-center space-x-2 md:flex">
          <NavbarItem href="/cards" text="Cards" />
          <NavbarItem href="/sets" text="Card Sets" />
          <NavbarItem href="/community" text="Community" />
          <NavbarItem href="/news" text="News" />
        </nav>

        <a
          href="/game"
          class="m-0 hidden transform rounded-lg bg-brand-main py-1 px-2.5 text-center text-white filter duration-300 ease-in-out hover:-translate-y-0.5 hover:font-bold hover:text-white hover:no-underline sm:inline-block md:w-auto"
        >
          Play Now
        </a>

        <button @click="toggleMobileMenu" class="flex items-center md:hidden">
          <IconHanburger font-size="22px" />
        </button>
      </div>
    </header>

    <nav
      ref="mobileMenu"
      class="absolute top-4 left-0 right-0 mx-8 mt-14 hidden items-center rounded-xl border border-grey-700 bg-grey-800 bg-opacity-60 p-4 filter backdrop-blur-md md:top-auto md:left-auto md:right-4 md:mt-0 md:hidden md:space-y-0 md:space-x-8 md:border-none md:px-0 md:py-0 md:pl-4"
    >
      <NavbarItem href="/cards" text="Cards" />
      <NavbarItem href="/sets" text="Card Sets" />
      <NavbarItem href="/community" text="Community" />
      <NavbarItem href="/news" text="News" />

      <a
        href="/game"
        class="mt-4 inline-block w-full transform rounded-lg bg-brand-main py-1.5 px-4 text-white filter duration-300 ease-in-out hover:-translate-y-0.5 hover:font-bold hover:text-white hover:no-underline sm:hidden md:w-auto"
      >
        Play Now
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NavbarItem from "./NavbarItem.vue";
import IconHanburger from "~icons/mdi/menu";

const mobileMenu = ref<HTMLElement | null>(null);
const toggleMobileMenu = () => {
  if (mobileMenu.value) {
    mobileMenu.value.classList.toggle("hidden");
  }
};
</script>
