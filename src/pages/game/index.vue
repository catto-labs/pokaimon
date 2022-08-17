<template>
  <div class="relative z-10 p-4">
    <div class="flex justify-between">
      <div
        class="my-auto flex cursor-default items-center gap-8 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
      >
        <IconPerson
          @click="router.push('/game/user')"
          class="my-auto cursor-pointer text-2xl hover:text-brand-main"
        />
        <IconBackpack
          @click="router.push('/game/inventory')"
          class="my-auto cursor-pointer text-2xl hover:text-brand-main"
        />
        <IconSwordCross
          @click="router.push('/game/new-game')"
          class="my-auto cursor-pointer text-2xl hover:text-brand-main"
        />
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
                      'group flex w-full flex-row items-center gap-4 rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <IconContentCopy />
                    <span>Copy to clipboard</span>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="$router.push('/logout')"
                    :class="[
                      active
                        ? 'bg-brand-main bg-opacity-60 text-white'
                        : 'text-white',
                      'group flex w-full flex-row items-center gap-4 rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <IconLogout />
                    <span>Logout of Pokaimon</span>
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

import IconContentCopy from "virtual:icons/mdi/content-copy";
import IconSwordCross from "virtual:icons/mdi/sword-cross";
import IconSettings from "virtual:icons/mdi/settings";
import IconBackpack from "virtual:icons/mdi/backpack";
import IconPerson from "virtual:icons/mdi/person";
import IconLogout from "virtual:icons/mdi/logout";
import IconUser from "virtual:icons/mdi/user";

import { reactive, onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

import { supabase, storedMapsUrl } from "@/utils/supabase";
import { copyToClipboard } from "@/utils/globals";
import { store } from "@/utils/store";

import {
  Map,
  Marker,
  TileLayer,
  LatLngBounds,
  LatLng,
  MarkerOptions,
} from "leaflet";

const router = useRouter();

const map_element_ref = ref<HTMLElement | null>(null);
const map_ref = ref<Map | null>(null);

// this is just for testing purposes, they shouldn't be hard-coded.
const primo = 13525;

const state = reactive<{
  username: string | null;
}>({
  username: null,
});

const MONDSTADT_LOCATION = new LatLng(5.96575367, -96.02050781);

/**
 * @example
 * ```typescript
 * const location = new LatLng(latitude, longitude);
 * createMarker(location, { title: "Random title here !", draggable: true });
 * ```
 */
const createMarker = (latlng: LatLng, options: MarkerOptions) => {
  if (!map_ref.value) return;
  const map = map_ref.value as Map;

  const marker = new Marker(latlng, options);
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

  const southWest = new LatLng(-85, -180);
  const northEast = new LatLng(40, 45);
  const bounds = new LatLngBounds(southWest, northEast);

  if (!map_element_ref.value) return;
  const map = new Map(map_element_ref.value, {
    center: MONDSTADT_LOCATION,
    zoom: 5,

    maxBounds: bounds,
    maxBoundsViscosity: 1,

    zoomControl: false,
    attributionControl: false,
  });

  map.setMinZoom(map.getBoundsZoom(bounds));

  const tile = new TileLayer(`${storedMapsUrl("teyvat")}/{z}/{x}/{y}.png`, {
    tms: true,
    noWrap: true,
    tileSize: 256,

    bounds,
    minZoom: 0,
    maxZoom: 6,

    attribution: "&copy; Pokaimon",
  });

  tile.addTo(map);

  // When the map is ready, store the map reference for access later.
  map.whenReady(() => (map_ref.value = map));
});

onBeforeUnmount(() => {
  if (map_ref.value) map_ref.value.remove();
  if (map_element_ref.value) map_element_ref.value.remove();
});
</script>
