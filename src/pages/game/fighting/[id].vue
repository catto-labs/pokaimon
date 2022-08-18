<template>
  <div
    v-if="state.loaded"
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="mb-4 w-full max-w-6xl rounded-xl bg-black p-8">
      <div
        class="flex items-end justify-between rounded-lg bg-grey-700 px-4 pt-8 pb-0"
      >
        <div class="ml-8 flex flex-row items-end">
          <img src="https://i.imgur.com/NxUiA4N.png" class="aspect-auto h-56" />
        </div>
        <div class="mr-8">
          <img src="https://i.imgur.com/RMUyb2Q.png" class="aspect-auto h-56" />
        </div>
      </div>

      <hr class="my-4 text-grey-700" />
      <div class="grid grid-cols-2 gap-8">
        <div
          v-if="
            state.turn === state.userIsPlayer &&
            state.current_attack_index === null
          "
        >
          <h2 class="mb-4 text-xl font-bold">
            What will
            {{ state.player.name }}
            do?
          </h2>
          <div class="grid grid-cols-2 grid-rows-2 gap-4">
            <button
              :key="action_index"
              v-for="(action, action_index) in state.player.actions"
              @click="playTurn(action_index)"
              class="rounded-lg bg-grey-700 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
            >
              {{ action.name }}
            </button>
          </div>
        </div>

        <div
          v-else-if="
            state.turn !== state.userIsPlayer &&
            state.current_attack_index === null
          "
        >
          <h2 class="mb-4 text-xl font-bold">
            {{ state.enemy.name }} is selecting an attack...
          </h2>
        </div>

        <div v-else-if="state.current_attack_index !== null">
          <h2 class="mb-4 text-xl font-bold">
            {{
              state[state.turn === state.userIsPlayer ? "player" : "enemy"].name
            }}
            will do
            <span class="text-brand-main">{{
              state[state.turn === state.userIsPlayer ? "player" : "enemy"]
                .actions[state.current_attack_index].name
            }}</span>
          </h2>
        </div>

        <div class="flex gap-8">
          <div
            class="mb-8 flex h-full w-64 flex-col space-y-2 rounded-lg bg-grey-700 p-4"
          >
            <div class="flex flex-row justify-between space-x-16">
              <strong>{{ state.player.name }}</strong>
              <!-- <p>Lv. {{ state.player.level }}</p> -->
            </div>
            <div class="rounded-full bg-grey-600">
              <div
                class="rounded-full bg-brand-main p-2"
                :style="{
                  width:
                    (
                      (state.player.health / state.player.maxHealth) *
                      100
                    ).toString() + '%',
                }"
              ></div>
            </div>
            <span class="text-right">
              {{ state.player.health > 0 ? state.player.health : 0 }}/{{
                state.player.maxHealth
              }}
              HP
            </span>
          </div>
          <div
            class="mb-8 flex h-full w-64 flex-col space-y-2 rounded-lg bg-grey-700 p-4"
          >
            <div class="flex flex-row justify-between space-x-16">
              <strong>{{ state.enemy.name }}</strong>
              <!-- <p>Lv. {{ state.enemy.level }}</p> -->
            </div>
            <div class="rounded-full bg-grey-600">
              <div
                class="rounded-full bg-brand-second p-2"
                :style="{
                  width:
                    (
                      (state.enemy.health / state.enemy.maxHealth) *
                      100
                    ).toString() + '%',
                }"
              ></div>
            </div>
            <span class="text-right">
              {{ state.enemy.health > 0 ? state.enemy.health : 0 }}/{{
                state.enemy.maxHealth
              }}
              HP
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="mb-4 w-full max-w-6xl rounded-xl bg-black p-8">
      <div class="flex items-center justify-center">
        Gathering fight informations...
      </div>
    </div>
  </div>
</template>

<route>
{
  meta: {
    requiresAuth: true,
    checkForCompletedOnboarding: true
  }
}
</route>

<script setup lang="ts">
import type { Character } from "@/types/Character";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { wait, randomBetween } from "@/utils/globals";
import { supabase } from "@/utils/supabase";
import { store } from "@/utils/store";

const router = useRouter();

const props = defineProps({
  id: String,
});

const state = reactive<
  | {
      loaded: false;
    }
  | {
      loaded: true;
      enemyIsBot: boolean;

      turn: number;
      winner: "enemy" | "player" | null;
      /** `null` when no selected. Goes from `1` to `4` (in DB: `action_{index}`). */
      current_attack_index: number | null;

      userIsPlayer: 1 | 2;

      player: Character;
      enemy: Character;
    }
>({
  loaded: false,
});

