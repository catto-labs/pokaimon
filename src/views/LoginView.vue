<template>
  <div class="flex h-screen w-screen items-center justify-center bg-grey-900">
    <div class="w-full max-w-md rounded-xl bg-black p-11">
      <h1 class="mb-2 text-4xl font-bold text-head">Welcome back!</h1>

      <form @submit="handleSubmit" class="pt-4">
        <LabelledInput
          label="Email address"
          placeholder="traveler@pokaimon.ml"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import LabelledInput from "@/components/LabelledInput.vue";

const handleSubmit = (e: Event) => {
  e.preventDefault();

  console.log("hello");
};
</script>
