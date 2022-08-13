import { defineConfig } from "vite";
import path from "path";

import vue from "@vitejs/plugin-vue";
import routes from "vite-plugin-pages";
import icons from "unplugin-icons/vite";
import { VitePWA as pwa } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    icons({ compiler: "vue3" }),
    routes({ pagesDir: path.resolve(__dirname, "src/pages") }),

    pwa({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,woff,woff2,html,ico,png,svg}"],
      },

      includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon.png"],

      manifest: {
        name: "Pokaimon",
        short_name: "Pokaimon",
        description:
          "Pokaimon is a Genshin Impact themed collectible game with mechanics similar to Pokemon.",

        background_color: "#111827",
        theme_color: "#111827",

        categories: ["games"],

        icons: [
          {
            src: "icons/pwa/pwa-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/pwa/pwa-icon-large.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/pwa/pwa-icon-maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/pwa/pwa-icon-maskable-large.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
