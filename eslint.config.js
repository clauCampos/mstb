import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['dist/**', '.config/**', 'tsconfig.json'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        jsxRuntime: 'automatic',
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': reactHooks,
      prettier,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      semi: ['error', 'never'],
      'no-undef': 'off',
      'no-use-before-define': 'error',
      'no-irregular-whitespace': 'error',
      'no-console': 'error',
      'no-empty': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      ...tseslint.configs['recommended'].rules,
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'react/self-closing-comp': 'error',
      'react/jsx-no-bind': [
        'warn',
        {
          allowFunctions: true,
          allowArrowFunctions: false,
          allowBind: false,
        },
      ],
    },
  },
  ...tseslint.configs.recommended,
  js.configs.recommended,

  {
    files: ['types/**/*.ts', 'types/**/*.d.ts'],
    languageOptions: {
      ecmaFeatures: { jsx: false },
    },
    rules: {
      'no-undef': 'off',
    },
  },
])
