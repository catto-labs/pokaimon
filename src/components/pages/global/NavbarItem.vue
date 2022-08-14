<template>
  <a
    :href="props.href"
    class="m-0 mb-1 block w-full rounded-xl py-2 px-4 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-10 hover:text-brand-second hover:no-underline md:mb-0 md:w-auto md:py-0 md:hover:bg-opacity-0"
  >
    {{ props.text }}
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string;
  text: string;
}>();
</script>
