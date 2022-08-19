import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabase } from "../_shared/supabaseClient.ts";
import { corsHeaders } from "../_shared/cors.ts";

import type { CharacterActionsTable } from "../../../src/types/Database.ts";

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const body: {
      game_id: number;
      action_index?: number;
    } = await req.json();

    if (typeof body.action_index === "undefined") {
      body.action_index = Math.floor(Math.random() * 4);
    }

    const authorization = req.headers.get("authorization") as
      | string
      | undefined;
    if (!authorization) {
      return new Response(
        JSON.stringify({ success: false, error: "No authorization header" }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 400,
        }
      );
    }

    const jwt = authorization.replace("Bearer", "").trim();
    const { data: user_data, error: user_error } = await supabase.auth.getUser(
      jwt
    );

    if (user_error) {
      return new Response(
        JSON.stringify({ success: false, error: user_error }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        }
      );
    }

    const user_id = user_data.user.id;

    const { data: game_data, error: game_error } = await supabase
      .from("games")
      .select()
      .match({ id: body.game_id })
      .single();

    if (game_error) {
      return new Response(
        JSON.stringify({ success: false, error: game_error }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        }
      );
    }

    const userIsInGame =
      game_data.player1 === user_id || game_data.player2 === user_id;

    if (!userIsInGame) {
      return new Response(
        JSON.stringify({ success: false, error: "User is not in game" }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 403,
        }
      );
    }

    const userIsPlayer = game_data.player1 === user_id ? 1 : 2;

    const isGameNotFinished = !game_data.winner;
    if (!isGameNotFinished) {
      return new Response(
        JSON.stringify({ success: false, error: "Game is already finished" }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 403,
        }
      );
    }

    const isUserTurn = game_data.turn === userIsPlayer;

    if (!isUserTurn) {
      return new Response(
        JSON.stringify({ success: false, error: "It's not your turn" }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 403,
        }
      );
    }

    // Re-structure game's data about the player.
    const player_received_data = {
      id: userIsPlayer === 1 ? game_data.player1 : game_data.player2,
      card:
        userIsPlayer === 1 ? game_data.player1_card : game_data.player2_card,
      health: userIsPlayer === 1 ? game_data.player1_hp : game_data.player2_hp,
    };
    const enemy_received_data = {
      id: userIsPlayer === 1 ? game_data.player2 : game_data.player1,
      card:
        userIsPlayer === 1 ? game_data.player2_card : game_data.player1_card,
      health: userIsPlayer === 1 ? game_data.player2_hp : game_data.player1_hp,
    };

    type BaseCard = {
      name: string;
      action_1: CharacterActionsTable;
      action_2: CharacterActionsTable;
      action_3: CharacterActionsTable;
      action_4: CharacterActionsTable;
    };

    type Card = {
      base_character: BaseCard;
    };

    const { data: player_card, error: player_card_error } = await supabase
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
      .match({ id: player_received_data.card })
      .single();

    if (player_card_error) {
      return new Response(
        JSON.stringify({ success: false, error: player_card_error }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 500,
        }
      );
    }

    const player_typed_card = player_card as Card;

    const player = {
      name: player_typed_card.base_character.name,
      health: player_received_data.health,

      actions: [
        player_typed_card.base_character.action_1,
        player_typed_card.base_character.action_2,
        player_typed_card.base_character.action_3,
        player_typed_card.base_character.action_4,
      ],
    };

    // Initialize the enemy's fight data.
    let enemy;

    // If the enemy is a bot, build a character based on the random `character_info` ID.
    if (!enemy_received_data.id) {
      const { data: enemy_card, error: enemy_card_error } = await supabase
        .from("character_inventory")
        .select(
          `
            id, region, description,
            name, element,
            base_health,
            action_1(*),
            action_2(*),
            action_3(*),
            action_4(*)
          `
        )
        .match({ id: enemy_received_data.card })
        .single();

      if (enemy_card_error) {
        return new Response(
          JSON.stringify({ success: false, error: enemy_card_error }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
            status: 500,
          }
        );
      }

      const card = enemy_card as BaseCard;

      // Build the enemy's fight data.
      enemy = {
        name: card.name,
        health: enemy_received_data.health,

        actions: [card.action_1, card.action_2, card.action_3, card.action_4],
      };
    }
    // If the enemy is a real player, get the enemy's character informations.
    else {
      const { data: enemy_card, error: enemy_card_error } = await supabase
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
        .match({ id: enemy_received_data.card })
        .single();

      if (enemy_card_error) {
        return new Response(
          JSON.stringify({ success: false, error: enemy_card_error }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
            status: 500,
          }
        );
      }

      const card = enemy_card as Card;

      // Build the enemy's fight data.
      enemy = {
        name: card.base_character.name,
        health: enemy_received_data.health,

        actions: [
          card.base_character.action_1,
          card.base_character.action_2,
          card.base_character.action_3,
          card.base_character.action_4,
        ],
      };
    }

    // Initialize the fight data.
    const fight_data = {
      player,
      enemy,
      turn: game_data.turn,
      userIsPlayer,
    };

    const fight_player =
      fight_data.turn === fight_data.userIsPlayer ? "player" : "enemy";
    const fight_enemy = fight_player === "player" ? "enemy" : "player";

    const action = fight_data[fight_player].actions[body.action_index];

    // Perform the action.
    const enemy_hit = Math.random() < action.enemy_hit_chance;
    const self_hit = Math.random() < action.self_hit_chance;
    const enemy_damage = enemy_hit
      ? randomBetween(action.enemy_min_damage, action.enemy_max_damage)
      : 0;
    const self_damage = self_hit
      ? randomBetween(action.self_min_damage, action.self_max_damage)
      : 0;

    // Update the health.
    fight_data[fight_enemy].health -= enemy_damage;
    fight_data[fight_player].health -= self_damage;

    const new_player1_hp =
      fight_data.userIsPlayer === 1
        ? fight_data.player.health
        : fight_data.enemy.health;
    const new_player2_hp =
      fight_data.userIsPlayer === 2
        ? fight_data.player.health
        : fight_data.enemy.health;

    // Switch turns.
    fight_data.turn = fight_data.turn === 1 ? 2 : 1;

    const updated_fight_data = {
      player1_hp: new_player1_hp,
      player2_hp: new_player2_hp,
      turn: fight_data.turn,
    };

    await supabase
      .from("games")
      .update(updated_fight_data)
      .match({ id: game_data.id });

    return new Response(
      JSON.stringify({
        success: true,
        data: { old: fight_data, new: updated_fight_data },
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});
