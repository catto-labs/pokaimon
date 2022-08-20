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
              class="flex w-full max-w-4xl transform justify-between overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-8 text-left align-middle shadow-xl transition-all"
            >
              <div>
                <div
                  v-if="state.loaded"
                  class="flex space-x-8 rounded-xl bg-black"
                >
                  <div
                    class="flex flex-col items-center justify-center space-y-4 rounded-xl border border-grey-700 bg-black p-4 text-center"
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
                    </div>
                    <div class="mt-auto mb-4 flex space-x-4">
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
                  <div class="flex flex-col justify-between">
                    <div>
                      <h2 class="text-2xl font-bold">Profile Statistics</h2>
                      <div class="mb-4">
                        <p>
                          Experience:
                          {{ state.xp.toLocaleString("en-GB") }}
                        </p>
                        <p>
                          Primogems: {{ state.primos.toLocaleString("en-GB") }}
                        </p>
                      </div>
                    </div>

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
                        <div class="flex flex-col gap-1">
                          <h3 class="text-xl font-semibold">
                            {{ state.selected_character.base_character.name }}
                          </h3>
                          <p>
                            Experience:
                            {{
                              state.selected_character.xp.toLocaleString(
                                "en-GB"
                              )
                            }}
                          </p>
                          <p>
                            Health:
                            {{
                              state.selected_character.health.toLocaleString(
                                "en-GB"
                              )
                            }}
                          </p>
                          <p>
                            Element:
                            {{
                              state.selected_character.base_character.element
                            }}
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
                <div v-else>Loading...</div>
              </div>
              <button
                class="mb-auto h-fit rounded-md bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                @click="props.closeShopDialog"
              >
                <IconClose />
              </button>
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
} from "@/types/Database";

import IconConstruction from "virtual:icons/mdi/construction";
import IconGestureTap from "virtual:icons/mdi/gesture-tap";
import IconChartBar from "virtual:icons/mdi/chart-bar";
import IconBrush from "virtual:icons/mdi/brush";
import IconClose from "virtual:icons/mdi/close";

import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import { getFullUser } from "@/utils/supabase";

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

  const { data, error } = await getFullUser(user_id);

  if (error || !data) {
    alert("Something went wrong getting your user info, going back to map...");
    router.push("/game");
    return;
  }

  Object.assign(state, {
    loaded: true,
    traveller: data.starter_traveller,
    username: data.username,
    xp: data.xp,
    primos: data.primos,
    selected_character: data.selected_character,
    is_developer: data.is_developer,
    is_ui_designer: data.is_ui_designer,
    is_character_designer: data.is_character_designer,
    is_artwork_designer: data.is_artwork_designer,
  });
});
</script>
