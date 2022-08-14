<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        See you then, traveller.
      </h1>
      <h2 class="mb-2 text-xl text-body">
        You're about to be redirected to an external page.
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

onBeforeMount(async () => {
  const uri = window.location.href.split("?")[1];

  // const buffer = Buffer.from(uri, "base64url");
  // const decode = buffer.toString("ascii");

  // console.log(decode);

  setTimeout(() => {
    window.location.href = atob(uri.slice(4));
    console.log(uri.slice(4));
  }, 2500);
});
</script>
