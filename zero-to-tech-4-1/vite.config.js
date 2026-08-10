import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "text-lab": resolve(__dirname, "text-lab.html"),
      },
    },
  },
});
