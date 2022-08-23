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
              class="flex w-full flex-col gap-8 md:max-w-3xl md:flex-row"
            >
              <template v-if="state.loaded">
                <div class="flex w-full flex-col gap-4">
                  <div
                    class="relative flex w-full justify-center rounded-2xl border border-grey-700 bg-grey-800 p-8 shadow-xl transition-all"
                  >
                    <button
                      class="absolute top-2 right-2 h-fit rounded-lg bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                      @click="props.close"
                    >
                      <IconClose />
                    </button>

                    <div
                      class="flex flex-col items-center justify-center gap-4 text-center"
                    >
                      <img
                        v-if="state.user.starter_traveller === 'aether'"
                        src="@/assets/game/traveller/aether.png"
                        class="aspect-square h-auto w-40 rounded-full border-2 border-grey-600 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
                      />
                      <img
                        v-if="state.user.starter_traveller === 'lumine'"
                        src="@/assets/game/traveller/lumine.png"
                        class="aspect-square h-auto w-40 rounded-full border-2 border-grey-600 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
                      />
                      <div class="mt-4 mb-1">
                        <h2 class="text-2xl font-bold">
                          {{ state.user.username }}
                        </h2>
                        <h3 class="text-lg">
                          Joined at
                          {{
                            new Date(state.user.created_at).toLocaleDateString(
                              "en-GB"
                            )
                          }}
                        </h3>

                        <div
                          class="mt-4 flex flex-row items-end justify-between"
                        >
                          <p>
                            Level
                            {{
                              getUserLevelFromXp(state.user.xp).toLocaleString(
                                "en-GB"
                              )
                            }}
                          </p>
                          <p>
                            {{ state.user.xp.toLocaleString("en-GB") }}/{{
                              getNextLevelXp(state.user.xp).toLocaleString(
                                "en-GB"
                              )
                            }}
                          </p>
                        </div>
                        <div class="rounded-full bg-grey-600">
                          <div
                            class="rounded-full bg-brand-main p-2"
                            :style="{
                              width:
                                (
                                  (state.user.xp /
                                    getNextLevelXp(state.user.xp)) *
                                  100
                                ).toString() + '%',
                            }"
                          ></div>
                        </div>
                      </div>
                      <div class="flex gap-4">
                        <IconConstruction
                          v-if="state.user.is_developer"
                          class="mt-auto text-xl"
                          v-tippy="{ content: 'Pokaimon Developer' }"
                        />
                        <IconGestureTap
                          v-if="state.user.is_ui_designer"
                          class="mt-auto mb-[0.1rem] text-xl"
                          v-tippy="{ content: 'Pokaimon User Interface' }"
                        />
                        <IconChartBar
                          v-if="state.user.is_character_designer"
                          class="mt-auto text-xl"
                          v-tippy="{ content: 'Pokaimon Characters' }"
                        />
                        <IconBrush
                          v-if="state.user.is_artwork_designer"
                          class="mt-auto text-xl"
                          v-tippy="{ content: 'Pokaimon Artwork' }"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-full flex-col justify-between rounded-2xl border border-grey-700 bg-grey-800 p-8 shadow-xl transition-all"
                  >
                    <h2 class="mb-4 text-2xl font-bold">Equipped Card</h2>
                    <div class="flex gap-4">
                      <div
                        class="flex w-32 flex-col justify-end rounded-md bg-grey-700"
                      >
                        <img
                          :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${state.character.base_character.name.toLowerCase()}.png`"
                          class="h-fit"
                        />
                      </div>
                      <div class="flex flex-col gap-1 text-left">
                        <h3 class="text-xl font-semibold">
                          {{ state.character.base_character.name }}
                        </h3>
                        <p>
                          Experience:
                          {{ state.character.xp.toLocaleString("en-GB") }}
                          XP
                        </p>
                        <p>
                          Health:
                          {{ state.character.health.toLocaleString("en-GB") }}
                          HP
                        </p>
                        <p>
                          Element:
                          {{ state.character.base_character.element }}
                        </p>
                        <p>
                          Region:
                          {{
                            capitalizeFirstLetter(
                              state.character.base_character.region
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="state.loaded"
                  class="flex max-h-screen w-full flex-col gap-2 overflow-y-auto rounded-2xl border border-grey-700 bg-grey-800 p-8"
                >
                  <h2 class="mb-4 text-2xl font-bold">Fight History</h2>
                  <div
                    :key="game.id"
                    v-for="game in state.games_played"
                    class="w-full px-4 py-1"
                  >
                    <template v-if="!game.player2">
                      <h4>
                        <template v-if="game.winner === 1">
                          Won the fight
                        </template>
                        <template v-else-if="game.winner === 2">
                          Lost the fight
                        </template>
                        <template v-else-if="game.winner === 3">
                          Tie!
                        </template>
                        <template v-else> Entered a fight </template>
                      </h4>

                      <span>against a bot</span>
                    </template>

                    <template
                      v-else-if="
                        typeof game.player2 !== 'number' &&
                        typeof game.player1 !== 'number'
                      "
                    >
                      <h4>
                        <template
                          v-if="
                            game.player1.id === state.user.id &&
                            game.winner === 1
                          "
                        >
                          Won the fight
                        </template>
                        <template
                          v-else-if="
                            game.player1.id !== state.user.id &&
                            game.winner === 1
                          "
                        >
                          Lost the fight
                        </template>
                        <template v-else-if="game.winner === 3">
                          Tie!
                        </template>
                        <template v-else> Entered a fight </template>
                      </h4>

                      <span
                        >against
                        {{
                          game.player1.id === state.user.id
                            ? game.player2.username
                            : game.player1.username
                        }}</span
                      >
                    </template>
                  </div>
                  <div v-if="state.games_played.length <= 0">
                    <p>
                      So empty here! Try coming back after you played some
                      fights!
                    </p>
                  </div>
                </div>
              </template>
              <template v-else>
                <LoadingPrimogems class="w-full" />
              </template>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

import type {
  CharacterInventoryTable,
  CharacterInfoTable,
  GamesTable,
  UsersTable,
} from "@/types/Database";

import IconConstruction from "virtual:icons/mdi/construction";
import IconGestureTap from "virtual:icons/mdi/gesture-tap";
import IconChartBar from "virtual:icons/mdi/chart-bar";
import IconBrush from "virtual:icons/mdi/brush";
import IconClose from "virtual:icons/mdi/close";

import LoadingPrimogems from "../LoadingPrimogems.vue";
import { reactive, onMounted, onUpdated } from "vue";

import { supabase, getFullUser } from "@/utils/supabase";

import { store } from "@/utils/store";
import {
  capitalizeFirstLetter,
  getUserLevelFromXp,
  getNextLevelXp,
} from "@/utils/globals";

const props = defineProps<{
  open: boolean;
  close: () => unknown;

  username: string | null;
}>();

const state = reactive<
  | {
      loaded: true;
      user: UsersTable;
      character: Omit<CharacterInventoryTable, "base_character"> & {
        base_character: CharacterInfoTable;
      };
      games_played: (Omit<GamesTable, "player1" | "player2"> & {
        player1: UsersTable | number;
        player2: UsersTable | number;
      })[];
    }
  | { loaded: false }
>({
  loaded: false,
});

const getData = async () => {
  state.loaded = false;
  if (!store.initialized) return;

  let user_final_data, user_final_character;

  // When the user requested is not the ID from the store,
  // get the all the user stuff.
  if (props.username) {
    const { data: user_data, error: user_error } = await getFullUser(
      props.username || store.user_data.id,
      props.username !== null
    );

    if (user_error || !user_data) {
      alert("Something went wrong getting the user info, refreshing...");
      window.location.reload();
      return;
    }

    user_final_data = user_data;
    user_final_character = user_data.selected_character;
  } else {
    const { data: user_character, error: user_character_error } = await supabase
      .from("character_inventory")
      .select(`*, base_character(*)`)
      .match({ id: store.user_data.selected_character })
      .single();

    if (user_character_error || !user_character) {
      alert("Something went wrong getting the user's character, refreshing...");
      window.location.reload();
      return;
    }

    user_final_data = store.user_data;
    user_final_character = user_character;
  }

  const { data: games_data, error: games_error } = await supabase
    .from("games")
    .select()
    .or(`player1.eq.${user_final_data.id},player2.eq.${user_final_data.id}`)
    .select(`*, player1(*), player2(*)`);

  if (games_error || !games_data) {
    alert("Something went wrong getting your user info, refreshing...");
    window.location.reload();
    return;
  }

  Object.assign(state, {
    loaded: true,
    user: user_final_data,
    character: user_final_character,
    games_played: games_data,
  });
};

onMounted(() => getData());
onUpdated(() => getData());
</script>
