import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { presetUno } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return {
    plugins: [vue(), Unocss({ presets: [presetUno(), presetScrollbar()] })],
    server: {
      host: process.env.SERVER_HOST,
      port: Number(process.env.SERVER_PORT),
      hmr: {
        clientPort: 443,
      },
    },
  };
});
