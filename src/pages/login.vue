<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center px-6"
  >
    <div class="mb-4 w-full max-w-md rounded-xl bg-black p-8">
      <h1 class="mb-2 text-4xl font-bold text-head">Welcome back!</h1>

      <form @submit="handleSubmit" class="flex flex-col gap-4 pt-4">
        <LabelledInput
          type="email"
          v-model="state.email"
          label="Email address"
          placeholder="traveler@pokaimon.ml"
        />

        <div class="flex flex-col space-y-2 text-grey-500">
          <LabelledInput
            type="password"
            v-model="state.password"
            label="Password"
          />
          <span class="text-sm"> Forgot password? Try the Konami code ;) </span>
        </div>
        <button
          type="submit"
          class="mt-2 w-full rounded-2xl bg-grey-700 py-2 px-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
        >
          Login
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
      >Need an account?
      <RouterLink
        to="/register"
        class="text-brand-main filter transition duration-300 ease-in-out hover:underline hover:brightness-125"
      >
        Create one here.
      </RouterLink>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import IconDiscord from "virtual:icons/fa6-brands/discord";
import IconGoogle from "virtual:icons/fa6-brands/google";
import IconGitHub from "virtual:icons/fa6-brands/github";

import type { Provider } from "@supabase/gotrue-js";

import { supabase } from "@/utils/supabase";
import { konamiCodeHandler } from "@/utils/globals";
import { useRouter } from "vue-router";

import LabelledInput from "@/components/LabelledInput.vue";

const router = useRouter();

const state = reactive({
  email: "",
  password: "",
});

const handleSubmit = (e: Event) => {
  e.preventDefault();

  const email = state.email.trim();
  const password = state.password.trim();

  if (email.length <= 0) return alert("Please enter an email address.");
  if (password.length <= 0) return alert("Please enter a password.");

  signInWithEmail(email, password);
};

const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  router.push("/game");
};

const signInWithProvider = async (provider: Provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + "/oauth-login",
    },
  });

  if (error) alert(error.message);
};

const konamiCodeListener = konamiCodeHandler(() =>
  router.push("/easter-eggs/forgot-password")
);

onMounted(() => document.addEventListener("keydown", konamiCodeListener));
onUnmounted(() => document.removeEventListener("keydown", konamiCodeListener));
</script>
