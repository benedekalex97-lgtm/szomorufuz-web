import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-strict'],
  {
    rules: {
      // Szándékos: Safari/VoiceOver list-style: none esetén elhagyja a lista szemantikát.
      'astro/jsx-a11y/no-redundant-roles': ['error', { ul: ['list'], ol: ['list'] }],
    },
  },
  {
    files: ['scripts/**/*.mjs', '*.config.*'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ['scripts/qa/**/*.mjs'],
    languageOptions: { globals: { ...globals.browser } },
  },
];
