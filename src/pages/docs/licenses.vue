<template>
  <div>
    <Navbar class="fixed top-0 z-50 w-full" />
    <main class="px-8 py-32">
      <div class="text-center">
        <h1 class="mb-2 text-4xl font-bold text-head">License Notices</h1>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 text-center text-xl text-body">
          Frameworks and Libraries
        </h2>
        <div class="grid gap-4 md:grid-cols-4">
          <License
            name="TypeScript"
            :version="pkg.devDependencies.typescript.slice(1, 10)"
            license="Apache 2.0"
            copyright="2012-2022 Microsoft"
          />
          <License
            name="Vue"
            :version="pkg.dependencies.vue.slice(1, 10)"
            license="MIT"
            copyright="2013-present, Yuxi (Evan) You"
          />
          <License
            name="Vue Router"
            :version="pkg.dependencies['vue-router'].slice(1, 10)"
            license="MIT"
            copyright="2013-present, Yuxi (Evan) You"
          />
          <License
            name="Supabase-JS"
            :version="pkg.dependencies['@supabase/supabase-js'].slice(1, 15)"
            license="MIT"
            copyright="2020 Supabase"
          />
          <License
            name="Tailwind CSS"
            :version="pkg.devDependencies.tailwindcss.slice(1, 10)"
            license="MIT"
            copyright="Tailwind Labs, Inc."
          />
          <License
            name="Autoprefixer"
            :version="pkg.devDependencies.autoprefixer.slice(1, 10)"
            license="MIT"
            copyright="2013 Andrey Sitnik"
          />
          <License
            name="PostCSS"
            :version="pkg.devDependencies.postcss.slice(1, 10)"
            license="MIT"
            copyright="2013 Andrey Sitnik"
          />
          <License
            name="Unplugin Icons"
            :version="pkg.devDependencies['unplugin-icons'].slice(1, 10)"
            license="MIT"
            copyright="2020 Anthony Fu"
          />
          <License
            name="Leaflet"
            :version="pkg.dependencies.leaflet.slice(1, 10)"
            license="BSD-2 Clause"
            copyright="2022 Vladimir Agafonkin"
          />
        </div>
      </div>
      <div class="mt-8 flex flex-col items-center justify-center space-y-4">
        <h2 class="mb-2 text-center text-xl text-body">Artwork and Assets</h2>
        <div class="grid gap-4 md:grid-cols-4">
          <License
            name="Font Awesome 6 - Brands"
            license="CC BY 4.0"
            copyright="Fonticons, Inc."
          />
          <License
            name="Material Design Icons"
            license="Apache 2.0"
            copyright="Google, Inc."
          />
          <License name="Flagpack" license="MIT" copyright="2021 Yummygum" />
          <License
            name="Genshin Character Designs"
            license="???"
            copyright="HoYoverse Pte. Ltd."
          />
        </div>
      </div>
    </main>
    <Footer class="bottom-0 w-full" />
  </div>
</template>

<script setup lang="ts">
import pkg from "../../../package.json";

import Navbar from "@/components/pages/global/Navbar.vue";
import Footer from "@/components/pages/global/Footer.vue";
import License from "@/components/pages/docs/licenses/License.vue";
</script>
