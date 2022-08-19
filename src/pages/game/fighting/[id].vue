<template>
  <div
    v-if="state.loaded && !state.winner"
    class="flex h-screen w-screen flex-col items-center justify-center bg-black md:bg-grey-900"
  >
    <div class="mb-4 w-full rounded-xl bg-black p-8 md:h-fit md:max-w-6xl">
      <div
        class="flex items-end justify-between rounded-lg bg-grey-700 pt-8 pb-0 md:px-4"
      >
        <div class="flex flex-row items-end md:ml-8">
          <img
            :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/bodies/${state.player.name.toLowerCase()}.png`"
            class="aspect-auto scale-x-[-1] md:h-56"
          />
        </div>
        <div class="md:mr-8">
          <img
            :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/bodies/${state.enemy.name.toLowerCase()}.png`"
            class="aspect-auto md:h-56"
          />
        </div>
      </div>

      <hr class="my-4 text-grey-700" />
      <div class="grid gap-8 md:grid-cols-2">
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
              :disabled="state.sendingToServer"
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

        <div class="gap-8 md:flex">
          <div
            class="mb-8 flex w-full flex-col space-y-2 rounded-lg bg-grey-700 p-4 md:h-full md:w-64"
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
            class="mb-8 flex w-full flex-col space-y-2 rounded-lg bg-grey-700 p-4 md:h-full md:w-64"
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
    v-else-if="state.loaded && state.winner"
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div v-if="state.winner === state.userIsPlayer">
      <h2 class="text-xl font-bold text-head">You won this fight!</h2>

      <div>
        <p>
          Gained +{{ state.rewards.user_xp }}XP and +{{
            state.rewards.card_xp
          }}XP for {{ state.player.name }} !
        </p>
        <p>Gained +{{ state.rewards.primos }} primogens !</p>
        <p v-if="state.rewards.character_name">
          Gained {{ state.rewards.character_name }} ! Go check your inventory.
        </p>
      </div>
    </div>
    <h2 class="text-xl font-bold text-head" v-else-if="state.winner === 3">
      This fight resulted in a tie!
    </h2>
    <h2 class="text-xl font-bold text-head" v-else>You lost this fight</h2>

    <router-link
      to="/game"
      class="mt-6 rounded-xl bg-brand-main px-4 py-1 hover:text-head hover:no-underline"
    >
      Go back to map
    </router-link>
  </div>

  <div
    v-else-if="!state.loaded"
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <h2>Gathering fight informations...</h2>
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
import type { GamesTable } from "@/types/Database";
import type { Character } from "@/types/Character";

import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  getGame,
  getCharacterInfo,
  getFromInventoryCharacter,
  supabase,
} from "@/utils/supabase";

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
      sendingToServer: boolean;

      turn: GamesTable["turn"];
      winner: GamesTable["winner"];
      game_id: GamesTable["id"];
      /** `null` when no selected. Goes from `1` to `4` (in DB: `action_{index}`). */
      current_attack_index: GamesTable["action_index"];

      userIsPlayer: 1 | 2;

      player: Character;
      enemy: Character;

      rewards: GamesTable["rewards"];
    }
>({
  loaded: false,
});

onMounted(async () => {
  const user_session = store.authSession?.user;

  if (!props.id || !user_session) {
    router.push("/game");
    return;
  }

  const game_id = parseInt(props.id);

  // Get global informations about the game.
  const { data: game_data, error: game_error } = await getGame(game_id);

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
    health: userIsPlayer === 1 ? game_data.player1_hp : game_data.player2_hp,
  };
  const enemy_received_data = {
    id: userIsPlayer === 1 ? game_data.player2 : game_data.player1,
    card: userIsPlayer === 1 ? game_data.player2_card : game_data.player1_card,
    health: userIsPlayer === 1 ? game_data.player2_hp : game_data.player1_hp,
  };

  if (!player_received_data || !enemy_received_data) {
    router.push("/game");
    return;
  }

  // Get the player's informations.
  const { data: player_card, error: player_card_error } =
    await getFromInventoryCharacter(player_received_data.card);

  if (!player_card || player_card_error) {
    alert("Couldn't get data on current player. Confirm to reload page.");
    window.location.reload();
    return;
  }

  // Build the player's fight data.
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

    if (!enemy_card || enemy_card_error) {
      alert("An error occurred. Refreshing...");
      router.push("/game");
      return;
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

    if (!enemy_card || enemy_card_error) {
      alert("An error occurred. Refreshing...");
      router.push("/game");
      return;
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

  Object.assign(state, {
    loaded: true,
    turn: game_data.turn,
    sendingToServer: false,
    winner: game_data.winner || null,
    game_id,
    current_attack_index:
      typeof game_data.action_index === "undefined"
        ? null
        : game_data.action_index,
    player,
    enemy,

    userIsPlayer,
    enemyIsBot: !enemy_received_data.id,
    rewards: game_data.rewards,
  });

  // Listen to table changes.
  supabase
    .channel(`public:games:id=eq.${game_id}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "games",
        filter: `id=eq.${game_id}`,
      },
      (data: { new: GamesTable }) => {
        if (!state.loaded || state.winner) return;
        const table_new_data = data.new;

        Object.assign(state, {
          turn: table_new_data.turn,
          winner: table_new_data.winner,
          rewards: table_new_data.rewards,
          current_attack_index: table_new_data.action_index,
          player: {
            ...state.player,
            health:
              table_new_data[userIsPlayer === 1 ? "player1_hp" : "player2_hp"],
          },
          enemy: {
            ...state.enemy,
            health:
              table_new_data[userIsPlayer === 2 ? "player1_hp" : "player2_hp"],
          },
        });

        if (state.winner) {
          supabase.removeAllChannels();
        }
      }
    )
    .subscribe();
});

/** Submit your turn to the server. */
const playTurn = async (action_index: number) => {
  if (!state.loaded || state.winner) return;
  state.sendingToServer = true;

  await supabase.functions.invoke("submit-game-turn", {
    body: {
      game_id: state.game_id,
      action_index,
    },
  });

  state.sendingToServer = false;
};
</script>
