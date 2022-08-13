<template>
  <div>
    <footer
      class="flex w-full flex-row justify-between rounded-t-xl border-t border-grey-700 bg-grey-800 bg-opacity-60 px-8 py-2 px-4 filter backdrop-blur-md"
    >
      <div class="flex flex-row items-center gap-4">
        <a href="/" class="my-auto">
          <img src="../../../assets/logo.png" alt="Pokaimon logo" class="h-8" />
        </a>
        <div>
          <p>
            Made with
            <span class="text-brand-main">❤</span>
            by
            <a
              href="/contributors"
              class="text-white transition duration-300 hover:text-brand-second hover:underline"
            >
              the team</a
            >.
          </p>
          <span class="text-sm"
            >© 2022 Trobonox •
            <a
              class="text-grey-300 transition duration-300 hover:text-brand-second hover:underline"
              href="/licenses"
              >License notice</a
            ></span
          >
        </div>
      </div>
      <div class="flex gap-4">
        <a
          href="https://github.com/trobonox/pokaimon"
          class="my-auto rounded-full bg-grey-700 p-2 text-white transition duration-300 hover:-translate-y-0.5 hover:text-fuchsia"
        >
          <IconGitHub class="h-6 w-6" />
        </a>
        <a
          href="/discord.jpg"
          class="my-auto rounded-full bg-grey-700 p-2 text-white transition duration-300 hover:-translate-y-0.5 hover:text-purple"
        >
          <IconDiscord class="h-6 w-6" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import IconDiscord from "virtual:icons/fa6-brands/discord";
import IconGitHub from "virtual:icons/fa6-brands/github";
</script>
