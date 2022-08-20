<template>
  <div
    class="flex cursor-pointer flex-col"
    @focus="showMenu = true"
    @focusout="focusOut"
    :tabindex="character_id"
  >
    <div
      class="flex w-32 flex-col items-center justify-end rounded-md bg-grey-700"
      :class="{
        'border-2 border-brand-main': character_id === bound_character_id,
      }"
    >
      <img
        :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${props.character_name.toLowerCase()}.png`"
        class="h-fit"
      />
      <span class="my-2 font-bold text-white">{{ props.character_name }}</span>
    </div>
    <div class="relative inline-block" v-if="showMenu">
      <div
        class="absolute z-10 inline-block w-full rounded-md bg-grey-700 bg-opacity-60 p-2 backdrop-blur-md"
      >
        <div class="flex flex-col gap-2">
          <button class="rounded-xl bg-brand-second p-1">Details</button>
          <button
            class="rounded-xl bg-brand-main p-1"
            v-if="character_id !== bound_character_id"
            @click="emitCharacterEquip()"
          >
            Equip
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { wait } from "@/utils/globals";

const props = defineProps<{
  character_id: number;
  character_name: string;
  bound_character_id: number;
}>();

const emits = defineEmits(["equipCharacter"]);

const showMenu = ref(false);

const emitCharacterEquip = () => {
  emits("equipCharacter", props.character_id);
};

const focusOut = async () => {
  await wait(100); // Small timeout to wait for clicks
  showMenu.value = false;
};
</script>
