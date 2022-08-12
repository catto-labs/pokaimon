<script setup lang="ts">
const props = defineProps<{
  label: string;
  placeholder?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <label class="text-lg text-note">{{ props.label }}</label>
    <input
      class="w-full rounded-2xl border border-grey-700 bg-grey-900 py-1.5 px-4 text-grey-200 outline-none transition hover:bg-opacity-80 focus:border-grey-500 focus:bg-opacity-80"
      :placeholder="props.placeholder"
    />
  </div>
</template>
