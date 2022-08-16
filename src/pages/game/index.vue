<template>
  <div class="p-8">
    <div class="flex justify-between">
      <div class="flex space-x-8 text-white">
        <IconSettings class="my-auto text-3xl" />
        <IconPerson class="my-auto text-3xl" />
        <IconBackpack class="my-auto text-3xl" />
        <IconSwordCross class="my-auto text-3xl" />
      </div>
      <div class="flex space-x-4">
        <div
          class="my-auto flex cursor-default space-x-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
        >
          <img src="@/assets/game/primogem.svg" class="my-auto h-4" />
          <span class="my-auto text-white">{{
            primo.toLocaleString("en-GB")
          }}</span>
        </div>
        <button
          @click="copyToClipboard(state.username)"
          v-tippy="{ content: 'Click to copy user ID!' }"
          class="my-auto flex space-x-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md transition duration-300 hover:bg-grey-700"
        >
          <IconUser class="my-auto" />
          <span class="my-auto text-white">{{ state.username }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSettings from "virtual:icons/mdi/settings";
import IconPerson from "virtual:icons/mdi/person";
import IconBackpack from "virtual:icons/mdi/backpack";
import IconSwordCross from "virtual:icons/mdi/sword-cross";
import IconUser from "virtual:icons/mdi/user";

// this is just for testing purposes, they shouldn't be hard-coded.
const primo = 13525;

import { reactive, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";
import { copyToClipboard } from "@/utils/globals";

const router = useRouter();

const state = reactive<{
  traveller: "lumine" | "aether" | null;
  username: string | null;
}>({
  traveller: null,
  username: null,
});

onBeforeMount(() => {
  if (supabase.auth.session() === null) router.push("/login");
});

onMounted(async () => {
  if (supabase.auth.session() === null) return;

  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: supabase.auth.session()?.user?.id });

  if (error) alert(error.message);

  if (data !== null) {
    if (data[0].username === null) state.username = "Traveller";
    else state.username = data[0].username;
  } else {
    state.username = "Traveller";
  }
});
</script>
