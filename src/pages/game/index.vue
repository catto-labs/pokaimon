<template>
  <div class="relative z-10 p-8">
    <div class="flex justify-between">
      <div class="flex items-center gap-8 text-white">
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
              class="absolute mt-2 mr-auto w-56 origin-top-right divide-y divide-grey-100 rounded-md bg-grey-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="copyToClipboard(state.username as string)"
                    :class="[
                      active ? 'bg-grey-600 text-white' : 'text-white',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Copy to clipboard
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-grey-600 text-white' : 'text-white',
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

  <div class="fixed top-0 left-0 h-screen w-screen" ref="map_element_ref"></div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import IconSettings from "virtual:icons/mdi/settings";
import IconPerson from "virtual:icons/mdi/person";
import IconBackpack from "virtual:icons/mdi/backpack";
import IconSwordCross from "virtual:icons/mdi/sword-cross";
import IconUser from "virtual:icons/mdi/user";

import { reactive, onBeforeMount, onMounted, ref, onBeforeUnmount } from "vue";

import { useRouter } from "vue-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

import { supabase, storedMapsUrl } from "@/utils/supabase";
import { copyToClipboard } from "@/utils/globals";

import { Map, Marker, TileLayer, LatLngBounds, LatLng } from "leaflet";

const map_element_ref = ref<HTMLElement | null>(null);
const map_ref = ref<Map | null>(null);

// this is just for testing purposes, they shouldn't be hard-coded.
const primo = 13525;

const router = useRouter();
const state = reactive<{
  traveller: "lumine" | "aether" | null;
  username: string | null;
}>({
  traveller: null,
  username: null,
});

onBeforeMount(() => {
  if (supabase.auth.session() === null) router.push("/login");
});

onMounted(async () => {
  if (supabase.auth.session() === null) return;

  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: supabase.auth.session()?.user?.id });

  if (error) alert(error.message);

  if (data !== null) {
    if (data[0].username === null) state.username = "Traveller";
    else state.username = data[0].username;
  } else {
    state.username = "Traveller";
  }

  const southWest = new LatLng(-85, -180);
  const northEast = new LatLng(40, 45);
  const bounds = new LatLngBounds(southWest, northEast);

  if (!map_element_ref.value) return;
  const map = new Map(map_element_ref.value, {
    center: bounds.getCenter(),
    zoom: 3,

    maxBounds: bounds,
    maxBoundsViscosity: 1,
    minZoom: 3,

    zoomControl: false,
    attributionControl: false,
  });

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
  map.fitBounds(bounds);

  // When the map is ready, store the map reference for access later.
  map.whenReady(() => (map_ref.value = map));

  const myMarker = new Marker(bounds.getCenter(), {
    title: "Coordinates",
    alt: "Coordinates",
    draggable: true,
  })
    .addTo(map)
    .on("dragend", () => {
      const lat = myMarker.getLatLng().lat.toFixed(8);
      const lon = myMarker.getLatLng().lng.toFixed(8);
      myMarker
        .bindPopup("Latitude: " + lat + "<br />Longitude: " + lon)
        .openPopup();
    });
});

onBeforeUnmount(() => {
  if (map_ref.value) map_ref.value.remove();
  if (map_element_ref.value) map_element_ref.value.remove();
});
</script>
