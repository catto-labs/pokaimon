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
          :placeholder="randomisedUsername"
          pattern="[A-Za-z0-9_-]+"
        />
        <LabelledInput
          type="text"
          v-model="state.tag"
          label="Tag"
          class="w-1/2 sm:w-1/4"
          :placeholder="'#' + Math.floor(Math.random() * 9999).toString()"
          pattern="#[A-Za-z0-9]+"
          maxlength="7"
          minlength="3"
          @input="handleTagInput"
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

<route>
{
  meta: {
    requiresAuth: true,
    registerRedirect: true
  }
}
</route>

<script setup lang="ts">
import { adjectives, animals } from "@/assets/misc/usernames.json";

import { reactive } from "vue";
import { useRouter } from "vue-router";

import LabelledInput from "@/components/LabelledInput.vue";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
const randomAni = animals[Math.floor(Math.random() * animals.length)];

const randomisedUsername =
  randomAdj.charAt(0).toUpperCase() +
  randomAdj.slice(1) +
  randomAni.charAt(0).toUpperCase() +
  randomAni.slice(1);

const router = useRouter();
const state = reactive({
  username: "",
  tag: "#",
});

if ("user_data" in store && store.user_data && store.user_data.username) {
  router.push("/game");
}

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (state.username.trim() === "") return alert("Please enter a username");
  if (state.tag.trim().substring(1) === "") return alert("Please enter a tag");

  if (!("user_data" in store)) {
    return alert("User data not found, please try to refresh the page.");
  }

  const { data: username_check, error: username_check_error } = await supabase
    .from("users")
    .select()
    .match({ username: `${state.username}${state.tag}` });

  if (username_check_error) {
    return alert(
      "An error happened when checking if the username already exists. Please retry or use another one."
    );
  }

  if (username_check.length !== 0) {
    return alert("That username already exists, please use another one!");
  }

  const { error } = await supabase
    .from("users")
    .update({ username: `${state.username}${state.tag}` })
    .match({ id: store.user_data.id });

  if (error) {
    return alert(
      "An error happened when updating your username. Please retry."
    );
  }

  router.push("/onboarding/character");
};

const handleTagInput = () => {
  if (state.tag.indexOf("#") !== 0) state.tag = `#${state.tag}`;
};
</script>
