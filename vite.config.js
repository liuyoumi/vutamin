import {resolve} from "path";

import {defineConfig} from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {TDesignResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
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
    AutoImport({
      resolvers: [TDesignResolver({
        library: "vue-next",
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: "vue-next",
      })],
    }),
  ],
});
