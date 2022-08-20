<template>
  <div class="absolute flex h-screen w-screen flex-col justify-end p-4">
    <div class="flex flex-row justify-end">
      <div class="flex flex-col gap-4">
        <TransitionRoot
          :show="copyToast"
          as="template"
          leave="transform duration-200 transition ease-in-out"
          leave-from="opacity-100 rotate-0 scale-100 "
          leave-to="opacity-0 scale-95 "
        >
          <div
            class="z-10 w-96 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 p-2 backdrop-blur-md"
          >
            <div class="flex gap-2">
              <IconContentCopy />
              <h1 class="font-bold">Copied to Clipboard</h1>
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
          leave-from="opacity-100 rotate-0 scale-100 "
          leave-to="opacity-0 scale-95 "
        >
          <div
            class="z-10 w-96 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 p-2 backdrop-blur-md"
          >
            <div class="flex gap-2">
              <IconHandWave />
              <h1 class="font-bold">Welcome back!</h1>
            </div>
            <span class="text-body">Logged in as {{ state.username }}. </span>
          </div>
        </TransitionRoot>
      </div>
    </div>
  </div>

  <div class="relative z-20 p-4">
    <div class="flex flex-col justify-between gap-2 md:flex-row">
      <div
        class="md:justfiy-start my-auto flex cursor-default items-center justify-center gap-8 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
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
      <div class="flex items-center justify-between gap-4 md:justify-end">
        <div
          class="my-auto flex cursor-default space-x-2 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 px-2 py-1 text-white backdrop-blur-md"
        >
          <img src="@/assets/game/primogem.svg" class="my-auto h-4" />
          <span class="my-auto text-white">{{
            state.primos.toLocaleString("en-GB")
          }}</span>
        </div>
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
              class="absolute mt-2 mr-auto origin-top-right divide-y divide-grey-100 rounded-md border border-grey-700 bg-grey-800 bg-opacity-60 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md focus:outline-none"
            >
              <div class="px-2 py-2">
                <MenuItem v-slot="{ active }">
                  <button
                    @click="
                      copyToClipboard(state.username);
                      resetCopyToast();
                    "
                    :class="[
                      active
                        ? 'bg-brand-main bg-opacity-60 text-white'
                        : 'text-white',
                      'group flex w-full flex-row items-center gap-2 rounded-md px-2 py-2 text-sm',
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
          </transition>
        </Menu>
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
              class="w-full max-w-xl transform overflow-hidden rounded-2xl border border-grey-700 bg-grey-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div v-if="state.openedDialogData !== null">
                <div class="flex justify-between">
                  <div class="space-y-2">
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
                  </div>

                  <button
                    class="mb-auto h-fit rounded-md bg-grey bg-opacity-20 p-2 transition-colors hover:bg-opacity-40"
                    @click="closeDialog()"
                  >
                    <IconClose />
                  </button>
                </div>

                <div class="mt-12 flex flex-col justify-end gap-6 sm:flex-row">
                  <div class="flex flex-col justify-end gap-2 md:flex-row">
                    <button
                      class="w-full rounded-md bg-brand-second px-6 py-1 transition-colors hover:bg-opacity-80 sm:w-auto"
                      @click="
                        createFightIn(state.openedDialogData!.region, 'no')
                      "
                    >
                      Matchmaking
                    </button>
                    <button
                      class="w-full rounded-md bg-brand-main px-6 py-1 transition-colors hover:bg-opacity-80 sm:w-auto"
                      @click="
                        createFightIn(state.openedDialogData!.region, 'yes')
                      "
                    >
                      Play against a bot
                    </button>
                  </div>
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

import IconContentCopy from "virtual:icons/mdi/content-copy";
import IconSwordCross from "virtual:icons/mdi/sword-cross";
import IconBackpack from "virtual:icons/mdi/backpack";
import IconPerson from "virtual:icons/mdi/person";
import IconLogout from "virtual:icons/mdi/logout";
import IconUser from "virtual:icons/mdi/user";
import IconClose from "virtual:icons/mdi/close";
import IconHandWave from "virtual:icons/mdi/hand-wave";

import RawIconSwordCross from "@/assets/icons/sword-cross.png";
import RawIconInformation from "@/assets/icons/information.png";

import type { RealtimeChannel } from "@supabase/realtime-js";
import type { MarkerOptions, FightMarkerOptions } from "@/types/Marker";

