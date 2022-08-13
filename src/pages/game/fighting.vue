<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <div class="mb-4 w-full max-w-6xl rounded-xl bg-black p-8">
      <div
        class="flex items-end justify-between rounded-lg bg-grey-700 px-4 pt-8 pb-0"
      >
        <div class="ml-8 flex flex-row items-end">
          <img src="https://i.imgur.com/NxUiA4N.png" class="aspect-auto h-56" />
        </div>
        <div class="mr-8">
          <img src="https://i.imgur.com/RMUyb2Q.png" class="aspect-auto h-56" />
        </div>
      </div>

      <hr class="my-4 text-grey-700" />
      <div class="grid grid-cols-2 gap-8">
        <div>
          <h2 class="mb-4 text-xl font-bold">What will Kuki Shinobu do?</h2>
          <div class="grid grid-cols-2 grid-rows-2 gap-4">
            <button
              class="rounded-lg bg-grey-700 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
            >
              action
            </button>
            <button
              class="rounded-lg bg-grey-700 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
            >
              action
            </button>
            <button
              class="rounded-lg bg-grey-700 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
            >
              action
            </button>
            <button
              class="rounded-lg bg-grey-700 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-grey-600"
            >
              action
            </button>
          </div>
        </div>

        <div class="flex gap-8">
          <div
            class="mb-8 flex h-full w-64 flex-col space-y-2 rounded-lg bg-grey-700 p-4"
          >
            <div class="flex flex-row justify-between space-x-16">
              <strong>Kuki Shinobu</strong>
              <p>Lv. 84</p>
            </div>
            <div class="rounded-full bg-grey-600 p-2"></div>
            <span class="text-right">22,102/23,501 HP</span>
          </div>
          <div
            class="mb-8 flex h-full w-64 flex-col space-y-2 rounded-lg bg-grey-700 p-4"
          >
            <div class="flex flex-row justify-between space-x-16">
              <strong>Yelan</strong>
              <p>Lv. 79</p>
            </div>
            <div class="rounded-full bg-grey-600 p-2"></div>
            <span class="text-right">26,188/28,194 HP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
