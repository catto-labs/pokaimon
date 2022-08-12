<script setup lang="ts">
import { reactive } from "vue";
import LabelledInput from "@/components/LabelledInput.vue";

const state = reactive({
  email: "",
  password: "",
});

const handleSubmit = (e: Event) => {
  e.preventDefault();

  console.log("hello");
};
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center bg-grey-900">
    <div class="w-full max-w-md rounded-xl bg-black p-11">
      <h1 class="mb-2 text-4xl font-bold text-head">Welcome back!</h1>

      <form @submit="handleSubmit" class="flex flex-col gap-3 pt-4">
        <LabelledInput
          type="email"
          v-model="state.email"
          label="Email address"
          placeholder="traveler@pokaimon.ml"
        />

        <div class="flex flex-col gap-1 text-grey-500">
          <LabelledInput
            type="password"
            v-model="state.password"
            label="Password"
          />
          <span class="text-sm"> Forgot password? Huge skill issue ngl </span>
        </div>

        <button
          type="submit"
          class="mt-3 w-full rounded-2xl bg-grey-700 py-2 px-4 font-bold text-white"
        >
          Login
        </button>
      </form>

      <hr class="my-4 text-grey-700" />

      <h2 class="mb-4 text-center text-lg text-note">
        Alternatively, continue with...
      </h2>

      <div class="flex justify-center gap-2.5">
        <button
          type="button"
          class="rounded-2xl border border-purple bg-grey-700 py-1.5 px-10 font-bold text-white"
        >
          DC
        </button>
        <button
          type="button"
          class="rounded-2xl border border-blue bg-grey-700 py-1.5 px-10 font-bold text-white"
        >
          GG
        </button>
        <button
          type="button"
          class="rounded-2xl border border-fuchsia bg-grey-700 py-1.5 px-10 font-bold text-white"
        >
          GH
        </button>
      </div>
    </div>
  </div>
</template>
