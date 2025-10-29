import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    css: true,
    globals: true,
    coverage: {
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
    },
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
