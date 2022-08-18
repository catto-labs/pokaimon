interface DefaultMarkerOptions {
  latitude: number;
  longitude: number;

  title: string;
  description?: string;
}

export interface FightMarkerOptions extends DefaultMarkerOptions {
  type: "fight";
  region: "mondstadt" | "liyue" | "inazuma";
}

export type MarkerOptions = FightMarkerOptions;
