---
sidebar_position: 2
---

# Setting Eslint

Generates an **ESLint** configuration file with simple commands.

<br />

# 🛠 Installation

To set up **eslint** in your project, follow these steps:

```bash
npm install @in-ch/setup -g
```

<br />

# 🚀 Usage

### Running the ESlint command

```bash
ics eslint
```

Alternatively, you can set up **ESLint** along with other configurations using the following command:

```bash
ics init
```

<br />

# Options

The ESLint configuration has four available options:

- `Import Sort`: Automatically sorts import statements according to a defined order. This helps to maintain a consistent import structure and improve code readability.

- `Airbnb`: Uses the widely adopted <a href="https://github.com/airbnb/javascript" target="_blank">Airbnb JavaScript style guide</a>, which enforces a highly opinionated and comprehensive set of rules for writing clean and maintainable JavaScript code.

- `Google`: Follows <a href="https://google.github.io/styleguide/jsguide.html" target="_blank">Google's JavaScript style guide</a>, focusing on simplicity and readability with a preference for readability and best practices in the JavaScript ecosystem.

- `XO`: A strict JavaScript linter that enforces a set of rules to ensure your code adheres to modern JavaScript standards. It comes with built-in support for ECMAScript modules, async/await, and more.

<br />

# Import Sort

Automatically sorts import statements according to a defined order. This helps to maintain a consistent import structure and improve code readability.

```javascript
import jsdoc from 'eslint-plugin-jsdoc';
import noForOfArrayPlugin from 'eslint-plugin-no-for-of-array';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: [
      '.yarn/**',
      'coverage/**',
      '**/dist/**',
      '**/cache/**',
      '.pnp.*',
      '**/*.d.ts',
      '**/*.tgz',
      'node_modules/**',
      '.env',
      '.env.*',
      '*.log',
      'logs/',
      'build/',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        ...globals['shared-node-browser'],
        ...globals.es2015,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  jsdoc.configs['flat/recommended'],
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.spec.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'no-for-of-array': noForOfArrayPlugin,
    },
    rules: {
      'no-for-of-array/no-for-of-array': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.object.name="Object"][callee.property.name="entries"]',
          message:
            'Do not use Object.entries for performance. Consider using alternatives like Object.keys() or Object.values().',
        },
      ],
    },
  },
  {
    rules: {
      'no-implicit-coercion': 'error',
      'no-warning-comments': [
        'warn',
        {
          terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
          location: 'anywhere',
        },
      ],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          selector: 'variable',
          leadingUnderscore: 'allow',
        },
        { format: ['camelCase', 'PascalCase'], selector: 'function' },
        { format: ['PascalCase'], selector: 'interface' },
        { format: ['PascalCase'], selector: 'typeAlias' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, caughtErrors: 'none' }],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'private-static-field',
            'public-instance-field',
            'private-instance-field',
            'public-constructor',
            'private-constructor',
            'public-instance-method',
            'private-instance-method',
          ],
        },
      ],
      'jsdoc/tag-lines': 'off',
      'jsdoc/no-defaults': 'off',
      'jsdoc/require-jsdoc': 'off',
      'vue/multi-word-component-names': 'off',
      'prefer-object-has-own': 'error',
    },
  },
];
```

<br />

# Airbnb

Uses the widely adopted <a href="https://github.com/airbnb/javascript" target="_blank">Airbnb JavaScript style guide</a>, which enforces a highly opinionated and comprehensive set of rules for writing clean and maintainable JavaScript code.

```javascript
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
});
```

<br />

# Google

Follows <a href="https://google.github.io/styleguide/jsguide.html" target="_blank">Google's JavaScript style guide</a>, focusing on simplicity and readability with a preference for readability and best practices in the JavaScript ecosystem.

```javascript
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
  },
});
```

<br />

# XO

A strict JavaScript linter that enforces a set of rules to ensure your code adheres to modern JavaScript standards. It comes with built-in support for ECMAScript modules, async/await, and more.

```javascript
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['xo'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
});
```
