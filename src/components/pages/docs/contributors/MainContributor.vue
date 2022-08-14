<template>
  <div class="flex flex-col gap-y-2">
    <img
      :src="props.img"
      :id="props.name.toLowerCase()"
      class="mx-auto aspect-square h-32 w-32 rounded-full border-2 border-grey-700 bg-grey-800 outline-none transition hover:bg-opacity-80 focus:border-grey-500 focus:bg-opacity-80"
    />
    <span
      :for="props.name.toLowerCase()"
      class="text-center text-lg font-bold text-head"
      >{{ props.name }}</span
    >
    <span class="text-center text-sm">{{ props.role }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  img: string;
  name: string;
  role: string;
}>();
</script>
