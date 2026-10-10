const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-config-prettier');

/** ESLint 配置：typescript-eslint recommended + react / react-hooks */
module.exports = tseslint.config(
  { ignores: ['dist', 'node_modules', '**/*.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['client/**/*.{ts,tsx}', 'shared/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['*.config.js', '*.config.ts'],
    languageOptions: { globals: { ...globals.node } },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  prettier,
);
