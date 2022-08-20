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
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex justify-between">
                <div class="space-y-2">
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-lg font-bold leading-6"
                    >Shop</DialogTitle
                  >
                  <DialogDescription class="text-gray-500 mt-2 text-sm">
                    Here, you'll be able to buy characters with your primogens!
                  </DialogDescription>
                </div>

                <button
                  class="mb-auto h-fit rounded-md bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                  @click="props.closeShopDialog"
                >
                  <IconClose />
                </button>
              </div>

              <div class="mt-6 flex justify-between gap-2" v-if="state.loaded">
                <div
                  @click="processPayment(character.id)"
                  class="cursor-pointer rounded-lg border border-grey-600 bg-grey-700 p-3"
                  :key="character.id"
                  v-for="character in state.characters"
                >
                  <h4 class="text-lg font-bold">{{ character.name }}</h4>

                  <span>{{ character.price }} primogems</span>
                </div>
              </div>

              <button
                v-if="state.loaded"
                class="mt-4 rounded-lg bg-brand-main py-1 px-3"
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

import { supabase } from "@/utils/supabase";
import { capitalizeFirstLetter } from "@/utils/globals";

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
    alert("An error occurred when processing the payment.");
    return;
  }
};
</script>
