import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node, 
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"], 
    extends: [
      tseslint.configs.recommended, 
    ],
    languageOptions: {
      parser: tseslint.parser, 
      parserOptions: {
        project: "./tsconfig.json", 
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"], 
    rules: {
    },
  }
);