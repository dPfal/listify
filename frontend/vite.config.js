import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://3.27.34.75:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
