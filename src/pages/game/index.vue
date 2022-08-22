<template>
  <template v-if="store.initialized && user">
    <div class="absolute flex h-screen w-screen flex-col p-4 md:justify-end">
      <div class="flex flex-row">
        <div class="flex w-full flex-col gap-4">
          <TransitionRoot
            :show="copyToast"
            as="template"
            leave="transform duration-200 transition ease-in-out"
            leave-from="opacity-100 rotate-0 scale-100 "
            leave-to="opacity-0 scale-95 "
          >
            <div
              class="z-50 w-full rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 p-2 backdrop-blur-md md:w-96"
            >
              <div class="flex gap-2">
                <IconContentCopy />
                <h1 class="font-bold">Copied to clipboard</h1>
              </div>
              <span class="text-body"
                >Your username was copied to the clipboard!</span
              >
            </div>
          </TransitionRoot>
          <TransitionRoot
            :show="loginToast"
            as="template"
            leave="transform duration-200 transition ease-in-out"
            leave-from="opacity-100 rotate-0 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="z-50 w-full rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 p-2 backdrop-blur-md md:w-96"
            >
              <div class="flex gap-2">
                <IconHandWave />
                <h1 class="font-bold">Welcome back!</h1>
              </div>
              <span class="text-body">Logged in as {{ user.username }}. </span>
            </div>
          </TransitionRoot>
        </div>
      </div>
    </div>

    <div class="relative z-20 p-4">
      <div class="flex flex-col justify-between gap-2 md:flex-row">
        <div
          class="fixed bottom-12 right-0 left-0 mx-auto flex w-max cursor-default items-center justify-start gap-8 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md md:relative md:left-auto md:right-auto md:bottom-auto md:ml-0"
        >
          <IconPerson
            v-tippy="{ content: 'Profile' }"
            @click="
              () => {
                state.userDialogOpen = true;
                state.userDialogUsername = null;
              }
            "
            class="my-auto cursor-pointer text-2xl hover:text-brand-main"
          />
          <IconBackpack
            v-tippy="{ content: 'Inventory' }"
            @click="state.inventoryDialogOpen = true"
            class="my-auto cursor-pointer text-2xl hover:text-brand-main"
          />
          <IconSwordCross
            v-tippy="{ content: 'Game against bot' }"
            @click="router.push('/game/new-game')"
            class="my-auto cursor-pointer text-2xl hover:text-brand-main"
          />
          <IconStore
            v-tippy="{ content: 'Shop' }"
            @click="state.shoppingDialogOpen = true"
            class="my-auto cursor-pointer text-2xl hover:text-brand-main"
          />
        </div>
        <div class="flex items-center justify-between gap-4 md:justify-end">
          <div
            class="my-auto flex cursor-default space-x-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
          >
            <img src="@/assets/game/primogem.svg" class="my-auto h-4" />
            <span class="my-auto text-white">{{
              user.primos.toLocaleString("en-GB")
            }}</span>
          </div>
          <Menu as="div">
            <div>
              <MenuButton
                class="my-auto flex items-center gap-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md transition duration-300 hover:bg-grey-700"
              >
                <IconUser class="my-auto" />
                <span class="my-auto text-white">{{ user.username }}</span>
                <IconMenuDown />
              </MenuButton>
            </div>

            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 mt-2 mr-4 origin-top-right divide-y divide-grey-100 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md focus:outline-none"
              >
                <div class="px-2 py-2">
                  <MenuItem>
                    <div class="flex border-b border-b-grey-400 pb-2">
                      <span
                        class="mx-2 cursor-default text-left text-sm text-grey-300"
                        >You currently have
                        {{ user.xp.toLocaleString("en-GB") }}
                        experience!</span
                      >
                      <img
                        v-if="
                          user.xp === 69 ||
                          user.xp === 420 ||
                          user.xp === 727 ||
                          user.xp === 69420 ||
                          user.xp === 42069
                        "
                        src="@/assets/misc/nice.svg"
                        class="mt-auto mb-1 hidden h-2 text-right text-grey-400 brightness-75 md:inline-block"
                      />
                    </div>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="copyToClipboard(user!.username)"
                      :class="[
                        active
                          ? 'bg-brand-main bg-opacity-60 text-white'
                          : 'text-white',
                        'group mt-2 flex w-full flex-row items-center gap-2 rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <IconContentCopy />
                      <span class="text-left text-white"
                        >Copy to clipboard</span
                      >
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="$router.push('/logout')"
                      :class="[
                        active
                          ? 'bg-brand-main bg-opacity-60 text-white'
                          : 'text-white',
                        'group flex w-full flex-row items-center gap-2 rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      <IconLogout />
                      <span class="text-left text-white"
                        >Logout of Pokaimon</span
                      >
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 flex w-screen flex-col justify-end p-4">
      <div class="flex items-center justify-between gap-4 md:justify-end">
        <div
          class="my-auto flex cursor-default space-x-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
        >
          <img src="@/assets/game/primogem.svg" class="my-auto h-4" />
          <span class="my-auto text-white">{{
            user.primos.toLocaleString("en-GB")
          }}</span>
        </div>
        <Menu as="div">
          <div>
            <MenuButton
              class="my-auto flex items-center gap-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md transition duration-300 hover:bg-grey-700"
            >
              <IconUser class="my-auto" />
              <span class="my-auto text-white">{{ user.username }}</span>
              <IconMenuDown />
            </MenuButton>
          </div>

          <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 mr-4 origin-top-right divide-y divide-grey-100 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md focus:outline-none"
            >
              <div class="px-2 py-2">
                <MenuItem>
                  <div class="flex border-b border-b-grey-400 pb-2">
                    <span
                      class="mx-2 cursor-default text-left text-sm text-grey-300"
                      >You currently have
                      {{ user.xp.toLocaleString("en-GB") }}
                      experience!</span
                    >
                    <img
                      v-if="
                        user.xp === 69 ||
                        user.xp === 420 ||
                        user.xp === 727 ||
                        user.xp === 69420 ||
                        user.xp === 42069
                      "
                      src="@/assets/misc/nice.svg"
                      class="mt-auto mb-1 hidden h-2 text-right text-grey-400 brightness-75 md:inline-block"
                    />
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="copyToClipboard(user!.username)"
                    :class="[
                      active
                        ? 'bg-brand-main bg-opacity-60 text-white'
                        : 'text-white',
                      'group mt-2 flex w-full flex-row items-center gap-2 rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <IconContentCopy />
                    <span class="text-left text-white">Copy to clipboard</span>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="$router.push('/logout')"
                    :class="[
                      active
                        ? 'bg-brand-main bg-opacity-60 text-white'
                        : 'text-white',
                      'group flex w-full flex-row items-center gap-2 rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <IconLogout />
                    <span class="text-left text-white">Logout of Pokaimon</span>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>

    <div
      class="fixed top-0 left-0 h-screen w-screen"
      style="background-color: #1c293c"
      ref="map_element_ref"
    ></div>

    <FightDialog
      :data="state.fightDialogData"
      :open="state.fightDialogOpen"
      :close="closeFightDialog"
    />

    <ShoppingDialog
      :open="state.shoppingDialogOpen"
      :closeShopDialog="closeShoppingDialog"
    />
    <UserDialog
      :username="state.userDialogUsername"
      :open="state.userDialogOpen"
      :close="closeUserDialog"
    />
    <InventoryDialog
      :open="state.inventoryDialogOpen"
      :close="closeInventoryDialog"
    />
  </template>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";

