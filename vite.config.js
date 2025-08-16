import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 🔥 ye line zaroori hai static deploy ke liye
});