import { reactive, onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import throttle from "lodash.throttle";

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

import {
  Map,
  Marker,
  TileLayer,
  LatLngBounds,
  LatLng,
  CRS,
  Icon,
} from "leaflet";

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

const map_element_ref = ref<HTMLElement | null>(null);
const map_ref = ref<Map | null>(null);

const router = useRouter();

const state = reactive<{
  username: string;
  primos: number;

  connected_users_channel: RealtimeChannel | null;
  connected_users: {
    [username: string]: Marker;
  };

  dialogOpen: boolean;
  openedDialogData: MarkerOptions | null;
}>({
  username: "Loading...",
  primos: 0,

  connected_users_channel: null,
  connected_users: {},

  dialogOpen: false,
  openedDialogData: null,
});

const sendMouseBroadcast = throttle(({ lat, lng }) => {
  if (!state.connected_users_channel) return;
  if (state.username === "Loading...") return;

  state.connected_users_channel.send({
    type: "broadcast",
    event: "location",
    payload: { username: state.username, lat, lng },
  });
}, 1000 / 10);

/** Short-hand to close the dialog. */
const closeDialog = () => (state.dialogOpen = false);

/**
 * Creates a new game with a bot.
 * @param region The bot will use this info to build his deck. Defaults to `mondstadt`.
 */
const createFightIn = (
  region: FightMarkerOptions["region"] = "mondstadt",
  offline: "yes" | "no"
) => {
  if (offline === "yes") {
    router.push({ name: "new-game", params: { region, offline } });
  } else if (offline === "no") {
    router.push("/game/join-game");
  }
};

const MONDSTADT_LOCATION = new LatLng(-19.15562605857849, 41.16369414329529);
const LIYUE_LOCATION = new LatLng(-48.4375, 28.265625);
const INAZUMA_LOCATION = new LatLng(-77.15562605857849, 79.16369414329529);

const DEFAULT_FIGHT_MARKERS: FightMarkerOptions[] = [
  {
    type: "fight",

    region: "mondstadt",
    latitude: MONDSTADT_LOCATION.lat,
    longitude: MONDSTADT_LOCATION.lng,

    title: "Fight - Mondstadt",
    description: "Wanna fight with someone in Mondstadt?",
  },
  {
    type: "fight",

    region: "liyue",
    latitude: LIYUE_LOCATION.lat,
    longitude: LIYUE_LOCATION.lng,

    title: "Fight - Liyue",
    description: "Wanna fight with someone in Liyue?",
  },
  {
    type: "fight",

    region: "inazuma",
    latitude: INAZUMA_LOCATION.lat,
    longitude: INAZUMA_LOCATION.lng,

    title: "Fight - Inazuma",
    description: "Wanna fight with someone in Inazuma?",
  },
];

const DEFAULT_MARKERS = [...DEFAULT_FIGHT_MARKERS];

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

  const ICON_SIZE = 36;
  const icon = new Icon({
    iconUrl:
      options.type === "fight"
        ? RawIconSwordCross
        : // TODO: add other icons
          RawIconInformation,
    className:
      "!p-1 bg-grey-800 rounded-md border border-grey-700 bg-opacity-70 filter backdrop-blur-sm",
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [ICON_SIZE / 2, ICON_SIZE / 2],
  });

  const marker = new Marker(new LatLng(options.latitude, options.longitude), {
    icon,
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
  // Add the default markers to the map.
  DEFAULT_MARKERS.forEach(createMarker);

  // Add the connected users to the map.
  state.connected_users_channel = supabase.channel("map_cursors", {
    configs: {
      broadcast: { ack: true },
    },
  });

  // state.connected_users_channel
  //   .on(
  //     "broadcast",
  //     { event: "location" },
  //     (event_data: MousePositionPayload) => {
  //       if (!state.connected_users[event_data.payload.username]) {
  //         state.connected_users[event_data.payload.username] = new Marker(
  //           new LatLng(event_data.payload.lat, event_data.payload.lng)
  //         );

  //         state.connected_users[event_data.payload.username].addTo(map);
  //       }

  //       state.connected_users[event_data.payload.username].setLatLng(
  //         new LatLng(event_data.payload.lat, event_data.payload.lng)
  //       );
  //     }
  //   )
  //   .subscribe(async (status: string) => {
  //     if (status === "SUBSCRIBED") {
  //       map.on("mousemove", ({ latlng }) => {
  //         sendMouseBroadcast({
  //           username: state.username,
  //           lat: latlng.lat,
  //           lng: latlng.lng,
  //         });
  //       });
  //     }
  //   });

  resetLoginToast();
});

onBeforeUnmount(() => {
  if (state.connected_users_channel) {
    state.connected_users_channel.unsubscribe();
  }

  if (map_ref.value) map_ref.value.remove();
  if (map_element_ref.value) map_element_ref.value.remove();
});
</script>
