export interface MarkerOptions {
  latitude: number;
  longitude: number;

  id: string;
  type: "fight" | "event" | "story";

  title: string;
  description?: string;
}
