import { defineConfig, presetUno } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig({
  presets: [presetUno(), presetScrollbar({})],
  theme: {
    colors: {
      primary: {},
    },
  },
});
