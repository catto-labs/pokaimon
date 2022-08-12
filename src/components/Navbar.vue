<template>
  <div class="p-2">
    <header
      class="flex w-full flex-row justify-between rounded-xl bg-grey-800 bg-opacity-60 py-2 px-4 filter backdrop-blur-md"
    >
      <div class="flex flex-row items-center gap-4">
        <img
          src="../assets/logo.png"
          alt="Pokaimon logo"
          class="h-8"
          id="header-logo"
        />
        <label for="header-logo" class="text-lg font-bold">Pokaimon</label>
      </div>
      <nav class="flex flex-row items-center gap-4">
        <a href="/cards" class="hover:text-purple">Cards</a>
        <a href="/sets" class="hover:text-purple">Card Sets</a>
        <a href="/community" class="hover:text-purple">Community</a>
        <a href="/news" class="hover:text-purple">News</a>
        <a
          href="/game"
          class="rounded-md bg-purple p-1 filter hover:brightness-75"
          >Play Now</a
        >
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts"></script>