onMounted(async () => {
  const game_id = props.id;
  const user_session = store.authSession?.user;

  if (!game_id || !user_session) {
    router.push("/game");
    return;
  }

  // Get global informations about the game.
  const { data: game_data, error: game_error } = await supabase
    .from("games")
    .select()
    .match({ id: game_id })
    .single();

  // The game doesn't exist.
  if (game_error || !game_data) {
    router.push("/game");
    return;
  }

  // Check if the player is able to join the game.
  const isUserInFight =
    game_data.player1 === user_session.id ||
    game_data.player2 === user_session.id;
  if (!isUserInFight) {
    alert("You're not allowed to join this fight. Redirecting to map...");
    router.push("/game");
    return;
  }

  const userIsPlayer = game_data.player1 === user_session.id ? 1 : 2;

  // Re-structure game's data about the player.
  const player_received_data = {
    id: userIsPlayer === 1 ? game_data.player1 : game_data.player2,
    card: userIsPlayer === 1 ? game_data.player1_card : game_data.player2_card,
  };
  const enemy_received_data = {
    id: userIsPlayer === 1 ? game_data.player2 : game_data.player1,
    card: userIsPlayer === 1 ? game_data.player2_card : game_data.player1_card,
  };

  if (!player_received_data || !enemy_received_data) {
    router.push("/game");
    return;
  }

  // Get the player's informations.
  const { data: player_card, error: player_card_error } = await supabase
    .from("character_inventory")
    .select(
      `
      id,
      xp,
      health,
      base_character(
        name,
        element,
        action_1(*),
        action_2(*),
        action_3(*),
        action_4(*)
      )
    `
    )
    .match({ id: player_received_data.card })
    .single();

  if (!player_card || player_card_error) {
    alert("Couldn't get data on current player. Confirm to reload page.");
    window.location.reload();
    return;
  }

  // Build the player's fight data.
  const player: Character = {
    name: player_card.base_character.name,

    health: player_card.health,
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
    const { data: enemy_card, error: enemy_card_error } = await supabase
      .from("character_info")
      .select(
        `
        name,
        element,
        base_health,
        action_1(*),
        action_2(*),
        action_3(*),
        action_4(*)
      `
      )
      .match({ id: enemy_received_data.card })
      .single();

    if (!enemy_card || enemy_card_error) {
      alert("An error occurred. Refreshing...");
      router.push("/game");
      return;
    }

    // Build the enemy's fight data.
    enemy = {
      name: enemy_card.name,
      health: enemy_card.base_health,
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
    const { data: enemy_card, error: enemy_card_error } = await supabase
      .from("character_inventory")
      .select(
        `
        id,
        xp,
        health,
        base_character(
          name,
          element,
          action_1(*),
          action_2(*),
          action_3(*),
          action_4(*)
        )
      `
      )
      .match({ id: enemy_received_data.card })
      .single();

    if (!enemy_card || enemy_card_error) {
      alert("An error occurred. Refreshing...");
      router.push("/game");
      return;
    }

    // Build the enemy's fight data.
    enemy = {
      name: enemy_card.base_character.name,

      health: enemy_card.health,
      maxHealth: enemy_card.health,

      actions: [
        enemy_card.base_character.action_1,
        enemy_card.base_character.action_2,
        enemy_card.base_character.action_3,
        enemy_card.base_character.action_4,
      ],
    };
  }

  Object.assign(state, {
    loaded: true,
    turn: game_data.turn,
    winner: null,
    current_attack_index: null,
    player,
    enemy,

    userIsPlayer: game_data.player1 === user_session.id ? 1 : 2,
    enemyIsBot: !enemy_received_data.id,
  });

  wait(2000).then(processNextTurn);
});

/**
 * If we don't choose an action, it will select one for us.
 * @action - The action to perform (can choose between 4 actions, `0` to `3`).
 */
const playTurn = async (action_index?: number) => {
  if (!state.loaded) return;

  if (typeof action_index === "undefined") {
    action_index = Math.floor(Math.random() * 4);
  }

  // Store the action index to say which action we will perform.
  state.current_attack_index = action_index;

  const player = state.turn === state.userIsPlayer ? "player" : "enemy";
  const enemy = player === "player" ? "enemy" : "player";

  const action = state[player].actions[action_index];

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
  state[enemy].health -= enemy_damage;
  state[player].health -= self_damage;

  // Wait 2s before next turn (assume it's an animation or idk).
  await wait(2000);

  // Switch turns.
  state.turn = state.turn === 1 ? 2 : 1;
  state.current_attack_index = null;

  // Process next turn.
  processNextTurn();
};

/**
 * Checks if someone has `health` <= 0`.
 *
 * When the turn is `enemy`, run `playTurn` directly.
 * When the turn is `player`, we need to wait for the player to choose an action.
 */
const processNextTurn = async () => {
  if (!state.loaded) return;

  if (state.player.health <= 0) {
    state.winner = "enemy";
    alert("Enemy won :(");
    return;
  } else if (state.enemy.health <= 0) {
    state.winner = "player";
    alert("You won!");
    return;
  }

  // If the enemy is a bot, play the turn.
  if (state.turn !== state.userIsPlayer && state.enemyIsBot) {
    await wait(750);
    playTurn();
  }
};
</script>
