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
        <Menu as="div">
          <div>
            <MenuButton
              v-tippy="{ content: 'Click to see more options!' }"
              class="my-auto flex space-x-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md transition duration-300 hover:bg-grey-700"
            >
              <IconUser class="my-auto" />
              <span class="my-auto text-white">{{ state.username }}</span>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="mt-2 mr-auto w-56 origin-top-right divide-y divide-grey-100 rounded-md bg-grey-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-grey-600 text-white' : 'text-white',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Copy to clipboard
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-grey-600 text-white' : 'text-white',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Logout of Pokaimon
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div
          class="my-auto flex cursor-default space-x-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
        >
          <img src="@/assets/game/primogem.svg" class="my-auto h-4" />
          <span class="my-auto text-white">{{
            primo.toLocaleString("en-GB")
          }}</span>
        </div>
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
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

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
