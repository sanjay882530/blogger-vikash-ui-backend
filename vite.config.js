import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://vikashblog.up.railway.app";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: VITE_BACKEND_URL,
        secure: false,
        changeOrigin: true,
      },
    },
  },

  plugins: [react()],
});
