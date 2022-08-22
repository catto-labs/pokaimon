import type { AvailableRegions } from "@/types/Database";

interface DefaultMarkerOptions {
  title: string;
  latitude: number;
  longitude: number;
}

export interface FightMarkerOptions extends DefaultMarkerOptions {
  description?: string;

  type: "fight";
  region: AvailableRegions;
}

export interface UserMarkerOptions extends DefaultMarkerOptions {
  username: string;
}
