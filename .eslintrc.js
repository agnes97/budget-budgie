'use strict'

/** @type {import("eslint").Linter.Config} */
module.exports = {
  // Specify enviroments for predefined global variables.
  env: {
    browser: true,
    node: true,
  },

  // Default settings for linting all files.
  extends: ['eslint:recommended'],
  reportUnusedDisableDirectives: true,

  overrides: [
    // Settings for linting all files in the ./src/ folder!
    {
      files: ['./src/**/*'],
      // Exclude due to unavoidable @typescript-eslint/triple-slash-reference!
      excludedFiles: ['react-app-env.d.ts'],
      extends: [
        'eslint:recommended',
        '@strv/react',
        '@strv/react/optional',
        '@strv/typescript',
      ],

      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        // Allow 'console.error', only show warning for 'console.log'.
        'no-console': ['warn', { allow: ['error'] }],
      },
    },
  ],
}
