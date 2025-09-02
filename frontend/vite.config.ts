/// <reference types="vitest" />
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    reactRouter(), 
    tailwindcss()
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@features": path.resolve(__dirname, "features"),
      "@assets": path.resolve(__dirname, "assets"),
      "@app": path.resolve(__dirname, "app"),
      "@shared": path.resolve(__dirname, "shared"),
      "@lib": path.resolve(__dirname, "lib"),
    },
  },
  test: {
  globals: true,
  environment: "jsdom"
},
});
