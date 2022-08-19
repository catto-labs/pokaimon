import type {
  CharacterInfoTable,
  CharacterActionsTable,
  CharacterInventoryTable,
} from "../../../src/types/Database.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0-rc.3";

export const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

/**
 * Helper typed function to get full nested data
 * of a `character_inventory` item matching its ID.
 */
export const getFromInventoryCharacter = async (id: number) => {
  const getData = () =>
    supabase
      .from("character_inventory")
      .select(
        `
      id, xp, health, created_at, owner,
      base_character(
        id, region, description,
        name, element,
        base_health,
        action_1(*),
        action_2(*),
        action_3(*),
        action_4(*)
      )
    `
      )
      .match({ id })
      .single();

  type Response = Awaited<ReturnType<typeof getData>>;
  type ResponseSuccess = Omit<CharacterInventoryTable, "base_character"> & {
    base_character: Omit<
      CharacterInfoTable,
      "action_1" | "action_2" | "action_3" | "action_4"
    > & {
      action_1: CharacterActionsTable;
      action_2: CharacterActionsTable;
      action_3: CharacterActionsTable;
      action_4: CharacterActionsTable;
    };
  };

  const response = (await getData()) as {
    error: Response["error"];
    data: ResponseSuccess;
  };

  return response;
};

export const getCharacterInfo = async (id: number) => {
  const getData = () =>
    supabase
      .from("character_info")
      .select(
        `
    id, region, description, name,
    element, base_health,
    action_1(*),
    action_2(*),
    action_3(*),
    action_4(*)
  `
      )
      .match({ id })
      .single();

  type Response = Awaited<ReturnType<typeof getData>>;
  type ResponseSuccess = Omit<
    CharacterInfoTable,
    "action_1" | "action_2" | "action_3" | "action_4"
  > & {
    action_1: CharacterActionsTable;
    action_2: CharacterActionsTable;
    action_3: CharacterActionsTable;
    action_4: CharacterActionsTable;
  };

  const response = (await getData()) as {
    error: Response["error"];
    data: ResponseSuccess;
  };

  return response;
};
