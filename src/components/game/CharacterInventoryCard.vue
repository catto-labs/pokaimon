<template>
  <div
    class="flex w-32 flex-col items-center justify-end rounded-md bg-grey-700"
  >
    <img
      :src="`https://flkaastenubusimwykpj.supabase.co/storage/v1/object/public/character-images/heads/${props.character_name.toLowerCase()}.png`"
      class="h-fit"
    />
    <span class="my-2 font-bold text-white">{{ props.character_name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  character_id: number;
  character_name: string;
  bound_character_id: number;
}>();
</script>
