/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    // Environment configuration for DOM testing
    environment: "jsdom",

    // Setup files for global configuration
    setupFiles: ["./src/test/setup.ts"],

    // Global test settings
    globals: true,

    // Coverage configuration with purpose-driven thresholds
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "src/db/database.types.ts",
        "src/middleware.ts",
        "next.config.ts",
        "postcss.config.mjs",
        "tailwind.config.js",
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },

    // Performance and reliability settings
    testTimeout: 10000,
    hookTimeout: 10000,

    // File patterns
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules/", "dist/", ".next/", "e2e/"],
  },

  // Path resolution for clean imports
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/lib": resolve(__dirname, "./src/lib"),
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/types": resolve(__dirname, "./src/types.ts"),
      "@/stores": resolve(__dirname, "./src/stores"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
    },
  },
});
