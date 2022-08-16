<template>
  <div class="">
    <Navbar class="fixed top-0 z-50 w-full" />
    <main class="px-8 py-32">
      <div class="text-center">
        <h1 class="mb-2 text-4xl font-bold text-head">
          The Team & Contributors
        </h1>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 text-center text-xl text-body">Main Team Members</h2>
        <div class="flex flex-col gap-12 md:flex-row">
          <MainContributor
            name="Pixel"
            img="https://avatars.githubusercontent.com/u/66474423?v=4"
            role="UI Designer"
          />
          <MainContributor
            name="Trobonox"
            img="https://avatars.githubusercontent.com/u/57040351?v=4"
            role="Lead Developer"
          />
          <MainContributor
            name="Vexcited"
            img="https://avatars.githubusercontent.com/u/59152884?v=4"
            role="Front-end Developer"
          />
        </div>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 text-center text-xl text-body">Other Contributors</h2>
        <div class="flex flex-col gap-12 md:flex-row">
          <IndirectContributor
            name="tart"
            img="https://cdn.discordapp.com/avatars/466453424930553856/ddebd51f7c60c80d16cbac8a85f304d1.png"
            role="Character Buffs"
          />
          <IndirectContributor
            name="Aiko"
            img="https://cdn.discordapp.com/avatars/697062367426510948/5d349c64afb707308210589f0be13452.png"
            role="Misc. Artwork"
          />
        </div>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 text-center text-xl text-body">
          Miscellaneous Credits
        </h2>
        <div class="grid grid-cols-2 gap-12 md:flex-row">
          <div class="flex flex-col gap-2 text-right">
            <p class="font-bold">daz</p>
            <p class="font-bold">HoYoverse Pte. Ltd.</p>
            <p class="font-bold">Supabase Hackathon</p>
            <p class="font-bold">Lastly, you, the customer</p>
          </div>
          <div class="flex flex-col gap-2">
            <p>Emotional support for Pixel</p>
            <p>Allowing usage of Genshin character assets.</p>
            <p>Our main source of motivation.</p>
            <p>For being amazing!</p>
          </div>
        </div>
      </div>
    </main>
    <Footer class="bottom-0 w-full" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";
import MainContributor from "@/components/pages/docs/contributors/MainContributor.vue";
import IndirectContributor from "@/components/pages/docs/contributors/IndirectContributor.vue";

import { supabase } from "@/utils/supabase";

import { store } from "@/utils/store";

const router = useRouter();

onBeforeMount(() => {
  if (supabase.auth.session() !== null && store.showOnboarding) {
    router.push("/onboarding");
  }
});
</script>
