<template>
  <div class="bg-gray-900 flex flex-col items-center py-32">
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">Welcome, [name]!</h1>
      <h2 class="mb-2 text-xl text-body">Which character best suits you?</h2>
    </div>
    <form @submit="handleSubmit" class="flex flex-col gap-4 pt-16">
      <div class="flex flex-row gap-16">
        <img
          src="https://i.imgur.com/MicjQA4.png"
          class="aspect-square h-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500 focus:bg-opacity-80"
        />
        <img
          src="https://i.imgur.com/MF0fPNp.png"
          class="aspect-square h-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500 focus:bg-opacity-80"
        />
      </div>
      <button
        type="submit"
        class="mt-2 w-full rounded-2xl bg-grey-700 py-2 px-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
      >
        Proceed
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

const router = useRouter();

const state = reactive({
  username: "",
  tag: "",
});

const handleSubmit = (e: Event) => {
  e.preventDefault();

  if (state.username === "") return alert("Please enter a username");
  if (state.tag === "") return alert("Please enter a tag");

  // signUpWithEmail(state.email, state.password);
  // something here idk what im doing tbh ~Pixel
};

onBeforeMount(() => {
  if (supabase.auth.session() === null) router.push("/register");

  store.showOnboarding = false;
});
</script>
