<template>
  <div>
    <footer
      class="flex w-full flex-col justify-between gap-6 rounded-t-xl border-t border-grey-700 bg-grey-800 bg-opacity-60 py-8 px-8 sm:flex-row sm:flex-wrap md:flex-nowrap md:gap-16"
    >
      <div class="items-center space-y-8 text-body">
        <div class="flex flex-col gap-4">
          <router-link to="/" class="flex flex-row gap-4">
            <img
              src="@/assets/branding/raster/pokaimon.png"
              alt="Pokaimon logo"
              id="logo"
              class="h-8"
            />
            <label
              for="logo"
              class="my-auto cursor-pointer text-lg font-bold text-white"
              >Pokaimon</label
            >
          </router-link>
          <p>
            Made with
            <span class="text-brand-main">❤</span>
            by
            <router-link to="/docs/contributors" class="text-white">
              the team</router-link
            ><br /><span class="flex">
              <span>in </span>
              <FlagID class="my-auto ml-1 h-3 rounded-sm" /><span>, </span>
              <FlagDE class="my-auto mx-1 h-3 rounded-sm" /> <span>&</span>
              <FlagFR class="my-auto ml-1 h-3 rounded-sm" />.
            </span>
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <img src="@/assets/branding/vector/undefined.svg" class="w-56" />
          <div>
            <p>© 2022 undefined labs</p>
            <div class="flex gap-2">
              <router-link class="text-sm text-grey-300" to="/docs/privacy"
                >Privacy Policy</router-link
              >
              <span>•</span>
              <router-link class="text-sm text-grey-300" to="/docs/licenses"
                >License Notice</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-12 text-body">
        <div class="flex w-max flex-col gap-4">
          <h2 for="logo" class="my-auto text-lg font-bold text-white">
            About Pokaimon
          </h2>
          <div class="grid w-full grid-cols-2 gap-x-12 gap-y-4">
            <router-link to="/game">Play Now</router-link>
            <router-link to="/get-started"> Get Started </router-link>
            <router-link to="/docs/branding">Branding</router-link>
            <router-link
              to="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9uL2Jsb2IvbWFpbi9DT05UUklCVVRJTkcubWQ="
              >Contributing
            </router-link>
            <router-link
              to="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9uL2lzc3Vlcw=="
              >Issue Tracker</router-link
            >
            <router-link
              to="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9u"
              >GitHub Repo</router-link
            >
          </div>
        </div>
      </div>

      <div class="items-center space-y-12 text-body">
        <div class="space-y-4">
          <h2 for="logo" class="my-auto text-lg font-bold text-white">
            Pokaimon Community
          </h2>
          <div class="flex flex-wrap gap-y-4 gap-x-12">
            <router-link
              to="/linkout?url=aHR0cHM6Ly9naXRodWIuY29tL3Ryb2Jvbm94L3Bva2FpbW9u"
              class="flex w-full gap-4"
            >
              <IconGitHub class="my-auto h-5 w-5" />
              GitHub
            </router-link>
            <router-link
              to="/linkout?url=L2Vhc3Rlci1lZ2dzL2Rpc2NvcmQtc2VydmVy"
              class="flex w-full gap-4"
            >
              <IconDiscord class="my-auto h-5 w-5" />
              Discord Server
            </router-link>
            <router-link
              to="/linkout?url=L2Vhc3Rlci1lZ2dzL3R3aXR0ZXItYWNjb3VudA=="
              class="flex w-full gap-4"
            >
              <IconTwitter class="my-auto h-5 w-5" />
              @PokaimonGame
            </router-link>
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
