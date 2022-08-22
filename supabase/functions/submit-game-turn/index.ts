import type { PostgrestError } from "https://esm.sh/@supabase/supabase-js@2.0.0-rc.3";
import type { GamesTable } from "../../../src/types/Database.ts";
import type { Character } from "../../../src/types/Character.ts";

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { sendErrorResponse, sendSuccessResponse } from "../_shared/globals.ts";
import {
  supabase,
  getFromInventoryCharacter,
  getCharacterInfo,
} from "../_shared/supabase.ts";
import cors from "../_shared/cors.ts";

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: cors,
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
      .match({ id: body.game_id })
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

    // Check if the user is allowed to play this fight.
    const userIsInGame =
      game.data.player1 === user_id || game.data.player2 === user_id;

    if (!userIsInGame) {
      return sendErrorResponse({
        message: "Current user is not in this fight.",
        status: 403,
      });
    }

    // Know which player (1 or 2) is the current user.
    const userIsPlayer = game.data.player1 === user_id ? 1 : 2;

    // Check if the game is finished or not.
    const isGameNotFinished = !game.data.winner;
    if (!isGameNotFinished) {
      return sendErrorResponse({
        message: "Fight is already finished.",
        status: 400,
      });
    }

    // Check if the current turn is for us.
    const isUserTurn = game.data.turn === userIsPlayer;
    if (!isUserTurn) {
      return sendErrorResponse({ message: "It's not your turn", status: 400 });
    }

    // Re-structure game's data about the player.
    const player_received_data = {
      id: userIsPlayer === 1 ? game.data.player1 : game.data.player2,
      card:
        userIsPlayer === 1 ? game.data.player1_card : game.data.player2_card,
      health: userIsPlayer === 1 ? game.data.player1_hp : game.data.player2_hp,
    };

    // Re-structure game's data about the enemy.
    const enemy_received_data = {
      id: userIsPlayer === 1 ? game.data.player2 : game.data.player1,
      card:
        userIsPlayer === 1 ? game.data.player2_card : game.data.player1_card,
      health: userIsPlayer === 1 ? game.data.player2_hp : game.data.player1_hp,
    };

    const { data: player_card, error: player_card_error } =
      await getFromInventoryCharacter(player_received_data.card);

    if (player_card_error || !player_card) {
      return sendErrorResponse({
        message:
          player_card_error?.message ||
          "Can't get informations about player's character.",
        status: 500,
      });
    }

    const player: Character = {
      name: player_card.base_character.name,
      health: player_received_data.health,
      maxHealth: player_card.health,

      actions: [
        player_card.base_character.action_1,
        player_card.base_character.action_2,
        player_card.base_character.action_3,
        player_card.base_character.action_4,
      ],
    };

    // Initialize the enemy's fight data.
    let enemy: Character;

    // If the enemy is a bot, build a character based on the random `character_info` ID.
    if (!enemy_received_data.id) {
      const { data: enemy_card, error: enemy_card_error } =
        await getCharacterInfo(enemy_received_data.card);

      if (enemy_card_error || !enemy_card) {
        return sendErrorResponse({
          message:
            enemy_card_error?.message ||
            "Can't get informations about enemy's character.",
          status: 500,
        });
      }

      // Build the enemy's fight data.
      enemy = {
        name: enemy_card.name,
        health: enemy_received_data.health,
        maxHealth: enemy_card.base_health,

        actions: [
          enemy_card.action_1,
          enemy_card.action_2,
          enemy_card.action_3,
          enemy_card.action_4,
        ],
      };
    }
    // If the enemy is a real player, get the enemy's character informations.
    else {
      const { data: enemy_card, error: enemy_card_error } =
        await getFromInventoryCharacter(enemy_received_data.card);

      if (enemy_card_error || !enemy_card) {
        return sendErrorResponse({
          message:
            enemy_card_error?.message ||
            "Can't get informations about enemy's character.",
          status: 500,
        });
      }

      // Build the enemy's fight data.
      enemy = {
        name: enemy_card.base_character.name,
        health: enemy_received_data.health,
        maxHealth: enemy_card.health,

        actions: [
          enemy_card.base_character.action_1,
          enemy_card.base_character.action_2,
          enemy_card.base_character.action_3,
          enemy_card.base_character.action_4,
        ],
      };
    }

    // Initialize the fight data.
    const fight_data = {
      turn: game.data.turn,
      player,
      enemy,

      // Helper variable.
      userIsPlayer,
    };

    let winner: 1 | 2 | 3 | null = null;
    const playTurn = async (action_index: number) => {
      if (!game.data) return;

      // Set the current action index as the one we're going to use.
      await supabase
        .from("games")
        .update({ action_index })
        .match({ id: game.data.id });

      const fight_player =
        fight_data.turn === fight_data.userIsPlayer ? "player" : "enemy";
      const fight_enemy = fight_player === "player" ? "enemy" : "player";

      const action = fight_data[fight_player].actions[action_index];

      // Perform the action.
      const enemy_hit = Math.random() < action.enemy_hit_chance;
      const self_hit = Math.random() < action.self_hit_chance;
      const enemy_damage = enemy_hit
        ? randomBetween(action.enemy_min_damage, action.enemy_max_damage)
        : 0;
      const self_damage = self_hit
        ? randomBetween(action.self_min_damage, action.self_max_damage)
        : 0;

      // Check if the health is below `maxHealth`.
      let new_enemy_health = fight_data[fight_enemy].health - enemy_damage;
      if (new_enemy_health >= fight_data[fight_enemy].maxHealth) {
        new_enemy_health = fight_data[fight_enemy].maxHealth;
      }

      // Check if the health is below `maxHealth`.
      let new_player_health = fight_data[fight_player].health - self_damage;
      if (new_player_health >= fight_data[fight_player].maxHealth) {
        new_player_health = fight_data[fight_player].maxHealth;
      }

      // Update the health.
      fight_data[fight_enemy].health = new_enemy_health;
      fight_data[fight_player].health = new_player_health;

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

      if (new_player1_hp <= 0 && new_player2_hp > 0) {
        winner = 2;
      } else if (new_player1_hp > 0 && new_player2_hp <= 0) {
        winner = 1;
      } else if (new_player1_hp <= 0 && new_player2_hp <= 0) {
        winner = 3;
      }

      if (
        (winner === 1 && game.data.player1) ||
        (winner === 2 && game.data.player2)
      ) {
        // If the winner is not a bot, proceed to give rewards.
        const rewards = game.data.rewards as {
          primos: number;
          card_xp: number;
          user_xp: number;
        };

        const { data: rewarded_user, error: error_rewarded_user } =
          await supabase
            .from("users")
            .select(`id, xp, primos, selected_character(id, xp)`)
            .match({ id: winner === 1 ? game.data.player1 : game.data.player2 })
            .single();

        if (error_rewarded_user || !rewarded_user) {
          throw Error(
            error_rewarded_user.message ||
              "Can't get informations about the rewarded user."
          );
        }

        const selected_character = rewarded_user.selected_character as {
          id: number;
          xp: number;
        };

        await supabase
          .from("users")
          .update({
            xp: rewarded_user.xp + rewards.user_xp,
            primos: rewarded_user.primos + rewards.primos,
          })
          .match({ id: winner === 1 ? game.data.player1 : game.data.player2 });

        await supabase
          .from("character_inventory")
          .update({ xp: selected_character.xp + rewards.card_xp })
          .match({ id: selected_character.id });

        // When the enemy is a bot, reward the user with the bot's character.
        if (!enemy_received_data.id) {
          // Check if we already have the bot's character in the user's inventory.
          const { data: bot_character } = await supabase
            .from("character_inventory")
            .select("id")
            .match({
              owner: user_id,
              base_character: enemy_received_data.card,
            })
            .single();

          if (!bot_character) {
            console.info("check bot character", bot_character);
            // If we don't have the bot's character, create it.
            await supabase.from("character_inventory").insert({
              owner: user_id,
              base_character: enemy_received_data.card,
              health: fight_data.enemy.maxHealth,
              xp: 0,
            });

            // Add the character to the rewards.
            Object.assign(game.data.rewards, {
              character_name: enemy.name,
            });
          }
        }
      }

      // Wait a little bit before updating the game.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updated_fight_data = {
        rewards: game.data.rewards,
        player1_hp: new_player1_hp,
        player2_hp: new_player2_hp,
        turn: fight_data.turn,
        action_index: null,
        winner,
      };

      await supabase
        .from("games")
        .update(updated_fight_data)
        .match({ id: game.data.id });
    };

    await playTurn(body.action_index);

    // When it's a bot, play with random action.
    if (!enemy_received_data.id && winner === null) {
      // Wait 1s until to simulate bot's choice.
      await new Promise((resolve) => setTimeout(resolve, 800));
      const action_index = Math.floor(Math.random() * 4);

      // Simulate the bot's network server latence.
      await playTurn(action_index);
    }

    return sendSuccessResponse(null);
  } catch (error) {
    return sendErrorResponse({
      message: error.message,
      status: 500,
    });
  }
});
