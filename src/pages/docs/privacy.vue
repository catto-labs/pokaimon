<template>
  <div>
    <Navbar class="fixed top-0 z-50 w-full" />
    <main class="px-8 py-32">
      <div class="flex flex-col items-center justify-center gap-4 text-left">
        <h1 class="mb-8 text-4xl font-bold text-head">Privacy Policy</h1>
        <p class="max-w-xl">
          Your privacy is important to us. This privacy policy discloses how we
          store and use your data.
        </p>
        <p class="max-w-xl">
          undefined labs is commited to protecting the personal data of Pokaimon
          consumers safe and secure.
        </p>
        <p class="max-w-xl">
          Please read the details in this privacy policy, which provide
          additional relevant information. This statement applies to the
          interactions undefined labs has with you and Pokaimon.
        </p>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center gap-4">
        <h2 class="text-center text-xl text-body">Information We Gather</h2>
        <p class="w-[36rem]">
          undefined labs collects data from you, through our interactions with
          you and through our products. Only you provide some of this data
          directly, as we do not implement any telemetry in our products.
        </p>
        <ol class="ml-12 w-[36rem] list-disc">
          <li>Your e-mail address</li>
          <li>Your traveler's username</li>
          <li>Your amount of Primogems</li>
          <li>Your amount of experience points</li>
        </ol>
        <p class="w-[36rem]">
          You have choices when it comes to the technology you use and the data
          you share. When we ask you to provide personal data, you can decline.
          Many of our products require some personal data to provide you with a
          service. If you choose not to provide data required to provide you
          with a product or feature, you cannot use that product or feature.
        </p>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center gap-4">
        <h2 class="text-center text-xl text-body">
          Access To Your Information
        </h2>
        <p class="w-[36rem]">
          undefined labs will not grant access to personal information about you
          to anyone but the respective client. Only undefined labs has access to
          said information and refuse to give in into any external force.
        </p>
        <p class="w-[36rem]">
          undefined labs keeps the personal information of clients safe and away
          from any use without proper consent.
        </p>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center gap-4">
        <h2 class="text-center text-xl text-body">
          How We Use Your Information
        </h2>
        <p class="w-[36rem]">
          undefined labs uses your information to provide you with rich,
          interactive experiences on Pokaimon. In particular, we use the
          information to:
        </p>
        <ol class="ml-12 w-[36rem] list-disc">
          <li>Provide you with login authorisation</li>
          <li>Improve and develop our products</li>
        </ol>
      </div>
    </main>
    <Footer class="bottom-0 w-full" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";
</script>
