import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginReactRecommended from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  eslintPluginReactRecommended.configs.flat.recommended,
  eslintPluginPrettierRecommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['.next/', 'node_modules/', 'coverage/'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: { globals: globals.browser },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },

  ...tseslint.configs.strict,
];
