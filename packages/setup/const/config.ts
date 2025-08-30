/**
 * ESlint Config Type
 */
export const ESLINT_CONFIG_TYPES = {
  IMPORT_SORT: 'import-sort',
  AIRBNB: 'airbnb',
  GOOGLE: 'google',
  XO: 'xo',
} as const;

export type EslintConfigType = typeof ESLINT_CONFIG_TYPES[keyof typeof ESLINT_CONFIG_TYPES];

/**
 * ESLint Config Type Choices
 */
export const eslintConfigTypeChoices = [
  { name: 'Import Sort', value: ESLINT_CONFIG_TYPES.IMPORT_SORT },
  { name: 'Airbnb', value: ESLINT_CONFIG_TYPES.AIRBNB },
  { name: 'Google', value: ESLINT_CONFIG_TYPES.GOOGLE },
  { name: 'XO', value: ESLINT_CONFIG_TYPES.XO },
];

/**
 * File Extension Mapping
 */
export const FILE_EXTENSIONS = {
  eslint: '.js',
  prettier: '.js',
  typescript: '.json',
  gitmessage: '.txt',
  commitlint: '.json',
  lintstage: '.json',
  airbnb: '.js',
  google: '.js',
  xo: '.js',
} as const;

/**
 * ESLint Config File List
 */
export const ESLINT_CONFIG_FILES = [
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.config.mjs',
  '.eslintrc',
] as const;
