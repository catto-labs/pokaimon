<template>
  <div class="flex flex-col space-y-2">
    <label class="text-lg text-note">{{ props.label }}</label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="modelValue"
      :pattern="pattern"
      :maxlength="maxlength"
      :minlength="minlength"
      @input="updateValue"
      class="w-full rounded-2xl border-2 border-grey-700 bg-grey-900 py-2 px-4 text-body outline-none transition placeholder:text-grey-600 hover:bg-opacity-80 focus:border-grey-500 focus:bg-opacity-80"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string;
  label: string;
  modelValue?: string;
  placeholder?: string;
  pattern?: string;
  maxlength?: string;
  minlength?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
