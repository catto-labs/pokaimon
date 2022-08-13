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
            img="https://cdn.discordapp.com/avatars/967724967741513808/d5f674fa1e3632cd62f32b49041e8877.png"
            role="UI Designer"
          />
          <MainContributor
            name="Trobonox"
            img="https://cdn.discordapp.com/avatars/540898474288480256/2ad101f74adc81bd5f8155298c791fa4.png"
            role="Lead Developer"
          />
          <MainContributor
            name="Vexcited"
            img="https://cdn.discordapp.com/avatars/466655433415720992/f5e3debcf661a6ed65301a34aaaa1b88.png"
            role="Frontend Developer"
          />
        </div>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 text-center text-xl text-body">Other Contributors</h2>
        <div class="flex flex-col gap-12 md:flex-row">
          <IndirectContributor
            name="tart"
            img="https://cdn.discordapp.com/avatars/466453424930553856/ddebd51f7c60c80d16cbac8a85f304d1.png"
            role="Character Stats."
          />
          <IndirectContributor
            name="Aiko"
            img="https://cdn.discordapp.com/avatars/697062367426510948/5d349c64afb707308210589f0be13452.png"
            role="Misc. Artwork"
          />
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
import Footer from "../components/pages/global/Footer.vue";
import MainContributor from "@/components/pages/contributors/MainContributor.vue";
import IndirectContributor from "@/components/pages/contributors/IndirectContributor.vue";

import { supabase } from "@/utils/supabase";

import { store } from "@/utils/store";

const router = useRouter();

onBeforeMount(() => {
  if (supabase.auth.session() !== null && store.showOnboarding) {
    router.push("/onboarding");
  }
});
</script>
