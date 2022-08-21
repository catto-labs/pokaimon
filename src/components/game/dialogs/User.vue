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
              class="flex w-full flex-col gap-6 md:max-w-3xl md:flex-row"
            >
              <div class="flex w-full flex-col gap-4" v-if="state.loaded">
                <div
                  class="relative flex w-full justify-center rounded-2xl border border-grey-700 bg-grey-800 p-4 shadow-xl transition-all"
                >
                  <button
                    class="absolute top-2 right-2 h-fit rounded-lg bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                    @click="props.close"
                  >
                    <IconClose />
                  </button>

                  <div
                    class="flex flex-col items-center justify-center gap-4 p-4 text-center"
                  >
                    <img
                      v-if="state.traveller === 'aether'"
                      src="@/assets/game/traveller/aether.png"
                      class="aspect-square h-auto w-40 rounded-full border-2 border-grey-600 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
                    />
                    <img
                      v-if="state.traveller === 'lumine'"
                      src="@/assets/game/traveller/lumine.png"
                      class="aspect-square h-auto w-40 rounded-full border-2 border-grey-600 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500"
                    />
                    <div class="my-4">
                      <h2 class="text-2xl font-bold">{{ state.username }}</h2>
                      <h3 class="text-lg">
                        Joined at {{ joinTime.toLocaleDateString("en-GB") }}
                      </h3>
                      <p>{{ state.xp.toLocaleString("en-GB") }} XP</p>
                    </div>
                    <div class="mt-auto mb-4 flex gap-4">
                      <IconConstruction
                        v-if="state.is_developer"
                        class="mt-auto text-xl"
                        v-tippy="{ content: 'Pokaimon Developer' }"
                      />
                      <IconGestureTap
                        v-if="state.is_ui_designer"
                        class="mt-auto mb-[0.1rem] text-xl"
                        v-tippy="{ content: 'Pokaimon User Interface' }"
                      />
                      <IconChartBar
                        v-if="state.is_character_designer"
                        class="mt-auto text-xl"
                        v-tippy="{ content: 'Pokaimon Characters' }"
                      />
                      <IconBrush
                        v-if="state.is_artwork_designer"
                        class="mt-auto text-xl"
                        v-tippy="{ content: 'Pokaimon Artwork' }"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="flex w-full flex-col justify-between rounded-2xl border border-grey-700 bg-grey-800 p-6 shadow-xl transition-all"
                >
                  <div class="mt-auto">
                    <h2 class="mb-4 text-2xl font-bold">Equipped Card</h2>
                    <div class="flex gap-4">
                      <div
                        class="flex w-32 flex-col justify-end rounded-md bg-grey-700"
                      >
                        <img
                          :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${state.selected_character.base_character.name.toLowerCase()}.png`"
                          class="h-fit"
                        />
                      </div>
                      <div class="flex flex-col gap-1 text-left">
                        <h3 class="text-xl font-semibold">
                          {{ state.selected_character.base_character.name }}
                        </h3>
                        <p>
                          Experience:
                          {{
                            state.selected_character.xp.toLocaleString("en-GB")
                          }}
                          XP
                        </p>
                        <p>
                          Health:
                          {{
                            state.selected_character.health.toLocaleString(
                              "en-GB"
                            )
                          }}
                          HP
                        </p>
                        <p>
                          Element:
                          {{ state.selected_character.base_character.element }}
                        </p>
                        <p>
                          Region:
                          {{
                            capitalizeFirstLetter(
                              state.selected_character.base_character.region
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="state.loaded"
                class="flex h-full w-full flex-grow flex-col gap-2 overflow-y-auto rounded-2xl border border-grey-700 bg-grey-800 py-2"
              >
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
                      <template v-else-if="game.winner === 3"> Tie! </template>
                      <template v-else> Entered a fight </template>
                    </h4>

                    <span>against a bot</span>
                  </template>

                  <template v-else-if="game.player2 && game.player1">
                    <h4>
                      <template
                        v-if="game.player1.id === state.id && game.winner === 1"
                      >
                        Won the fight
                      </template>
                      <template
                        v-else-if="
                          game.player1.id !== state.id && game.winner === 1
                        "
                      >
                        Lost the fight
                      </template>
                      <template v-else-if="game.winner === 3"> Tie! </template>
                      <template v-else> Entered a fight </template>
                    </h4>

                    <span
                      >against
                      {{
                        game.player1.id === state.id
                          ? game.player2.username
                          : game.player1.usename
                      }}</span
                    >
                  </template>
                </div>
              </div>
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
} from "@/types/Database";

import IconConstruction from "virtual:icons/mdi/construction";
import IconGestureTap from "virtual:icons/mdi/gesture-tap";
import IconChartBar from "virtual:icons/mdi/chart-bar";
import IconBrush from "virtual:icons/mdi/brush";
import IconClose from "virtual:icons/mdi/close";

import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase, getFullUser } from "@/utils/supabase";

import { store } from "@/utils/store";
import { capitalizeFirstLetter } from "@/utils/globals";

const props = defineProps<{
  open: boolean;
  close: () => unknown;
}>();

const router = useRouter();

// this isnt supposed to be permanent if it wasnt obvious
const joinTime = new Date();

const state = reactive<
  | {
      loaded: true;
      traveller: "lumine" | "aether" | null;
      id: string;
      username: string | null;
      xp: number;
      primos: number;
      selected_character: Omit<CharacterInventoryTable, "base_character"> & {
        base_character: CharacterInfoTable;
      };
      is_developer: boolean;
      is_ui_designer: boolean;
      is_character_designer: boolean;
      is_artwork_designer: boolean;

      games_played: GamesTable[];
    }
  | { loaded: false }
>({
  loaded: false,
});

onMounted(async () => {
  const user_id = store.authSession?.user?.id;
  if (!user_id) {
    router.push("/game");
    return;
  }

  const { data: user_data, error: user_error } = await getFullUser(user_id);

  if (user_error || !user_data) {
    alert("Something went wrong getting your user info, refreshing...");
    window.location.reload();
    return;
  }

  const { data: games_data, error: games_error } = await supabase
    .from("games")
    .select()
    .or(`player1.eq.${user_data.id},player2.eq.${user_data.id}`)
    .select(`*, player1(*), player2(*)`);

  if (games_error || !games_data) {
    alert("Something went wrong getting your user info, refreshing...");
    window.location.reload();
    return;
  }

  Object.assign(state, {
    loaded: true,
    id: user_data.id,
    traveller: user_data.starter_traveller,
    username: user_data.username,
    xp: user_data.xp,
    primos: user_data.primos,
    selected_character: user_data.selected_character,
    is_developer: user_data.is_developer,
    is_ui_designer: user_data.is_ui_designer,
    is_character_designer: user_data.is_character_designer,
    is_artwork_designer: user_data.is_artwork_designer,

    games_played: games_data,
  });
});
</script>
