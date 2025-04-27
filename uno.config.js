import {defineConfig} from "unocss";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  theme: {
    colors: {
      primary: "var(--m-color-primary)",
    },
  },
  transformers: [
    transformerVariantGroup(),
  ],
});