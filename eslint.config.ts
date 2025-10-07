import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Override for TypeScript + React
  {
    files: ["**/*.{ts,tsx,jsx,js}"],
    rules: {
      "react/prop-types": "off", // disable prop-types for TS
      "react/react-in-jsx-scope": "off" // disable 'React must be in scope' warning,
    },
    settings: {
      react: {
        version: "detect" // automatically detect installed React version
      }
    }
  }
]);
