<template>
  <a
    :href="props.href"
    class="m-0 block w-full py-2 transition duration-300 ease-in-out hover:text-brand-second md:w-auto md:py-0"
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
