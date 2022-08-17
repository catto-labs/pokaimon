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
                    @click="copyToClipboard(state.username as string)"
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
            primo.toLocaleString("en-GB")
          }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 h-screen w-screen"
    style="background-color: #040e10"
    ref="map_element_ref"
  ></div>

  <TransitionRoot appear :show="state.openedDialogData !== null" as="template">
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
              <DialogTitle
                as="h3"
                class="text-gray-900 text-lg font-bold leading-6"
              >
                {{ state.openedDialogData?.title }}
              </DialogTitle>
              <DialogDescription class="text-gray-500 mt-2 text-sm">
                {{ state.openedDialogData?.description }}
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
                  @click="joinFight(state.openedDialogData?.id as string)"
                >
                  Join
                </button>
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

import { Map, Marker, TileLayer, LatLngBounds, LatLng } from "leaflet";

const map_element_ref = ref<HTMLElement | null>(null);
const map_ref = ref<Map | null>(null);

// this is just for testing purposes, they shouldn't be hard-coded.
const primo = 13525;

const state = reactive<{
  username: string | null;
  openedDialogData: MarkerOptions | null;
}>({
  username: null,
  openedDialogData: null,
});

/** Short-hand to close the dialog. */
const closeDialog = () => {
  state.openedDialogData = null;
};

const joinFight = (id: string) => {
  // TODO: join fight
  console.info("joining...", id);
};

// const MONDSTADT_LOCATION = new LatLng(5.96575367, -96.02050781);

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
    console.log("clicked", options.id);
    state.openedDialogData = options;
  });

  marker.addTo(map);
};

onMounted(async () => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: store.authSession?.user?.id })
    .select();

  if (error) alert(error.message);

  if (data) {
    state.username = data[0].username;
  } else {
    state.username = "traveller#123";
  }

  const mapWidth = 32768; // Total width of original map.
  const mapHeight = mapWidth; // Total height of original map.
  const extraBounds = mapWidth - 18609;

  const southWest = new LatLng(extraBounds * 0.35, 0 - extraBounds);
  const northEast = new LatLng(
    -66.52 - extraBounds * 0.08,
    90.02 + extraBounds
  );

  const bounds = new LatLngBounds(southWest, northEast);

  if (!map_element_ref.value) return;
  const map = new Map(map_element_ref.value, {
    center: [-78, 83],
    zoom: 4,

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

  const TileExtendedLayer = TileLayer.extend({
    getTileUrl: (coords: { x: number; y: number; z: number }) => {
      const powZoom = Math.pow(2, coords.z - 1); // 2 ^ (current zoom level - 1)
      const deltaX = coords.x - powZoom;
      const deltaY = coords.y - powZoom;

      const powDeltaZoom = Math.pow(2, map.getMaxZoom() - coords.z); // 2 ^ (8 - current zoom level)
      const rowCount = mapWidth / 256; // 96 = size of a tile
      const columnCount = mapHeight / 256; // 96 = size of a tile
      const limitWidth = rowCount / powDeltaZoom - 1; // - 1 because file count start from 0
      const limitHeight = columnCount / powDeltaZoom - 1; // - 1 because file count start from 0

      if (
        deltaX < 0 ||
        deltaX > limitWidth ||
        deltaY < 0 ||
        deltaY > limitHeight
      ) {
        // Load an empty tile if the tile is out of bounds.
        return storedMapsUrl("error.png");
      }

      return `${storedMapsUrl("teyvat")}/${coords.z}/${deltaX}/${deltaY}.png`;
    },
  });

  map.addLayer(new TileExtendedLayer());

  map.on("drag", () => {
    // Disable boucing effect animation when dragging out of the map
    map.panInsideBounds(bounds, {
      animate: false,
    });
  });

  // const tile = new TileLayer(`${storedMapsUrl("teyvat")}/{z}/{x}/{y}.png`, {
  //   tms: true,
  //   noWrap: true,
  //   tileSize: 256,

  //   bounds,
  //   minZoom: 0,
  //   maxZoom: 6,

  //   attribution: "&copy; Pokaimon",
  // });

  // tile.addTo(map);

  // When the map is ready, store the map reference for access later.
  map.whenReady(() => (map_ref.value = map));

  // TODO: remove this when we have a proper API.
  createMarker({
    latitude: -78,
    longitude: 83,
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
