import type { Database } from "@/types/Database";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get the `maps` bucket URL.
 * The `.replace` method is used to remove the URL - if there is - trailing slash.
 */
export const storedMapsUrl = (map_name: "teyvat") =>
  supabaseUrl.replace(/\/$/, "") + `/storage/v1/object/public/maps/${map_name}`;