import IconContentCopy from "virtual:icons/mdi/content-copy";
import IconSwordCross from "virtual:icons/mdi/sword-cross";
import IconMenuDown from "virtual:icons/mdi/menu-down";
import IconHandWave from "virtual:icons/mdi/hand-wave";
import IconBackpack from "virtual:icons/mdi/backpack";
import IconPerson from "virtual:icons/mdi/person";
import IconLogout from "virtual:icons/mdi/logout";
import IconStore from "virtual:icons/mdi/store";
import IconUser from "virtual:icons/mdi/user";
// import IconSearch from "virtual:icons/mdi/search";

import type { RealtimeChannel } from "@supabase/realtime-js";
import type { FightMarkerOptions } from "@/types/Marker";

import { reactive, onMounted, ref, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import throttle from "lodash.throttle";

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
} from "@headlessui/vue";

import UserDialog from "@/components/game/dialogs/User.vue";
import FightDialog from "@/components/game/dialogs/Fight.vue";
import ShoppingDialog from "@/components/game/dialogs/Shopping.vue";
import InventoryDialog from "@/components/game/dialogs/Inventory.vue";

// import CommandPalette from "@/components/game/CommandPalette.vue";

import { supabase, storedMapsUrl } from "@/utils/supabase";
import { copyToClipboard as clipboard_copy } from "@/utils/globals";
import { store } from "@/utils/store";
import {
  DEFAULT_FIGHT_MARKERS,
  MONDSTADT_LOCATION,
  createFightMarker,
  createUserMarker,
} from "@/utils/markers";

import { Map, Marker, TileLayer, LatLngBounds, LatLng, CRS } from "leaflet";

interface MousePositionPayload {
  type: string;
  event: string;
  payload: {
    username: string;
    lat: number;
    lng: number;
  };
  key?: string;
}

// Refs to HTML elements.
const map_element_ref = ref<HTMLElement | null>(null);
const map_ref = ref<Map | null>(null);

// Computed values.
const user = computed(() => (store.initialized ? store.user_data : null));

