import type { FightMarkerOptions, UserMarkerOptions } from "@/types/Marker";

import { Map, Marker, LatLng, Icon, DivIcon } from "leaflet";
import RawIconSwordCross from "@/assets/icons/sword-cross.png";
import RawIconInformation from "@/assets/icons/information.png";

export const LIYUE_LOCATION = new LatLng(-48.4375, 28.265625);
export const INAZUMA_LOCATION = new LatLng(
  -77.15562605857849,
  79.16369414329529
);
export const MONDSTADT_LOCATION = new LatLng(
  -19.15562605857849,
  41.16369414329529
);

export const DEFAULT_FIGHT_MARKERS: FightMarkerOptions[] = [
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

export const createFightMarker = (
  map: Map,
  options: FightMarkerOptions,
  onclick: () => unknown
) => {
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
  marker.on("click", onclick);

  marker.addTo(map);
};

export const createUserMarker = (
  map: Map,
  options: UserMarkerOptions,
  onclick: () => unknown
) => {
  const icon = new DivIcon({
    className: "h-24 w-24 rounded-full bg-grey-600 border-2 border-grey-500",
    iconSize: [20, 20],
  });

  const marker = new Marker(new LatLng(options.latitude, options.longitude), {
    icon,
    title: options.username,
  });

  marker.on("click", onclick);

  marker.addTo(map);
  return marker;
};
