import type { CharacterInventoryTable } from "../../../src/types/Database.ts";

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import {
  supabase,
  getCharacterInfo,
  getUserData,
  getOwnedCharacters,
} from "../_shared/supabase.ts";
import cors from "../_shared/cors.ts";

import { sendErrorResponse, sendSuccessResponse } from "../_shared/globals.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: cors,
    });
  }

  try {
    const { id: character_id } = await req.json();

    if (!character_id) {
      return sendErrorResponse({
        message: "Missing ID of the character to buy.",
        status: 400,
      });
    }

    const authorization = req.headers.get("authorization") as
      | string
      | undefined;
    if (!authorization) {
      return sendErrorResponse({
        message: "Missing authorization header.",
        status: 401,
      });
    }

    const USER_JWT = authorization.replace("Bearer", "").trim();
    const { data: user_global_data, error: user_global_error } =
      await supabase.auth.getUser(USER_JWT);

    if (user_global_error || !user_global_data) {
      return sendErrorResponse({
        message: user_global_error?.message || "Invalid authorization header.",
        status: 403,
      });
    }

    const user_id = user_global_data.user.id;

    const { data: character_data, error: character_data_error } =
      await getCharacterInfo(character_id);

    if (character_data_error || !character_data) {
      return sendErrorResponse({
        message:
          character_data_error?.message ||
          "Unable to get the character's data.",
        status: 500,
      });
    }

    if (!character_data.buyable) {
      return sendErrorResponse({
        message: "This character can't be buyed.",
        status: 403,
      });
    }

    const { data: user_data, error: user_data_error } = await getUserData(
      user_id
    );

    if (user_data_error || !user_data) {
      return sendErrorResponse({
        message: user_data_error?.message || "Unable to get the user's data.",
        status: 500,
      });
    }

    if (character_data.price > user_data.primos) {
      return sendErrorResponse({
        message: "You don't have enough primogems.",
        status: 403,
      });
    }

    const { data: user_characters, error: user_characters_error } =
      await getOwnedCharacters(user_id);

    if (user_characters_error || !user_characters) {
      return sendErrorResponse({
        message:
          user_characters_error?.message || "Unable to get user's characters.",
        status: 500,
      });
    }

    if (
      user_characters.find(
        (character: CharacterInventoryTable) =>
          character.base_character === character_id
      )
    ) {
      return sendErrorResponse({
        message: "You already have this character in your inventory.",
        status: 400,
      });
    }

    const { error: user_error } = await supabase
      .from("users")
      .update({
        primos: user_data.primos - character_data.price,
      })
      .match({ id: user_id });

    if (user_error) {
      return sendErrorResponse({
        message:
          user_error?.message ||
          "Unable to remove the primogems from your account.",
        status: 500,
      });
    }

    const { error: inventory_error } = await supabase
      .from("character_inventory")
      .insert({
        base_character: character_data.id,
        health: character_data.base_health,
        owner: user_id,
        xp: 0,
      });

    if (inventory_error) {
      return sendErrorResponse({
        message:
          inventory_error?.message ||
          "Unable to insert the new character in your inventory.",
        status: 500,
      });
    }

    return sendSuccessResponse(null);
  } catch (error) {
    return sendErrorResponse({
      message: error.message,
      status: 500,
    });
  }
});
