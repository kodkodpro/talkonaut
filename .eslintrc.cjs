module.exports = {
  "root": true,

  "parser": "@typescript-eslint/parser",

  "plugins": [
    "unused-imports",
    "@typescript-eslint",
  ],

  "extends": [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],

  "rules": {
    "quotes": [
      "error",
      "double",
    ],
    "indent": [
      "error",
      2,
    ],
    "max-len": [
      "error",
      120,
    ],
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
    "arrow-parens": [
      "error",
      "always",
    ],
    "semi": [
      "error",
      "never",
    ],
    "object-curly-spacing": [
      "error",
      "always",
    ],
    "space-before-function-paren": [
      "error",
      {
        "asyncArrow": "always",
        "anonymous": "never",
        "named": "never",
      },
    ],
    "import/order": [
      "error",
      {
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
        "newlines-between": "never",
      },
    ],
    "unused-imports/no-unused-imports": "error",
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      "typescript": true,
      "node": true,
    }
  },
}
