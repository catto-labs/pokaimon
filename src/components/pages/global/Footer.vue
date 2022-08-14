<template>
  <div>
    <footer
      class="flex w-full flex-row justify-between rounded-t-xl border-t border-grey-700 bg-grey-800 bg-opacity-60 py-8 px-8 filter backdrop-blur-md"
    >
      <div class="items-center space-y-8 text-body">
        <div class="space-y-4">
          <a href="/" class="flex flex-row gap-4">
            <img
              src="../../../assets/logo.png"
              alt="Pokaimon logo"
              id="logo"
              class="h-8"
            />
            <label
              for="logo"
              class="my-auto cursor-pointer text-lg font-bold text-white"
              >Pokaimon</label
            >
          </a>
          <p>
            Made with
            <span class="text-brand-main">❤</span>
            by
            <a href="/contributors" class="text-white"> the team</a><br /><span
              class="flex"
            >
              <span>in </span>
              <FlagID class="my-auto ml-1 h-3 rounded-sm" /><span>, </span>
              <FlagDE class="my-auto mx-1 h-3 rounded-sm" /> <span>&</span>
              <FlagFR class="my-auto ml-1 h-3 rounded-sm" />.
            </span>
          </p>
        </div>

        <div class="space-y-4">
          <img src="../../../assets/undefined.svg" class="w-56" />
          <div>
            <p>© 2022 undefined labs</p>
            <div class="flex space-x-2 text-sm">
              <a class="text-grey-300" href="/privacy">Privacy Policy</a>
              <p>•</p>

              <a class="text-grey-300" href="/licenses">License Notice</a>
            </div>
          </div>
        </div>
      </div>
      <div class="items-center space-y-12 text-body">
        <div class="space-y-4">
          <h2 for="logo" class="my-auto text-lg font-bold text-white">
            About Pokaimon
          </h2>
          <div class="grid grid-cols-2 gap-x-12 gap-y-4">
            <a href="/game">Play Now</a>
            <a href="/get-started"> Get Started </a>
            <button
              onclick="showInstallPromotion()"
              class="transition duration-300 hover:text-brand-second hover:underline"
            >
              <!-- if someone can make this work that'd be amazing ty -->
              Install Pokaimon
            </button>
            <a href="/branding">Branding</a>
            <a
              href="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9uL2Jsb2IvbWFpbi9DT05UUklCVVRJTkcubWQ="
              >Contributing</a
            >
            <a
              href="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9uL2lzc3Vlcw=="
              >Issue Tracker</a
            >
            <a
              href="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9u"
              >GitHub Repo</a
            >
          </div>
        </div>
      </div>
      <div class="items-center space-y-12 text-body">
        <div class="space-y-4">
          <h2 for="logo" class="my-auto text-lg font-bold text-white">
            Pokaimon Community
          </h2>
          <div class="grid grid-cols-2 gap-x-12 gap-y-4">
            <a
              href="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9u"
              class="flex gap-2"
            >
              <IconGitHub class="my-auto h-5 w-5" />
              GitHub
            </a>
            <a href="/linkout?url=L2Rpc2NvcmQuanBn" class="flex gap-2">
              <IconDiscord class="my-auto h-5 w-5" />
              Discord Server
            </a>
            <a href="/linkout?url=L3R3aXR0ZXIuanBn" class="flex gap-2">
              <IconTwitter class="my-auto h-5 w-5" />
              @PokaimonGame
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import IconDiscord from "virtual:icons/fa6-brands/discord";
import IconGitHub from "virtual:icons/fa6-brands/github";
import IconTwitter from "virtual:icons/fa6-brands/twitter";
import FlagID from "virtual:icons/flagpack/id";
import FlagDE from "virtual:icons/flagpack/de";
import FlagFR from "virtual:icons/flagpack/fr";
</script>
