import {defineConfig} from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {TDesignResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
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
