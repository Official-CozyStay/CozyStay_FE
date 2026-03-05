import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    // sockjs-client 등이 Node 스타일 global을 참조할 때 브라우저에서 쓰이도록
    global: "globalThis",
  },
});
