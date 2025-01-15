const config = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/**/__tests__/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testEnvironment: 'jsdom',
};

module.exports = config;
