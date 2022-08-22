<template>
  <div
    class="flex cursor-pointer flex-col"
    :tabindex="character_id"
    @click="emitCharacterEquip()"
  >
    <div
      class="flex w-32 flex-col items-center justify-end rounded-md bg-grey-700"
      :class="{
        'border-2 border-brand-main': character_id === bound_character_id,
      }"
    >
      <img
        :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${props.character_name.toLowerCase()}.png`"
        class="h-fit rounded-t-md bg-grey-600"
      />
      <span class="my-2 font-bold text-white">{{ props.character_name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  character_id: number;
  character_name: string;
  bound_character_id: number;
}>();

const emits = defineEmits(["equipCharacter"]);

const emitCharacterEquip = () => {
  // We don't need to equip a character already equiped.
  if (props.character_id === props.bound_character_id) return;

  emits("equipCharacter", props.character_id);
};
</script>
