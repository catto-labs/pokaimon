<template>
  <div
    class="bg-gray-900 flex h-screen w-screen flex-col items-center justify-center"
  >
    <router-link
      to="/game"
      class="group absolute top-0 left-0 z-10 flex flex-row items-center gap-4 p-4 hover:no-underline"
    >
      <IconArrowLeft
        class="text-grey-400 transition-colors group-hover:text-brand-second"
      />
      <span class="transition-colors group-hover:text-brand-second">
        Go back
      </span>
    </router-link>
    <h1>Inventory</h1>
  </div>
</template>

<route>
{
  meta: {
    requiresAuth: true,
    checkForCompletedOnboarding: true
  }
}
</route>
