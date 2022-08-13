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
            class="my-auto cursor-pointer text-lg font-bold"
            >Pokaimon</label
          >
        </div>
      </a>
      <nav
        class="fixed top-0 left-0 right-0 mt-14 items-center space-y-2 rounded-xl border border-grey-700 bg-grey-800 bg-opacity-60 px-4 py-4 filter backdrop-blur-md md:top-auto md:left-auto md:right-4 md:mt-0 md:flex md:flex-row md:space-y-0 md:space-x-8 md:border-none md:px-0 md:py-0 md:pl-4"
      >
        <NavbarItem href="/cards" text="Cards" />
        <NavbarItem href="/sets" text="Card Sets" />
        <NavbarItem href="/community" text="Community" />
        <NavbarItem href="/news" text="News" />

        <a
          href="/game"
          class="m-0 inline-block transform rounded-lg bg-brand-main py-1 px-2.5 text-center filter duration-300 ease-in-out hover:-translate-y-0.5 hover:font-bold md:w-auto"
        >
          Play Now
        </a>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
import NavbarItem from "./NavbarItem.vue";
</script>