const router = useRouter();
const state = reactive<{
  connected_users_channel: RealtimeChannel | null;
  connected_users: {
    [username: string]: Marker | undefined;
  };

  fightDialogOpen: boolean;
  fightDialogData: FightMarkerOptions | null;

  shoppingDialogOpen: boolean;
  userDialogOpen: boolean;
  userDialogUsername: string | null;
  // commandPaletteOpen: boolean;
  inventoryDialogOpen: boolean;
}>({
  connected_users_channel: null,
  connected_users: {},

  fightDialogOpen: false,
  fightDialogData: null,

  shoppingDialogOpen: false,
  userDialogOpen: false,
  userDialogUsername: null,
  // commandPaletteOpen: false,
  inventoryDialogOpen: false,
});

const copyToClipboard = (text?: string | null) => {
  if (!text) return;

  clipboard_copy(text);
  resetCopyToast();
};

/**
 * Throttle the send mouse event to every 100ms
 * to not flood the realtime websocket.
 */
const sendMouseBroadcast = throttle(({ lat, lng }) => {
  if (!state.connected_users_channel || !store.initialized) return;

  state.connected_users_channel.send({
    type: "broadcast",
    event: "location",
    payload: { username: store.user_data.username, lat, lng },
  });
}, 100);

/** Short-hands to close dialogs. */
const closeFightDialog = () => (state.fightDialogOpen = false);
const closeShoppingDialog = () => (state.shoppingDialogOpen = false);
// const closeCommandPalette = () => (state.commandPaletteOpen = false);
const closeInventoryDialog = () => (state.inventoryDialogOpen = false);
const closeUserDialog = () => {
  state.userDialogUsername = null;
  state.userDialogOpen = false;
};

const copyToast = ref(false);
const loginToast = ref(false);

const resetCopyToast = () => {
  copyToast.value = true;

  setTimeout(() => {
    copyToast.value = false;
  }, 3000);
};

const resetLoginToast = () => {
  loginToast.value = true;

  setTimeout(() => {
    loginToast.value = false;
  }, 3000);
};

onMounted(() => {
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
  // Add the default markers to the map.
  DEFAULT_FIGHT_MARKERS.forEach((marker) =>
    createFightMarker(map, marker, () => {
      state.fightDialogData = marker;
      state.fightDialogOpen = true;
    })
  );

  // Add the connected users to the map.
  state.connected_users_channel = supabase.channel("map_cursors", {
    configs: {
      broadcast: { ack: true },
    },
  });

  state.connected_users_channel
    .on(
      "broadcast",
      { event: "location" },
      (event_data: MousePositionPayload) => {
        const marker_obj = state.connected_users[event_data.payload.username];

        if (!marker_obj) {
          state.connected_users[event_data.payload.username] = createUserMarker(
            map,
            {
              title: event_data.payload.username,
              username: event_data.payload.username,

              latitude: event_data.payload.lat,
              longitude: event_data.payload.lng,
            },
            () => {
              state.userDialogUsername = event_data.payload.username;
              state.userDialogOpen = true;
            }
          );

          return;
        }

        marker_obj.setLatLng(
          new LatLng(event_data.payload.lat, event_data.payload.lng)
        );
      }
    )
    .subscribe(async (status: string) => {
      if (status === "SUBSCRIBED") {
        map.on("mousemove", ({ latlng }) => {
          if (!store.initialized || !latlng.lat || !latlng.lng) return;

          sendMouseBroadcast({
            username: store.user_data.username,
            lat: latlng.lat,
            lng: latlng.lng,
          });
        });
      }
    });

  resetLoginToast();

  /** TODO: reenable this when the palette is working
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "1":
        state.userDialogOpen = true;
        state.shoppingDialogOpen = false;
        state.commandPaletteOpen = false;
        state.dialogOpen = false;
        state.inventoryDialogOpen = false;
        break;
      case "2":
        state.shoppingDialogOpen = false;
        state.userDialogOpen = false;
        state.commandPaletteOpen = false;
        state.dialogOpen = false;
        state.inventoryDialogOpen = true;
        break;
      case "3":
        state.shoppingDialogOpen = false;
        state.userDialogOpen = false;
        state.commandPaletteOpen = false;
        state.inventoryDialogOpen = false;
        state.dialogOpen = false;
        router.push("/game/new-game");
        break;
      case "4":
        state.shoppingDialogOpen = true;
        state.userDialogOpen = false;
        state.commandPaletteOpen = false;
        state.inventoryDialogOpen = false;
        state.dialogOpen = false;
        break;
    }

    const platform = navigator.userAgentData?.platform || navigator.platform;

    if (
      e.key.toLowerCase() === "k" &&
      (platform.match(/mac/i) ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      state.shoppingDialogOpen = false;
      state.inventoryDialogOpen = false;
      state.userDialogOpen = false;
      state.commandPaletteOpen = true;
      state.dialogOpen = false;
    }
  });
  */
});

onBeforeUnmount(() => {
  if (state.connected_users_channel) {
    state.connected_users_channel.unsubscribe();
  }

  if (map_ref.value) map_ref.value.remove();
  if (map_element_ref.value) map_element_ref.value.remove();
});
</script>
