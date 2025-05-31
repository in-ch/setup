/* eslint-disable @typescript-eslint/no-require-imports */
const jestConfig = require('../../jest.config.ts');

module.exports = {
  ...jestConfig,
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^const/(.*)$': '<rootDir>/src/const/$1',
    '^commands/(.*)$': '<rootDir>/src/commands/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
