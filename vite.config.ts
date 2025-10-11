import { sentryVitePlugin } from "@sentry/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), sentryVitePlugin({
    org: "daniel-serna",
    project: "javascript-react"
  })],

  server: {
    port: 3000
  },

  build: {
    sourcemap: true
  }
});