#!/usr/bin/env node
import { Command } from 'commander';
import { eslintConfigTypeChoices, eslintConfigTypeChoicesValue } from 'const/commands.ts';
import { existsSync } from 'fs';
import {
  createAirbnbConfigFiles,
  createImportSortConfigFiles,
  installAirbnbDependencies,
  installImportSortDependencies,
} from 'lib/eslint-config.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { confirm, select } from '@inquirer/prompts';

export const eslintCli = new Command()
  .command('eslint')
  .description('Setup eslint file')
  .action(async () => eslint());
export const eslint = async () => {
  await versionCheckAndUpdate();

  const eslintConfigFiles = [
    '.eslintrc.js',
    '.eslintrc.json',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.config.mjs',
    '.eslintrc',
  ];
  const existingConfigs = eslintConfigFiles.filter(file => existsSync(file));
  if (existingConfigs.length > 0) {
    const overwrite = await confirm({
      message: 'At least one ESLint file exists. Do you still want to proceed with the setup?',
    });
    if (!overwrite) {
      console.log('canceled!');
      return;
    }
  }
  const eslintConfigType = await select({
    message: 'Choose an ESLint configuration type:',
    choices: eslintConfigTypeChoices,
  });

  if (eslintConfigType === eslintConfigTypeChoicesValue.airbnb) {
    console.log('Setting up Airbnb ESLint configuration...');
    installAirbnbDependencies();
    createAirbnbConfigFiles();
  } else {
    console.log('Setting up Import Sort ESLint configuration...');
    installImportSortDependencies();
    createImportSortConfigFiles();
  }
};
