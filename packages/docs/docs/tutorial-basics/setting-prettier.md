---
sidebar_position: 1
---

# Setting Prettier

Generates an **Prettier** configuration file with simple commands.

```bash
ics prettier
```

Alternatively, you can set up **Prettier** along with other configurations using the following command:

```bash
ics init
```

## .prettierrc.cjs

```javascript
module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^vitest', '<THIRD_PARTY_MODULES>', '^@(.*)$', '^[.]/', '^[.]{2,}/'],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  overrides: [
    {
      files: 'src/**/index.ts',
      options: {
        plugins: [require.resolve('prettier-plugin-sort-re-exports')],
      },
    },
  ],
};
```
