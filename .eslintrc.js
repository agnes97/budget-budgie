'use strict'

module.exports = {
  extends: [
    '@strv/react',
    '@strv/react/optional',
    '@strv/typescript',
    'prettier',
  ],

  parserOptions: {
    project: './tsconfig.json',
  },

  rules: {
    'no-console': ['warn', { allow: ['error'] }],
  },
}
