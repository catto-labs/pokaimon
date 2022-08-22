<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="props.close" class="relative z-10">
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
              v-if="props.data"
              class="w-full max-w-xl transform overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex justify-between">
                <div class="space-y-2">
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-lg font-bold leading-6"
                  >
                    {{ props.data.title }}
                  </DialogTitle>
                  <DialogDescription
                    v-if="props.data.description"
                    class="text-gray-500 mt-2 text-sm"
                  >
                    {{ props.data.description }}
                  </DialogDescription>
                </div>

                <button
                  class="mb-auto h-fit rounded-md bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                  @click="props.close"
                >
                  <IconClose />
                </button>
              </div>

              <div class="mt-12 flex flex-col justify-end gap-6 sm:flex-row">
                <div class="flex flex-col justify-end gap-2 md:flex-row">
                  <button
                    class="w-full rounded-md bg-brand-second px-6 py-1 transition-colors hover:bg-opacity-80 sm:w-auto"
                    @click="createFightIn(props.data!.region, 'no')"
                  >
                    Matchmaking
                  </button>
                  <button
                    class="w-full rounded-md bg-brand-main px-6 py-1 transition-colors hover:bg-opacity-80 sm:w-auto"
                    @click="createFightIn(props.data!.region, 'yes')"
                  >
                    Play against a bot
                  </button>
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
import type { AvailableRegions } from "@/types/Database";
import type { FightMarkerOptions } from "@/types/Marker";

import { useRouter } from "vue-router";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

import IconClose from "virtual:icons/mdi/close";

const router = useRouter();
const props = defineProps<{
  open: boolean;
  close: () => unknown;

  data: FightMarkerOptions | null;
}>();

/**
 * Creates a new game with a bot.
 * @param region The bot will use this info to build his deck. Defaults to `mondstadt`.
 */
const createFightIn = (
  region: AvailableRegions = "mondstadt",
  offline: "yes" | "no"
) => {
  if (offline === "yes") {
    router.push({ name: "new-game", params: { region, offline } });
  } else if (offline === "no") {
    router.push("/game/join-game");
  }
};
</script>
