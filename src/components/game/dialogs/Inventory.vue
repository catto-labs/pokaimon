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
            <DialogPanel class="flex flex-col gap-8 md:flex-row">
              <template v-if="store.user_data && selected_character">
                <div
                  class="flex w-full max-w-xl transform flex-col overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
                >
                  <button
                    class="absolute top-4 right-4 rounded-lg bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40 md:hidden"
                    @click="props.close"
                  >
                    <IconClose />
                  </button>

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

                  <div class="flex-rows mt-6 flex justify-between gap-2">
                    <CharacterInventoryCard
                      v-for="(character, index) in store.user_inventory"
                      :key="index"
                      :character_id="character.id"
                      :index="1"
                      :bound_character_id="store.user_data.selected_character as number"
                      :character_name="character.base_character.name"
                      @equip-character="equipCharacter"
                    />
                  </div>
                </div>
                <div
                  class="flex w-full max-w-xl transform flex-col overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div class="flex w-full flex-row justify-between">
                    <div class="space-y-2">
                      <DialogTitle
                        as="h3"
                        class="text-gray-900 text-lg font-bold leading-6"
                        >Equiped Card</DialogTitle
                      >
                      <DialogDescription class="text-gray-500 mt-2 text-sm">
                        This is the card you currently have equiped.
                      </DialogDescription>
                    </div>

                    <button
                      class="absolute top-4 right-4 hidden rounded-lg bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40 md:block"
                      @click="props.close"
                    >
                      <IconClose />
                    </button>
                  </div>

                  <div class="mt-8 flex flex-row justify-between gap-2">
                    <div class="space-y-2">
                      <h2 class="my-2 text-lg font-bold text-head">
                        {{ selected_character.base_character.name }}
                      </h2>
                      <p class="my-2">
                        {{ selected_character.base_character.description }}
                      </p>
                    </div>
                    <img
                      :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${selected_character.base_character.name.toLowerCase()}.png`"
                      class="h-20 rounded-full border-2 border-grey-700"
                      :alt="`A picture of ${selected_character.base_character.name}`"
                    />
                  </div>
                  <hr class="my-8 text-grey-700" />
                  <div class="flex flex-row gap-16">
                    <div class="space-y-1">
                      <h2 class="font-bold">Your Character</h2>
                      <div class="flex gap-1">
                        <IconAccountArrowUp class="my-auto text-body" />
                        <span class="my-auto text-body"
                          >{{ selected_character.xp }}XP</span
                        >
                      </div>
                      <!-- <div class="flex gap-1">
                        <IconAccountPlus class="my-auto text-body" />
                        <span class="my-auto text-body">Lvl. 46</span>
                      </div> -->
                      <div class="flex gap-1">
                        <IconAccountHeart class="my-auto text-body" />
                        <span class="my-auto text-body"
                          >Max. {{ selected_character.health }}HP</span
                        >
                      </div>
                    </div>
                    <div class="space-y-1">
                      <h2 class="font-bold">Character Statistics</h2>
                      <div class="flex gap-1">
                        <IconAtom class="my-auto text-body" />
                        <span class="my-auto text-body">{{
                          selected_character.base_character.element
                        }}</span>
                      </div>
                      <div class="flex gap-1">
                        <IconMapMarkerRadius class="my-auto text-body" />
                        <span class="my-auto text-body">{{
                          capitalizeFirstLetter(
                            selected_character.base_character.region
                          )
                        }}</span>
                      </div>
                      <div class="flex gap-1">
                        <IconHeartHalfFull class="my-auto text-body" />
                        <span class="my-auto text-body"
                          >Min.
                          {{
                            selected_character.base_character.base_health
                          }}HP</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <h3>Loading...</h3>
              </template>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import IconClose from "virtual:icons/mdi/close";
import IconAtom from "virtual:icons/mdi/atom";
import IconMapMarkerRadius from "virtual:icons/mdi/map-marker-radius";
import IconHeartHalfFull from "virtual:icons/mdi/heart-half-full";
import IconAccountArrowUp from "virtual:icons/mdi/account-arrow-up";
import IconAccountPlus from "virtual:icons/mdi/account-plus";
import IconAccountHeart from "virtual:icons/mdi/account-heart";

import CharacterInventoryCard from "@/components/game/CharacterInventoryCard.vue";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

import { store } from "@/utils/store";
import { supabase } from "@/utils/supabase";
import { capitalizeFirstLetter } from "@/utils/globals";

import { defineProps, computed } from "vue";
const props = defineProps<{
  open: boolean;
  close: () => unknown;
}>();

const selected_character = computed(() => {
  if (!store.user_data || !store.user_inventory) return;

  return store.user_inventory.find(
    (character) => character.id === store.user_data?.selected_character
  );
});

const equipCharacter = async (character_id: number) => {
  if (!store.user_data) return;

  const { error } = await supabase
    .from("users")
    .update({ selected_character: character_id })
    .match({ id: store.user_data.id });

  if (error) {
    alert("Unable to equip this character. Please, try again.");
    return;
  }
};
</script>
