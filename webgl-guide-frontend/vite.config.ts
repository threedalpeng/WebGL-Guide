import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";

export default defineConfig({
  plugins: [vue(), Unocss()],
  server: {
    host: "0.0.0.0",
    port: 5003,
  },
});
