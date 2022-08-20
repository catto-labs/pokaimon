<template>
  <Navbar class="fixed top-0 z-50 w-full" />
  <main class="min-h-screen px-8 py-32">
    <div v-if="!state.cards" class="flex justify-center">
      <div class="flex flex-col text-center">
        <h1 class="mb-2 text-4xl font-bold text-head">Fetching cards...</h1>
        <h2 class="mb-2 text-xl text-note">Hang on for a few seconds!</h2>
      </div>
    </div>
    <div class="grid grid-cols-none justify-center gap-4 md:grid-cols-2" v-else>
      <div
        :key="character.id"
        class="flex cursor-pointer flex-col justify-between gap-6 rounded-xl border border-grey-700 bg-black p-4 transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-grey-700 hover:bg-opacity-60 hover:shadow"
        v-for="(character, character_index) in state.cards"
        @click="openCardInfo(character_index)"
      >
        <div class="flex gap-4">
          <div class="space-y-2">
            <div class="flex justify-between gap-4">
              <div>
                <h3 class="text-lg font-bold text-head">
                  {{ character.name }}
                </h3>
                <p>{{ character.description }}</p>
              </div>
              <div class="min-w-fit">
                <img
                  :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${character.name.toLowerCase()}.png`"
                  class="aspect-square h-16 w-16 rounded-full border-2 border-grey-700"
                  :alt="`A picture of ${character.name}`"
                />
                <div
                  class="absolute z-10 -my-6 ml-10 rounded-full bg-grey-700 p-1"
                  v-tippy="{ content: character.element }"
                >
                  <img
                    :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/misc-artwork/elements/${character.element.toLowerCase()}.svg`"
                    :alt="`${character.element} element icon`"
                    class="h-5"
                  />
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex gap-1">
                <IconAtom class="my-auto text-note" />
                <span class="my-auto text-note">{{ character.element }}</span>
              </div>
              <div class="flex gap-1">
                <IconMapMarkerRadius class="my-auto text-note" />
                <span class="my-auto text-note">{{
                  capitalizeFirstLetter(character.region)
                }}</span>
              </div>
              <div class="flex gap-1">
                <IconHeartHalfFull class="my-auto text-note" />
                <span class="my-auto text-note"
                  >Min. {{ character.base_health }}HP</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <TransitionRoot appear :show="state.card_info_opened" as="template">
    <Dialog as="div" @close="closeCardInfo" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
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
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-4xl transform overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div v-if="state.cards && state.selected_card !== null">
                <div class="mb-4 flex justify-between">
                  <div class="space-y-2">
                    <DialogTitle
                      as="h3"
                      class="text-gray-900 text-xl font-bold leading-6"
                    >
                      {{ state.cards[state.selected_card].name }}
                    </DialogTitle>
                  </div>

                  <button
                    class="mb-auto h-fit rounded-md bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                    @click="closeCardInfo"
                  >
                    <IconClose />
                  </button>
                </div>

                <div class="grid gap-2 md:grid-cols-2">
                  <div
                    class="flex flex-col justify-between rounded-lg border border-grey-700 p-3"
                    :key="action.id"
                    v-for="action in getActionsOf(state.selected_card)"
                  >
                    <div class="mb-4">
                      <h4 class="text-lg">{{ action.name }}</h4>
                      <p class="text-sm">{{ action.description }}</p>
                    </div>

                    <div class="block">
                      <span
                        class="block"
                        v-if="
                          action.enemy_min_damage > 0 ||
                          action.enemy_max_damage > 0
                        "
                        >Up
                        {{
                          action.enemy_min_damage === action.enemy_max_damage
                            ? `to ${action.enemy_max_damage}`
                            : `from ${action.enemy_min_damage} to ${action.enemy_max_damage}`
                        }}
                        HP damage ({{ action.enemy_hit_chance * 100 }}% of hit
                        chance)</span
                      >
                      <span
                        class="block"
                        v-if="
                          action.self_min_damage < 0 ||
                          action.self_max_damage < 0
                        "
                        >Heal
                        {{
                          action.self_min_damage === action.self_max_damage
                            ? `to ${Math.abs(action.self_min_damage)}`
                            : `from ${Math.abs(
                                action.self_max_damage
                              )} to ${Math.abs(action.self_min_damage)}`
                        }}
                        HP ({{ action.self_hit_chance * 100 }}% of chance)</span
                      >
                      <span
                        class="block"
                        v-else-if="
                          action.self_min_damage > 0 ||
                          action.self_max_damage > 0
                        "
                        >Self damage
                        {{
                          action.self_min_damage === action.self_max_damage
                            ? `to ${action.self_max_damage}`
                            : `from ${action.self_min_damage} to ${action.self_max_damage}`
                        }}
                        HP ({{ action.self_hit_chance * 100 }}% of chance)</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <Footer class="bottom-0 w-full" />
</template>

<script setup lang="ts">
import IconAtom from "virtual:icons/mdi/atom";
import IconMapMarkerRadius from "virtual:icons/mdi/map-marker-radius";
import IconHeartHalfFull from "virtual:icons/mdi/heart-half-full";
import IconClose from "virtual:icons/mdi/close";

import type {
  CharacterInfoTable,
  CharacterActionsTable,
} from "@/types/Database";

import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

import { capitalizeFirstLetter } from "@/utils/globals";
import { supabase } from "@/utils/supabase";
import { onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const state = reactive<{
  cards:
    | (Omit<
        CharacterInfoTable,
        "action_1" | "action_2" | "action_3" | "action_4"
      > & {
        action_1: CharacterActionsTable;
        action_2: CharacterActionsTable;
        action_3: CharacterActionsTable;
        action_4: CharacterActionsTable;
      })[]
    | null;

  card_info_opened: boolean;
  selected_card: number | null;
}>({
  cards: null,
  card_info_opened: false,
  selected_card: null,
});

const getActionsOf = (index: number) => {
  const actions = [];
  for (let i = 1; i <= 4; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const action = state.cards![index][`action_${i as 1 | 2 | 3 | 4}`];
    actions.push(action);
  }

  return actions;
};

const closeCardInfo = () => (state.card_info_opened = false);
const openCardInfo = (index: number) => {
  state.selected_card = index;
  state.card_info_opened = true;
};

const getCards = async () => {
  const { data, error } = await supabase
    .from("character_info")
    .select(`*, action_1(*), action_2(*), action_3(*), action_4(*)`);

  if (error) {
    alert("An error happenned when fetching the cards.");
    router.push("/");
    return;
  }

  state.cards = data;
};

onBeforeMount(() => getCards());
</script>
