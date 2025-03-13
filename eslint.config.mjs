import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules",
      "public",
      ".next",
      "build",
      "package-lock.yaml",
      "pnpm-lock.yaml",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      /**
       * https://typescript-eslint.io/rules/consistent-type-imports
       */
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          pathGroups: [
            {
              pattern: "{next,next/**,react,react-dom}",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/libs/**/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/components/**/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/hooks/**/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/hoc/**/*",
              group: "internal",
              position: "after",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
