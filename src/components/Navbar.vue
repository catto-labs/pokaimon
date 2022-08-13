<template>
  <div class="py-4 px-8">
    <header
      class="flex w-full flex-row justify-between rounded-xl bg-grey-800 bg-opacity-60 py-2 px-4 filter backdrop-blur-md"
    >
      <a href="/" class="cursor-pointer">
        <div class="flex flex-row items-center gap-4">
          <img
            src="../assets/logo.png"
            alt="Pokaimon logo"
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
      <nav class="flex flex-row items-center space-x-8">
        <a href="/cards" class="hover:text-brand-second">Cards</a>
        <a href="/sets" class="hover:text-brand-second">Card Sets</a>
        <a href="/community" class="hover:text-brand-second">Community</a>
        <a href="/news" class="hover:text-brand-second">News</a>
        <a
          href="/game"
          class="rounded-md bg-brand-main px-2 py-1 filter hover:brightness-75"
          >Play Now</a
        >
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts"></script>
