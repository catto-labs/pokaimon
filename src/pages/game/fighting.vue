<template>
  <div
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
          v-if="state.turn === 'player' && state.current_attack_index === null"
        >
          <h2 class="mb-4 text-xl font-bold">
            What will {{ state[state.turn].name }} do?
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
            state.turn === 'enemy' && state.current_attack_index === null
          "
        >
          <h2 class="mb-4 text-xl font-bold">
            {{ state.enemy.name }} is selecting an attack...
          </h2>
        </div>

        <div v-else-if="state.current_attack_index !== null">
          <h2 class="mb-4 text-xl font-bold">
            {{ state[state.turn].name }} will do
            <span class="text-brand-main">{{
              state[state.turn].actions[state.current_attack_index].name
            }}</span>
          </h2>
        </div>

        <div class="flex gap-8">
          <div
            class="mb-8 flex h-full w-64 flex-col space-y-2 rounded-lg bg-grey-700 p-4"
          >
            <div class="flex flex-row justify-between space-x-16">
              <strong>{{ state.player.name }}</strong>
              <p>Lv. {{ state.player.level }}</p>
            </div>
            <div class="rounded-full bg-grey-600 p-2"></div>
            <span class="text-right">
              {{ state.player.health }}/{{ state.player.maxHealth }} HP
            </span>
          </div>
          <div
            class="mb-8 flex h-full w-64 flex-col space-y-2 rounded-lg bg-grey-700 p-4"
          >
            <div class="flex flex-row justify-between space-x-16">
              <strong>{{ state.enemy.name }}</strong>
              <p>Lv. {{ state.enemy.level }}</p>
            </div>
            <div class="rounded-full bg-grey-600 p-2"></div>
            <span class="text-right">
              {{ state.enemy.health }}/{{ state.enemy.maxHealth }} HP
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types/Character";
import { reactive } from "vue";
import { wait, randomBetween } from "@/utils/globals";

const firstTurn = Math.random() > 0.5 ? "player" : "enemy";

const state = reactive<{
  turn: "player" | "enemy";
  winner: "player" | "enemy" | null;
  current_attack_index: number | null;

  player: Character;
  enemy: Character;
}>({
  turn: firstTurn,
  winner: null,
  current_attack_index: null,

  player: {
    name: "Kuki Shinobu",
    level: 84,
    health: 22102,
    maxHealth: 23501,

    actions: [
      {
        name: "put dat sword",
        enemyHitDamage: [30, 50],
        enemyHitChance: 0.9,
        selfHitDamage: [0, 10],
        selfHitChance: 0.1,
      },
      {
        name: "EPIC thing that hurts",
        enemyHitDamage: [100, 150],
        enemyHitChance: 0.7,
        selfHitDamage: [40, 100],
        selfHitChance: 0.5,
      },
      {
        name: "smol damage but sure to get it",
        enemyHitDamage: [5, 15],
        enemyHitChance: 1,
        selfHitDamage: [0, 10],
        selfHitChance: 0.1,
      },
      {
        name: "brbrbrbr",
        enemyHitDamage: [15, 90],
        enemyHitChance: 0.45,
        selfHitDamage: [0, 50],
        selfHitChance: 0.3,
      },
    ],
  },
  enemy: {
    name: "Yelan",
    level: 79,
    health: 26188,
    maxHealth: 28194,

    actions: [
      {
        name: "im a winx",
        enemyHitDamage: [70, 100],
        enemyHitChance: 0.9,
        selfHitDamage: [0, 10],
        selfHitChance: 0.1,
      },
      {
        name: "who asked ?",
        enemyHitDamage: [200, 300],
        enemyHitChance: 0.8,
        selfHitDamage: [40, 100],
        selfHitChance: 0.5,
      },
      {
        name: "smol pp attack",
        enemyHitDamage: [5, 15],
        enemyHitChance: 1,
        selfHitDamage: [0, 10],
        selfHitChance: 0.1,
      },
      {
        name: "basic attack yk",
        enemyHitDamage: [15, 90],
        enemyHitChance: 0.45,
        selfHitDamage: [0, 50],
        selfHitChance: 0.3,
      },
    ],
  },
});

/**
 * If we don't choose an action, it will select one for us.
 * @action - The action to perform (can choose between 4 actions, `0` to `3`).
 */
const playTurn = async (action_index?: number) => {
  if (typeof action_index === "undefined") {
    action_index = Math.floor(Math.random() * 4);
  }

  // Store the action index to say which action we will perform.
  state.current_attack_index = action_index;

  const player = state.turn;
  const enemy = player === "player" ? "enemy" : "player";

  const action = state[player].actions[action_index];

  // Perform the action.
  const enemy_hit = Math.random() < action.enemyHitChance;
  const self_hit = Math.random() < action.selfHitChance;
  const enemy_damage = enemy_hit
    ? randomBetween(action.enemyHitDamage[0], action.enemyHitDamage[1])
    : 0;
  const self_damage = self_hit
    ? randomBetween(action.selfHitDamage[0], action.selfHitDamage[1])
    : 0;

  // Update the health.
  state[enemy].health -= enemy_damage;
  state[player].health -= self_damage;

  // Wait 2s before next turn (assume it's an animation or idk).
  await wait(2000);

  // Switch turns.
  state.turn = player === "player" ? "enemy" : "player";
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
  if (state.player.health <= 0) {
    state.winner = "enemy";
    return;
  } else if (state.enemy.health <= 0) {
    state.winner = "player";
    return;
  }

  if (state.turn === "enemy") {
    await wait(750);
    playTurn();
  }
};

if (firstTurn === "enemy") {
  // Wait 2s before processing the first turn if it's enemy.
  wait(2000).then(processNextTurn);
}
</script>
