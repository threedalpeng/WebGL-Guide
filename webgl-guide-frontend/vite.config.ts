import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { presetUno } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [vue(), Unocss({ presets: [presetUno(), presetScrollbar()] })],
    server: {
      host: env.SERVER_HOST,
      port: Number(env.SERVER_PORT),
      hmr: {
        clientPort: 443,
      },
    },
  };
});
