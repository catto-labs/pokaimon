<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-grey-900 px-6"
  >
    <div class="mb-4 w-full max-w-md rounded-xl bg-black p-7">
      <h1 class="mb-2 text-4xl font-bold text-head">Create an account</h1>

      <form @submit="handleSubmit" class="flex flex-col gap-4 pt-4">
        <LabelledInput
          type="email"
          v-model="state.email"
          label="Email address"
          placeholder="traveler@pokaimon.ml"
        />
        <LabelledInput
          type="password"
          v-model="state.password"
          label="Password"
        />
        <button
          type="submit"
          class="mt-2 w-full rounded-2xl bg-grey-700 py-2 px-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
        >
          Continue
        </button>
      </form>

      <hr class="my-4 text-grey-700" />

      <h2 class="mb-4 text-center text-lg text-note">
        Alternatively, continue with...
      </h2>

      <div class="flex justify-between gap-2.5">
        <button
          @click="signInWithProvider('discord')"
          type="button"
          class="flex w-full justify-center rounded-xl border-2 border-[#5865F2] bg-grey-700 py-2 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#5865F2]"
        >
          <IconDiscord />
        </button>
        <button
          @click="signInWithProvider('google')"
          type="button"
          class="flex w-full justify-center rounded-xl border-2 border-[#4285F4] bg-grey-700 py-2 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#4285F4]"
        >
          <IconGoogle />
        </button>
        <button
          @click="signInWithProvider('github')"
          type="button"
          class="flex w-full justify-center rounded-xl border-2 border-[#8F33AD] bg-grey-700 py-2 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#8F33AD]"
        >
          <IconGitHub />
        </button>
      </div>
    </div>
    <span class="text-lg text-grey-400"
      >Already have an account?
      <router-link
        to="/login"
        class="text-brand-main filter transition duration-300 ease-in-out hover:underline hover:brightness-125"
      >
        Log in here.
      </router-link>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import LabelledInput from "@/components/LabelledInput.vue";

import { supabase } from "@/utils/supabase";
import { Provider } from "@supabase/gotrue-js";

import IconDiscord from "virtual:icons/fa6-brands/discord";
import IconGoogle from "virtual:icons/fa6-brands/google";
import IconGitHub from "virtual:icons/fa6-brands/github";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  email: "",
  password: "",
});

const handleSubmit = (e: Event) => {
  e.preventDefault();

  const email = state.email.trim();
  const password = state.password.trim();

  if (email.length <= 0) return alert("Please enter an email adress");
  if (password.length <= 0) return alert("Please enter a password");

  signUpWithEmail(email, password);
};

const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  } catch (error: Error) {
    alert(error.error_description || error.message);
  } finally {
    router.push("/onboarding/user");
  }
};

const signInWithProvider = async (provider: Provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: window.location.origin + "/onboarding/user",
    },
  });
  if (error) alert(error.message);
};

onMounted(() => {
  // the 'official' Konami Code sequence
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
  ];

  // a variable to remember the 'position' the user has reached so far.
  let konamiCodePosition = 0;

  // add keydown event listener
  document.addEventListener("keydown", (e) => {
    // get the value of the required key from the konami code
    const requiredKey = konamiCode[konamiCodePosition];

    // compare the key with the required key
    if (e.code == requiredKey) {
      // move to the next key in the konami code sequence
      konamiCodePosition++;

      // if the last key is reached, activate cheats
      if (konamiCodePosition == konamiCode.length) {
        router.push("/easter-eggs/no-account");
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
});
</script>
