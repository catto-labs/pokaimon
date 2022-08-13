<template>
  <div class="bg-gray-900 flex flex-col items-center py-32 px-6">
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">Let your name be known.</h1>
      <h2 class="mb-2 text-xl text-body">What should we call you?</h2>
    </div>
    <form
      @submit="handleSubmit"
      class="flex w-full flex-col gap-4 pt-16 sm:w-auto"
    >
      <div class="flex gap-2 sm:gap-8">
        <LabelledInput
          type="text"
          v-model="state.username"
          label="Username"
          class="w-full sm:w-3/4"
          placeholder="AwesomeTravellerName"
        />
        <LabelledInput
          type="text"
          v-model="state.tag"
          label="Tag"
          class="w-1/2 sm:w-1/4"
          placeholder="1337"
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

import LabelledInput from "@/components/LabelledInput.vue";

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
