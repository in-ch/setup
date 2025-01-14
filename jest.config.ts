const config = {
  preset: 'ts-jest',
  testMatch: ['**/*.test.[jt]s?(x)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
};

module.exports = config;
