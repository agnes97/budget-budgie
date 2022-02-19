// .eslintrc.js

'use strict'


module.exports = {
    "parser": "@typescript-eslint/parser",

  extends: [
    '@strv/react',
    '@strv/react/optional',
    '@strv/react/style',
    '@strv/typescript',
    '@strv/typescript/style',
    '@strv/typescript/react',
  ],

  parserOptions: {
    // The project field is required in order for some TS-syntax-specific rules to function at all
    // @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    project: './tsconfig.json',
  },
}