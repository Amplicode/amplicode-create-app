import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const SERVER_URL = "http://localhost:8080";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const BASE_URL = process.env.VITE_SIMPLE_REST_URL ?? "/";

  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": process.env,
    },
    server: {
      proxy: {
        [BASE_URL]: SERVER_URL,
      },
    },
    base: "./",
  });
};