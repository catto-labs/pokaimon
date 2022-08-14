<template>
  <div class="bg-gray-900 flex flex-col items-center py-32 px-6">
    <div class="text-center">
      <h1 class="mb-2 text-4xl font-bold text-head">
        Welcome, {{ state.username }}!
      </h1>
      <h2 class="mb-2 text-xl text-body">Which character best suits you?</h2>
    </div>
    <form @submit="handleSubmit" class="flex flex-col gap-4 pt-16">
      <div class="flex flex-row gap-10 sm:gap-16">
        <button type="button" @click="state.traveller = 'aether'">
          <img
            src="https://i.imgur.com/MicjQA4.png"
            class="aspect-square h-auto w-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
            :class="{
              'border-brand-main bg-grey-700': state.traveller === 'aether',
            }"
          />
        </button>
        <button type="button" @click="state.traveller = 'lumine'">
          <img
            src="https://i.imgur.com/MF0fPNp.png"
            class="aspect-square h-auto w-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
            :class="{
              'border-brand-main bg-grey-700': state.traveller === 'lumine',
            }"
          />
        </button>
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
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

const router = useRouter();

const state = reactive<{
  traveller: "lumine" | "aether" | null;
  username: string | null;
}>({
  traveller: null,
  username: null,
});

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!state.traveller) return alert("Please choose a traveller");

  const { error } = await supabase
    .from("users")
    .update({ starter_traveller: state.traveller })
    .match({ id: supabase.auth.session()?.user?.id });

  if (error) return alert(error);

  router.push("/game");

  store.showOnboarding = false;
  localStorage.setItem("showOnboarding", "false");
};

// onBeforeMount(() => {
//   if (!store.showOnboarding) router.push("/register");
//   if (supabase.auth.session() === null) router.push("/register");
// });

onMounted(async () => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: supabase.auth.session()?.user?.id });

  if (error) alert(error);

  if (data !== null) {
    if (data[0].username === null) state.username = "Traveller";
    else state.username = data[0].username;
  } else {
    state.username = "Traveller";
  }
});
</script>