<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        What are you doing here?
      </h1>
      <h2 class="mb-2 text-xl text-body">Redirecting you to another page...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

router.push("/onboarding/user");
</script>
