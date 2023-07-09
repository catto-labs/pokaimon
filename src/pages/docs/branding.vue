<template>
  <div>
    <Navbar class="fixed top-0 z-50 w-full" />
    <main class="px-8 py-32">
      <div class="flex flex-col items-center justify-center text-center">
        <h1 class="mb-2 text-4xl font-bold text-head">Design & Branding</h1>
        <p class="max-w-xl text-center">
          The Pokaimon brand belongs to catto labs, the entity that guides and
          supports development of Pokaimon. These guidelines describe when and
          how the brand should be used.
        </p>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 max-w-xl text-center text-xl text-body">Brand Marks</h2>
        <p class="max-w-xl text-center">
          catto labs claims the
          <strong>"Pokaimon" logo-mark</strong>.
        </p>
        <h3 class="max-w-xl">
          They should be used with the following in mind:
        </h3>
        <ol class="max-w-xl list-disc">
          <li>
            Do not stretch, skew, rotate, flip, or otherwise alter the marks.
          </li>
          <li>
            Do not use the marks on an overly-busy background; solid colours or
            gradients work best.
          </li>
          <li>
            The marks should be monochromatic; e.g. white on a dark background
            or black on a light background.
          </li>
        </ol>
      </div>
      <div class="my-16 flex flex-col items-center justify-center space-y-32">
        <div class="flex flex-col items-center justify-center space-y-8">
          <div class="flex gap-16">
            <img src="@/assets/branding/vector/pokaimon.svg" class="h-64" />
            <div class="my-auto">
              <h4 class="text-xl font-bold">"Pokaimon" logo-mark</h4>
              <p class="max-w-[16rem]">
                This is the primary and only logo-mark for Pokaimon.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="my-16 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 max-w-xl text-center text-xl text-body">
          Colours and Palettes
        </h2>
        <p class="max-w-xl text-center">
          We employ the use of color combined with our name and marks to
          establish our brand. We use the following palette:
        </p>
        <div class="grid grid-cols-2 gap-4 text-white">
          <div class="w-64 rounded-xl bg-brand-main px-8 py-4">
            <h3 class="text-center font-bold">Primary Brand Colour</h3>
            <p class="text-center font-mono">#C084FC</p>
          </div>
          <div class="w-64 rounded-xl bg-brand-second px-8 py-4">
            <h3 class="text-center font-bold">Secondary Brand Colour</h3>
            <p class="text-center font-mono">#60A5FA</p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 text-white">
          <div class="w-64 rounded-xl bg-head px-8 py-4">
            <h3 class="text-center font-bold text-black">Text Headings</h3>
            <p class="text-center font-mono text-black">#F3F4F6</p>
          </div>
          <div class="w-64 rounded-xl bg-body px-8 py-4">
            <h3 class="text-center font-bold text-black">Main Bodies</h3>
            <p class="text-center font-mono text-black">#E5E7EB</p>
          </div>
          <div class="w-64 rounded-xl bg-note px-8 py-4">
            <h3 class="text-center font-bold text-black">
              Miscellaneous Notes
            </h3>
            <p class="text-center font-mono text-black">#9CA3AF</p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 text-white">
          <div class="w-64 rounded-xl bg-danger px-8 py-4">
            <h3 class="text-center font-bold text-black">Dangerous Action</h3>
            <p class="text-center font-mono text-black">#F87171</p>
          </div>
          <div class="w-64 rounded-xl bg-warn px-8 py-4">
            <h3 class="text-center font-bold text-black">Warning Message</h3>
            <p class="text-center font-mono text-black">#FDE047</p>
          </div>
          <div class="w-64 rounded-xl bg-success px-8 py-4">
            <h3 class="text-center font-bold text-black">Success Operation</h3>
            <p class="text-center font-mono text-black">#34D399</p>
          </div>
        </div>
        <p class="max-w-xl text-center">
          We also have a palette for set shades of grey:
        </p>
        <div class="grid grid-cols-5 gap-4 text-white">
          <div class="w-36 rounded-xl bg-grey-50 px-4 py-4">
            <h3 class="text-center font-bold text-black">Grey 50</h3>
            <p class="text-center font-mono text-black">#F9FAFB</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-100 px-4 py-4">
            <h3 class="text-center font-bold text-black">Grey 100</h3>
            <p class="text-center font-mono text-black">#F3F4F6</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-200 px-4 py-4">
            <h3 class="text-center font-bold text-black">Grey 200</h3>
            <p class="text-center font-mono text-black">#E5E7EB</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-300 px-4 py-4">
            <h3 class="text-center font-bold text-black">Grey 300</h3>
            <p class="text-center font-mono text-black">#D1D5DB</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-400 px-4 py-4">
            <h3 class="text-center font-bold text-black">Grey 400</h3>
            <p class="text-center font-mono text-black">#9CA3AF</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-500 px-4 py-4">
            <h3 class="text-center font-bold">Grey 500</h3>
            <p class="text-center font-mono">#6B7280</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-600 px-4 py-4">
            <h3 class="text-center font-bold">Grey 600</h3>
            <p class="text-center font-mono">#4B5563</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-700 px-4 py-4">
            <h3 class="text-center font-bold">Grey 700</h3>
            <p class="text-center font-mono">#374151</p>
          </div>
          <div class="w-36 rounded-xl bg-grey-800 px-4 py-4">
            <h3 class="text-center font-bold">Grey 800</h3>
            <p class="text-center font-mono">#1F2937</p>
          </div>
          <div
            class="w-36 rounded-xl border border-grey-800 bg-grey-900 px-4 py-4"
          >
            <h3 class="text-center font-bold">Grey 900</h3>
            <p class="text-center font-mono">#111827</p>
          </div>
        </div>
        <p class="max-w-xl text-center">
          For other, miscellaneous colours, we use this palette:
        </p>
        <div class="grid grid-cols-3 gap-4 text-white">
          <div class="w-64 rounded-xl bg-red px-8 py-4">
            <h3 class="text-center font-bold">"Flamingo Red"</h3>
            <p class="text-center font-mono">#EF4444</p>
          </div>
          <div class="w-64 rounded-xl bg-orange px-8 py-4">
            <h3 class="text-center font-bold">"Neon Carrot"</h3>
            <p class="text-center font-mono">#FB923C</p>
          </div>
          <div class="w-64 rounded-xl bg-yellow px-8 py-4">
            <h3 class="text-center font-bold">"Lightning Yellow"</h3>
            <p class="text-center font-mono">#FBBF24</p>
          </div>
          <div class="w-64 rounded-xl bg-green px-8 py-4">
            <h3 class="text-center font-bold">"Shamrock Green"</h3>
            <p class="text-center font-mono">#4ADE80</p>
          </div>
          <div class="w-64 rounded-xl bg-blue px-8 py-4">
            <h3 class="text-center font-bold">"Picton Blue"</h3>
            <p class="text-center font-mono">#38BDF8</p>
          </div>
          <div class="w-64 rounded-xl bg-purple px-8 py-4">
            <h3 class="text-center font-bold">"Floral Lavender"</h3>
            <p class="text-center font-mono">#A78BFA</p>
          </div>
          <div class="w-64 rounded-xl bg-fuchsia px-8 py-4">
            <h3 class="text-center font-bold">"Heliotrope Pink"</h3>
            <p class="text-center font-mono">#E879F9</p>
          </div>
          <div class="w-64 rounded-xl bg-pink px-8 py-4">
            <h3 class="text-center font-bold">"Persian Pink"</h3>
            <p class="text-center font-mono">#F472B6</p>
          </div>
          <div class="w-64 rounded-xl bg-rose px-8 py-4">
            <h3 class="text-center font-bold">"Brink Pink"</h3>
            <p class="text-center font-mono">#FB7185</p>
          </div>
        </div>
      </div>
      <div class="my-16 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 max-w-xl text-center text-xl text-body">Font Face</h2>
        <p class="max-w-xl text-center">
          For our user interfaces, we use <strong>Raleway</strong> for both
          headings and bodies. For code blocks, we use
          <strong>Roboto Mono</strong>.
        </p>
      </div>
      <div class="mt-16 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 max-w-xl text-center text-xl text-body">
          Assets and More Information
        </h2>
        <p class="max-w-xl text-center">
          For further information regarding the use of the Pokaimon or undefined
          labs name and branding, please contact
          <a href="mailto:hello@trobo.tech" class="text-brand-main"
            >hello@trobo.tech</a
          >.
        </p>
      </div>
    </main>
    <Footer class="bottom-0 w-full" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";
</script>
