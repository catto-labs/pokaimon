<template>
  <a
    :href="props.href"
    class="m-0 block w-full py-2 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-10 hover:text-brand-second md:w-auto md:py-0 md:hover:bg-opacity-0"
  >
    <p class="mx-4 md:mx-0">{{ props.text }}</p>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string;
  text: string;
}>();
</script>
