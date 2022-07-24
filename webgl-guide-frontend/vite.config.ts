import vue from "@vitejs/plugin-vue";
import { presetUno } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";
import Unocss from "unocss/vite";
import { defineConfig, loadEnv } from "vite";

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
