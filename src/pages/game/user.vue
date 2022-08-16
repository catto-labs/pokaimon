<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div
      class="mb-4 flex w-full max-w-4xl justify-between rounded-xl bg-black p-8"
    >
      <div class="flex flex-col space-y-8">
        <div class="flex space-x-8">
          <img
            v-if="state.traveller === 'aether'"
            src="@/assets/game/traveller/aether.png"
            class="aspect-square h-auto w-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
          />
          <img
            v-if="state.traveller === 'lumine'"
            src="@/assets/game/traveller/lumine.png"
            class="aspect-square h-auto w-40 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
          />
          <div class="mt-auto mb-4 flex space-x-4">
            <IconConstruction
              class="mt-auto text-2xl"
              v-tippy="{ content: 'Pokaimon Developer' }"
            />
            <IconGestureTap
              class="mt-auto mb-[0.1rem] text-2xl"
              v-tippy="{ content: 'Pokaimon User Interface' }"
            />
            <IconChartBar
              class="mt-auto text-2xl"
              v-tippy="{ content: 'Pokaimon Characters' }"
            />
            <IconBrush
              class="mt-auto text-2xl"
              v-tippy="{ content: 'Pokaimon Artwork' }"
            />
          </div>
        </div>
        <div>
          <h2 class="text-4xl font-bold">{{ state.username }}</h2>
          <h3 class="text-xl">
            Joined at {{ joinTime.toLocaleDateString("en-GB") }}
          </h3>
        </div>
      </div>
      <div class="mx-auto w-fit rounded-full bg-grey-700 p-1"></div>
      <div class="grid grid-cols-4 gap-4">
        <img src="@/assets/game/cards/back.svg" class="h-28" />
        <img src="@/assets/game/cards/back.svg" class="h-28" />
        <img src="@/assets/game/cards/back.svg" class="h-28" />
        <img src="@/assets/game/cards/back.svg" class="h-28" />
        <img src="@/assets/game/cards/back.svg" class="h-28" />
        <img src="@/assets/game/cards/back.svg" class="h-28" />
        <img src="@/assets/game/cards/back.svg" class="h-28" />
        <img src="@/assets/game/cards/back.svg" class="h-28" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconConstruction from "virtual:icons/mdi/construction";
import IconGestureTap from "virtual:icons/mdi/gesture-tap";
import IconChartBar from "virtual:icons/mdi/chart-bar";
import IconBrush from "virtual:icons/mdi/brush";

import { reactive, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "@/utils/supabase";

// this isnt supposed to be permanent if it wasnt obvious
const joinTime = new Date();

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

  if (data !== null) {
    if (data[0].starter_traveller === null) state.traveller = "aether";
    else state.traveller = data[0].starter_traveller;
  } else {
    state.traveller = null;
  }
});
</script>
