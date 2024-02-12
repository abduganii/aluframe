import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./manifest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest,
    outDir: 'build',
  })],
  publicDir: 'public',
  build: {
    outDir: 'build'
  },
  server: {
    host: true,
    port: 3000, 
  },
});
