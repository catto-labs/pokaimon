<template>
  <div class="relative z-10 p-4">
    <div class="flex justify-between">
      <div
        class="my-auto flex cursor-default items-center gap-8 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
      >
        <IconSettings class="my-auto text-3xl" />
        <IconPerson class="my-auto text-3xl" />
        <IconBackpack class="my-auto text-3xl" />
        <IconSwordCross class="my-auto text-3xl" />
      </div>
      <div class="flex items-center gap-4">
        <Menu as="div">
          <div>
            <MenuButton
              v-tippy="{ content: 'Click to see more options!' }"
              class="my-auto flex gap-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md transition duration-300 hover:bg-grey-700"
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
              class="absolute mt-2 mr-auto w-56 origin-top-right divide-y divide-grey-100 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md focus:outline-none"
            >
              <div class="px-2 py-2">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="copyToClipboard(state.username)"
                    :class="[
                      active
                        ? 'bg-brand-main bg-opacity-60 text-white'
                        : 'text-white',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Copy to clipboard
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="$router.push('/logout')"
                    :class="[
                      active
                        ? 'bg-brand-main bg-opacity-60 text-white'
                        : 'text-white',
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
            state.primos.toLocaleString("en-GB")
          }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 h-screen w-screen"
    style="background-color: #1c293c"
    ref="map_element_ref"
  ></div>

  <TransitionRoot appear :show="state.dialogOpen" as="template">
    <Dialog as="div" @close="closeDialog" class="relative z-10">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div v-if="state.openedDialogData !== null">
                <DialogTitle
                  as="h3"
                  class="text-gray-900 text-lg font-bold leading-6"
                >
                  {{ state.openedDialogData.title }}
                </DialogTitle>
                <DialogDescription
                  v-if="state.openedDialogData.description"
                  class="text-gray-500 mt-2 text-sm"
                >
                  {{ state.openedDialogData.description }}
                </DialogDescription>

                <div class="mt-6 flex justify-end gap-6">
                  <button
                    class="rounded-md bg-grey bg-opacity-20 px-6 py-1 transition-colors hover:bg-opacity-40"
                    @click="closeDialog()"
                  >
                    Close
                  </button>
                  <button
                    class="rounded-md bg-brand-main px-6 py-1 transition-colors hover:bg-opacity-80"
                    @click="joinFight(state.openedDialogData!.id)"
                  >
                    Join
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

<route>
{
  meta: {
    requiresAuth: true,
    checkForCompletedOnboarding: true
  }
}
</route>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import IconSettings from "virtual:icons/mdi/settings";
import IconPerson from "virtual:icons/mdi/person";
import IconBackpack from "virtual:icons/mdi/backpack";
import IconSwordCross from "virtual:icons/mdi/sword-cross";
import IconUser from "virtual:icons/mdi/user";

import type { MarkerOptions } from "@/types/Marker";

import { reactive, onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

import { supabase, storedMapsUrl } from "@/utils/supabase";
import { copyToClipboard } from "@/utils/globals";
import { store } from "@/utils/store";

import { Map, Marker, TileLayer, LatLngBounds, LatLng, CRS } from "leaflet";

const map_element_ref = ref<HTMLElement | null>(null);
const map_ref = ref<Map | null>(null);

const router = useRouter();

const state = reactive<{
  username: string;
  primos: number;

  dialogOpen: boolean;
  openedDialogData: MarkerOptions | null;
}>({
  username: "Loading...",
  primos: 0,

  dialogOpen: false,
  openedDialogData: null,
});

/** Short-hand to close the dialog. */
const closeDialog = () => (state.dialogOpen = false);

const joinFight = (id: string) => {
  // TODO: join fight
  console.info("joining...", id);
};

const MONDSTADT_LOCATION = new LatLng(-19.15562605857849, 41.16369414329529);

/**
 * @example
 * ```typescript
 * createMarker({
 *   latitude: 1,
 *   longitude: 1,
 *   title: "Random title here !",
 *   type: "fight",
 *   id: 12345678
 * });
 * ```
 */
const createMarker = (options: MarkerOptions) => {
  if (!map_ref.value) return;
  const map = map_ref.value as Map;

  const marker = new Marker(new LatLng(options.latitude, options.longitude), {
    title: options.title,
    alt: options.title,
  });

  // Open the marker's dialog on click.
  marker.on("click", () => {
    state.openedDialogData = options;
    state.dialogOpen = true;
  });

  marker.addTo(map);
};

onMounted(async () => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: store.authSession?.user?.id })
    .single();

  if (error || !data) {
    alert(error?.message || "Something went wrong, redirecting to homepage.");
    router.push("/");
    return;
  }

  state.username = data.username;
  state.primos = data.primos;

  const southWest = new LatLng(-128, 0);
  const northEast = new LatLng(0, 128);
  const bounds = new LatLngBounds(southWest, northEast);

  if (!map_element_ref.value) return;
  const map = new Map(map_element_ref.value, {
    center: MONDSTADT_LOCATION,
    zoom: 6,
    crs: CRS.Simple,

    zoomDelta: 1,
    zoomSnap: 1,
    maxZoom: 8,
    minZoom: 4,

    maxBounds: bounds,
    maxBoundsViscosity: 1,

    inertia: false,
    zoomControl: false,
    attributionControl: false,
  });

  const tile = new TileLayer(`${storedMapsUrl("teyvat")}/{z}/{x}/{y}.png`, {
    tms: true,
    noWrap: true,
    tileSize: 256,

    bounds,
    minZoom: 3,
    maxZoom: 8,

    attribution: "&copy; Pokaimon",
  });

  tile.addTo(map);

  // When the map is ready, store the map reference for access later.
  map.whenReady(() => (map_ref.value = map));

  // TODO: remove this when we have a proper API.
  createMarker({
    latitude: -19.15562605857849,
    longitude: 41.16369414329529,
    title: "This is some fight",
    description: "Hey, I am the cool description.",
    type: "fight",
    id: "12345678",
  });
});

onBeforeUnmount(() => {
  if (map_ref.value) map_ref.value.remove();
  if (map_element_ref.value) map_element_ref.value.remove();
});
</script>
