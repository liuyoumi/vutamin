import {resolve} from "path";

import {defineConfig} from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJSX from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {viteMockServe} from "vite-plugin-mock";
import {TDesignResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(process.cwd(), "src"),
      },
    ],
  },
  plugins: [
    Vue(),
    VueJSX(),
    UnoCSS(),
    AutoImport({
      imports: [
        "vue",
        "pinia",
        "vue-router",
        {
          "validator/es": [
            ["default", "validator"],
          ],
        },
      ],
      resolvers: [TDesignResolver({
        library: "vue-next",
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: "vue-next",
      })],
    }),
    viteMockServe({
      enable: true,
      mockPath: "mock",
    }),
  ],
});
