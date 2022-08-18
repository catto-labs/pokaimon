import type { Database } from "@/types/Database";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Get the `maps` bucket URL.
 * The `.replace` method is used to remove the URL - if there is - trailing slash.
 */
export const storedMapsUrl = (map_name: "teyvat") =>
  supabaseUrl.replace(/\/$/, "") + `/storage/v1/object/public/maps/${map_name}`;

export const getCharacterInventory = async (id: number) => {
  const getData = () =>
    supabase.from("character_inventory").select(`*`).match({ id }).single();

  type CharacterInventoryResponse = Awaited<ReturnType<typeof getData>>;
  type CharacterInventoryResponseSuccess = Omit<
    Database["public"]["Tables"]["character_inventory"]["Row"],
    "base_character"
  > & {
    base_character: Omit<
      Database["public"]["Tables"]["character_info"]["Row"],
      "action_1" | "action_2" | "action_3" | "action_4"
    > & {
      action_1: Database["public"]["Tables"]["character_actions"]["Row"];
      action_2: Database["public"]["Tables"]["character_actions"]["Row"];
      action_3: Database["public"]["Tables"]["character_actions"]["Row"];
      action_4: Database["public"]["Tables"]["character_actions"]["Row"];
    };
  };

  const response = (await getData()) as {
    error: CharacterInventoryResponse["error"];
    data: CharacterInventoryResponseSuccess;
  };

  return response;
};
