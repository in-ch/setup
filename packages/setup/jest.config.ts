/* eslint-disable @typescript-eslint/no-require-imports */
const jestConfig = require('../../jest.config.ts');

module.exports = {
  ...jestConfig,
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/lib/$1',
    '^const/(.*)$': '<rootDir>/const/$1',
    '^commands/(.*)$': '<rootDir>/commands/$1',
  },
};
