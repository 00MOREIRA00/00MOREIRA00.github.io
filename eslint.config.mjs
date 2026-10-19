import js from '@eslint/js';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default defineConfig(
  {ignores: ['node_modules/**', 'build/**', '.docusaurus/**', '.cache-loader/**']},
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {globals: {...globals.browser, ...globals.node}},
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {'react-hooks': reactHooks},
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['**/*.{cjs,mjs}'],
    rules: {'@typescript-eslint/no-require-imports': 'off'},
  },
);
