import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/consistent-type-imports": "error",

      "no-console": "error",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",

      complexity: ["error", 8],
      "max-lines": ["error", 300],
      "max-statements": ["error", 20],
      "max-depth": ["error", 3],
      "max-params": ["error", 3],

      "react/jsx-no-useless-fragment": "error",
      "react/jsx-key": "error",
      "react/no-children-prop": "error",
    },
  },
]);
