import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabase } from "../_shared/supabase.ts";
import cors from "../_shared/cors.ts";

import {
  sendErrorResponse,
  sendSuccessResponse,
  randomBetween,
} from "../_shared/globals.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: cors,
    });
  }

  try {
    const { region } = await req.json();
    const selected_region = region || "mondstadt";

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
    const { data: user_data, error: user_error } = await supabase.auth.getUser(
      USER_JWT
    );

    if (user_error || !user_data) {
      return sendErrorResponse({
        message: user_error?.message || "Invalid authorization header.",
        status: 403,
      });
    }

    const player1 = user_data.user.id;

    /** When there's a bot, get available characters for the region. */
    const { data: characters, error: characters_error } = await supabase
      .from("character_info")
      .select()
      .match({ region: selected_region })
      .select();

    if (!characters || characters_error) {
      return sendErrorResponse({
        message:
          characters_error?.message ||
          "Can't get the characters of this region.",
        status: 500,
      });
    }

    // Store them for later use.
    const region_characters = characters as {
      id: number;
      region: string;
      base_health: number;
    }[];

    // Fetch data for `player1`.
    const { data: p1_data, error: p1_error } = await supabase
      .from("users")
      .select(`id, selected_character(id, health)`)
      .match({ id: player1 })
      .single();

    if (!p1_data || p1_error) {
      return sendErrorResponse({
        message: p1_error?.message || "Can't get the character.",
        status: 500,
      });
    }

    const p1_character = p1_data.selected_character as {
      id: number;
      health: number;
    };

    const player1_card = p1_character.id;
    const player1_hp = p1_character.health;

    // Randomize data for `player2`.
    // `player2` is always a bot when creating a game.
    const random_index = Math.floor(Math.random() * region_characters.length);
    const player2_card = region_characters[random_index].id;
    const player2_hp = region_characters[random_index].base_health;

    // Calculate random rewards.
    const rewards = {
      user_xp: randomBetween(50, 150),
      card_xp: randomBetween(20, 80),
      primos: randomBetween(10, 100),
    };

    const { data: game, error } = await supabase
      .from("games")
      .insert([
        {
          player1,
          player1_card,
          player1_hp,
          player2: null,
          player2_card,
          player2_hp,
          rewards,
        },
      ])
      .select();

    if (error) {
      return sendErrorResponse({
        message: error.message,
        status: 500,
      });
    }

    return sendSuccessResponse(game);
  } catch (error) {
    return sendErrorResponse({
      message: error.message,
      status: 400,
    });
  }
});
