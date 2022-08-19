import type { PostgrestError } from "https://esm.sh/@supabase/supabase-js@2.0.0-rc.3";
import type { GamesTable } from "../../../src/types/Database.ts";

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabase } from "../_shared/supabase.ts";
import cors from "../_shared/cors.ts";

import { sendErrorResponse, sendSuccessResponse } from "../_shared/globals.ts";

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: cors,
    });
  }

  try {
    const { game_id } = await req.json();

    if (!game_id) {
      return sendErrorResponse({
        message: "Missing ID of the fight to join.",
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
    const { data: user_data, error: user_error } = await supabase.auth.getUser(
      USER_JWT
    );

    if (user_error || !user_data) {
      return sendErrorResponse({
        message: user_error?.message || "Invalid authorization header.",
        status: 403,
      });
    }

    const user_id = user_data.user.id;

    const game = (await supabase
      .from("games")
      .select()
      .match({ id: game_id })
      .single()) as {
      data: GamesTable | null;
      error?: PostgrestError;
    };

    if (game.error || !game.data) {
      return sendErrorResponse({
        message: game.error?.message || "Invalid game ID.",
        status: 401,
      });
    }

    if (!game.data.available) {
      return sendErrorResponse({
        message: "This game is not available anymore.",
        status: 401,
      });
    }

    if (game.data.player2) {
      return sendErrorResponse({
        message: "This game is already full.",
        status: 401,
      });
    }

    if (game.data.player1 === user_id || game.data.player2 === user_id) {
      return sendSuccessResponse(null);
    }

    const player2 = user_id;

    const { data: character_data, error: character_error } = await supabase
      .from("users")
      .select(`selected_character(id, health)`)
      .match({ id: user_id })
      .single();

    if (character_error || !character_data) {
      return sendErrorResponse({
        message:
          character_error?.message || "Can't get your selected character.",
        status: 500,
      });
    }

    const card = character_data.selected_character as {
      id: number;
      health: number;
    };

    const player2_card = card.id;
    const player2_hp = card.health;

    const turn = Math.random() > 0.5 ? 1 : 2;

    await supabase
      .from("games")
      .update({ player2, player2_card, player2_hp, turn, available: false })
      .match({ id: game_id });

    return sendSuccessResponse(null);
  } catch (error) {
    return sendErrorResponse({
      message: error.message,
      status: 500,
    });
  }
});
