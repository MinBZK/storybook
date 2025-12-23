import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
    rules: {
      // Code quality
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Style consistency
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'multi-line'],
      'no-throw-literal': 'error',

      // Web Components best practices
      'no-implicit-globals': 'error',
    },
  },
  {
    // Ignore patterns
    ignores: [
      'dist/**',
      'node_modules/**',
      'storybook-static/**',
      '.storybook/**',
      'scripts/**',
      '*.config.js',
      'style-dictionary.config.js',
    ],
  },
];
