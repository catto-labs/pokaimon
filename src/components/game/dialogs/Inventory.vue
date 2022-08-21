<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="props.close" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-100 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-grey-900 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex justify-between">
                <div class="space-y-2">
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-lg font-bold leading-6"
                    >Inventory</DialogTitle
                  >
                  <DialogDescription class="text-gray-500 mt-2 text-sm">
                    You are viewing all characters you own!
                  </DialogDescription>
                </div>

                <button
                  class="mb-auto h-fit rounded-md bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                  @click="props.close"
                >
                  <IconClose />
                </button>
              </div>

              <div class="mt-6 flex justify-between gap-2" v-if="state.loaded">
                <CharacterInventoryCard
                  v-for="(character, index) in state.characters"
                  :key="index"
                  :character_id="character.id"
                  :index="1"
                  :bound_character_id="state.user.selected_character?.id"
                  :character_name="character.base_character.name"
                  @equip-character="equipCharacter"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import IconClose from "virtual:icons/mdi/close";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

import { supabase, getFullUser } from "@/utils/supabase";
// import { capitalizeFirstLetter } from "@/utils/globals";

import { reactive, onBeforeMount, defineProps } from "vue";

import { useRouter } from "vue-router";

import CharacterInventoryCard from "@/components/game/CharacterInventoryCard.vue";

import { store } from "@/utils/store";

const router = useRouter();

const props = defineProps<{
  open: boolean;
  close: () => unknown;
}>();

interface BaseCharacter {
  name: string;
}

interface Character {
  id: number;
  base_character: BaseCharacter;
  owner: string;
}

const state = reactive<
  | {
      loaded: true;
      user: Awaited<ReturnType<typeof getFullUser>>["data"];
      characters: Character[];
    }
  | { loaded: false }
>({
  loaded: false,
});

const equipCharacter = async (character_id: number) => {
  if (!state.loaded) return;

  const user_id = store.authSession?.user?.id;
  if (!user_id) {
    router.push("/game");
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .update({ selected_character: character_id })
    .match({ id: store.authSession?.user?.id });

  if (error || !data) {
    alert("Something went wrong, going back to map...");
    router.push("/game");
    return;
  }

  const { data: user_data, error: user_error } = await getFullUser(user_id);

  if (user_error || !user_data) {
    alert(
      "Something went wrong getting your new user info, going back to map..."
    );
    router.push("/game");
    return;
  }

  state.user = user_data;
};

onBeforeMount(async () => {
  const user_id = store.authSession?.user?.id;
  if (!user_id) {
    router.push("/game");
    return;
  }

  const { data: user_data, error: user_error } = await getFullUser(user_id);

  if (user_error || !user_data) {
    alert("Something went wrong getting your user info, going back to map...");
    router.push("/game");
    return;
  }

  const { data: characters_data, error: characters_error } = await supabase
    .from("character_inventory")
    .select(
      `
      id,
      base_character(
        name
      ),
      owner
    `
    )
    .match({ owner: user_id });

  if (characters_error || !characters_data) {
    alert("Something went wrong getting your characters, going back to map...");
    router.push("/game");
    return;
  }

  Object.assign(state, {
    loaded: true,
    user: user_data,
    characters: characters_data,
  });
});
</script>
