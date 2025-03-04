import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsParser from "@typescript-eslint/parser";
import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends("plugin:prettier/recommended"), {
  plugins: {
    "simple-import-sort": simpleImportSort,
  },

  languageOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },

  rules: {
    "no-var": "error",

    eqeqeq: ["error", "always", {
      null: "ignore",
    }],

    "no-constant-binary-expression": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-sequences": "error",
  },
}, ...compat.extends().map(config => ({
  ...config,
  files: ["**/*.json"],
})), {
  files: ["**/*.json"],

  languageOptions: {
    parser: tsParser,
  },

  rules: {},
}, ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended").map(config => ({
  ...config,
  files: ["**/*.mjs"],
})), {
  files: ["**/*.mjs"],

  languageOptions: {
    parser: tsParser,
  },
}, ...compat.extends(
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-type-checked",
  "plugin:prettier/recommended",
).map(config => ({
  ...config,
  files: ["**/*.ts", "**/*.tsx"],
})), {
  files: ["**/*.ts", "**/*.tsx"],

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 5,
    sourceType: "script",

    parserOptions: {
      project: true,
    },
  },

  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
  },
}, ...fixupConfigRules(
  compat.extends("plugin:react/recommended", "plugin:react-hooks/recommended"),
).map(config => ({
  ...config,
  files: ["**/*.tsx"],
})), {
  files: ["**/*.test.ts", "**/*.test.tsx"],

  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
  },
}];
