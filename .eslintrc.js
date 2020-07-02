module.exports = {
  root: true,

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    "react-native/react-native": true,
  },
  plugins: [
    "react",
    "react-native",
    "@typescript-eslint",
    "react-hooks",
    "sort-imports-es6-autofix",
    "unused-imports",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "sort-imports-es6-autofix/sort-imports-es6": [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": "warn",
    "react-native/no-raw-text": [2, { skip: ["StyledButton"] }],
    "react-native/no-color-literals": 2,
    "react-native/sort-styles": [
      "error",
      "asc",
      {
        ignoreClassNames: false,
        ignoreStyleProperties: false,
      },
    ],

    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "error",
    "unused-imports/no-unused-vars-ts": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
