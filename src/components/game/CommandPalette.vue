<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="props.close" class="relative z-50 overflow-y-auto">
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-100 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-grey-900 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="mt-[20vh] flex min-h-full justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel>
              <Combobox v-model="selected">
                <div class="relative w-[32rem]">
                  <div
                    class="relative w-full cursor-default overflow-hidden text-left"
                  >
                    <div
                      class="flex rounded-lg border border-grey-700 bg-black pl-4"
                    >
                      <IconSearch class="my-auto h-8 text-grey-400" />
                      <ComboboxInput
                        class="w-full rounded-lg bg-black p-4 leading-5 text-body ring-0 focus:outline-none"
                        placeholder="Tell me what you want to do..."
                        @change="query = $event.target.value"
                      />
                    </div>
                    <ComboboxButton
                      class="absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <SelectorIcon
                        class="h-5 w-5 text-grey-400"
                        aria-hidden="true"
                      />
                    </ComboboxButton>
                  </div>
                  <TransitionRoot
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    @after-leave="query = ''"
                  >
                    <ComboboxOptions
                      static
                      class="mt-4 max-h-64 w-full overflow-y-auto rounded-lg border border-grey-700 bg-black py-1 text-base shadow-lg focus:outline-none sm:text-sm"
                    >
                      <div
                        v-if="filtered.length === 0 && query !== ''"
                        class="relative cursor-default select-none py-2 px-4 text-center text-body"
                      >
                        No matching commands found!
                      </div>

                      <ComboboxOption
                        v-for="cmd in filtered"
                        as="template"
                        :key="cmd.id"
                        :value="cmd"
                        v-slot="{ active }"
                      >
                        <li
                          class="relative mx-2 my-1 flex cursor-default select-none justify-between rounded-md px-2 py-2 text-left transition"
                          :class="{
                            'bg-brand-main bg-opacity-75 text-body': active,
                            'text-body': !active,
                          }"
                        >
                          <h2 class="my-auto text-head">
                            {{ cmd.name }}
                          </h2>
                          <div class="my-auto flex gap-2">
                            <div
                              v-for="input in cmd.shortcut"
                              :key="input"
                              class="min-w-xs min-h-xs rounded-md border border-grey-700 p-1 transition"
                              :class="{
                                'border-grey-300': active,
                                'border-grey-700': !active,
                              }"
                            >
                              <p class="text-xs">{{ modifier(input) }}</p>
                            </div>
                          </div>
                        </li>
                      </ComboboxOption>
                    </ComboboxOptions>
                  </TransitionRoot>
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import IconSearch from "virtual:icons/mdi/search";

const props = defineProps<{
  open: boolean;
  close: () => unknown;
}>();

const commands = [
  { id: 1, name: "My profile", shortcut: ["1"] },
  { id: 2, name: "View inventory", shortcut: ["2"] },
  { id: 3, name: "Initiate a game against a bot", shortcut: ["3"] },
  { id: 4, name: "Open shop", shortcut: ["4"] },
  { id: 5, name: "Open command palette", shortcut: ["ctrl", "k"] },
];

const selected = ref(commands[0]);
const query = ref("");

const filtered = computed(() =>
  query.value === ""
    ? commands
    : commands.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const modifier = (str: string) => {
  const platform =
    navigator?.userAgentData?.platform || navigator.platform || "unknown";

  if (platform.match(/mac/i)) {
    return str.replace("ctrl", "cmd").replace("alt", "opt");
  }

  return str;
};
</script>
