<template>
  <div class="flex w-72 flex-col gap-y-1 rounded-xl border-2 border-black p-4">
    <div class="flex gap-x-2">
      <h2 class="text-lg font-bold text-head">{{ props.name }}</h2>
      <span class="my-auto text-sm" v-if="props.version">{{
        props.version
      }}</span>
    </div>
    <p class="my-auto">Licensed under {{ props.license }}.</p>
    <span class="my-auto">© {{ props.copyright }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  version?: string;
  license?: string;
  copyright: string;
}>();
</script>
