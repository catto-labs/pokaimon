<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="props.closeShopDialog" class="relative z-50">
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
            <DialogPanel class="max-w-3xl">
              <div
                class="w-full transform overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
              >
                <div class="flex justify-between">
                  <div class="space-y-2">
                    <DialogTitle
                      as="h3"
                      class="text-gray-900 text-lg font-bold leading-6"
                      >Shop</DialogTitle
                    >
                    <DialogDescription class="text-gray-500 mt-2 text-sm">
                      Buy some characters with your primos!
                    </DialogDescription>
                  </div>

                  <button
                    class="mb-auto h-fit rounded-md bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                    @click="props.closeShopDialog"
                  >
                    <IconClose />
                  </button>
                </div>
              </div>

              <div
                class="mt-6 flex flex-col justify-between gap-2 md:flex-row"
                v-if="state.loaded && store.user_data"
              >
                <div
                  class="group flex max-w-md flex-col justify-end rounded-lg border border-grey-600 bg-grey-700 transition duration-300 ease-in-out hover:-translate-y-0.5 md:max-w-none"
                  :key="character.id"
                  v-for="character in state.characters"
                >
                  <div
                    class="clipEverythingOutOfDiv relative flex h-full w-full flex-col items-center justify-end rounded-md bg-grey-700"
                  >
                    <img
                      :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/bodies/${character.name.toLowerCase()}.png`"
                      class="h-full w-auto rounded-lg bg-grey-800 object-cover"
                    />

                    <div
                      class="absolute top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-end rounded-lg bg-gradient-to-b from-[transparent] to-grey-700 p-4"
                    >
                      <div
                        class="translate-y-4 transition duration-300 ease-in-out group-hover:-translate-y-2"
                      >
                        <h4 class="text-2xl font-bold text-head">
                          {{ character.name }}
                        </h4>

                        <span class="font-bold text-note"
                          >{{ character.price }} Primogems</span
                        >
                      </div>

                      <button
                        @click="processPayment(character.id)"
                        class="translate-y-20 rounded-lg px-6 py-1 transition duration-300 ease-in-out group-hover:translate-y-0"
                        :class="{
                          'bg-brand-main': !checkCharacterInInventory(
                            character.id
                          ),
                          'bg-grey-800': checkCharacterInInventory(
                            character.id
                          ),
                        }"
                        :disabled="
                          checkCharacterInInventory(character.id)
                            ? true
                            : store.user_data.primos < character.price
                        "
                      >
                        {{
                          checkCharacterInInventory(character.id)
                            ? "You already own this character"
                            : store.user_data.primos < character.price
                            ? "Don't have enough primos..."
                            : "Buy !"
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                v-if="state.loaded"
                class="mt-4 w-full rounded-lg border border-grey-700 bg-grey-700 py-2 px-3 shadow-lg"
                @click="refreshShopCharacters"
              >
                Refresh
              </button>
              <p v-else>Loading characters...</p>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { CharacterInfoTable } from "@/types/Database";

import IconClose from "virtual:icons/mdi/close";

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

import { reactive, onBeforeMount } from "vue";

const state = reactive<{
  loaded: boolean;
  characters: CharacterInfoTable[];
}>({
  loaded: false,
  characters: [],
});

const props = defineProps<{
  open: boolean;
  closeShopDialog: () => unknown;
}>();

const checkCharacterInInventory = (character_id: number) => {
  if (!store.user_inventory) return false;

  return store.user_inventory.find(
    (character) => character.base_character.id === character_id
  );
};

const refreshShopCharacters = async () => {
  state.loaded = false;

  const { data, error } = await supabase
    .from("character_info")
    .select()
    .match({ buyable: true })
    .select();

  if (!data || error) {
    state.characters = [];
  } else {
    state.characters = data;
  }

  state.loaded = true;
};

onBeforeMount(() => refreshShopCharacters());

/** Invoke the `buy-character` edge function to buy a character. */
const processPayment = async (id: number) => {
  const { data: response, error } = await supabase.functions.invoke(
    "buy-character",
    {
      body: {
        id,
      },
    }
  );

  if (error || response.error || !response.success) {
    alert(response.error || "An error occurred when processing the payment.");
    return;
  }
};
</script>

<style>
.clipEverythingOutOfDiv {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
</style>
