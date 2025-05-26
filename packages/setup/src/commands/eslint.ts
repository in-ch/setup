#!/usr/bin/env node
import { Command } from 'commander';
import { COMMANDS, eslintConfigTypeChoices, eslintConfigTypeChoicesValue } from 'src/const/commands.ts';
import { existsSync } from 'fs';
import {
  createConfigFiles,
  installAirbnbDependencies,
  installGoogleDependencies,
  installImportSortDependencies,
  installXODependencies,
} from 'lib/eslint-config.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { confirm, select } from '@inquirer/prompts';

export const eslintCli = new Command()
  .command('eslint')
  .alias('es')
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
    createConfigFiles(COMMANDS.AIRBNB);
  } else if (eslintConfigType === eslintConfigTypeChoicesValue.google) {
    console.log('Setting up Google ESLint configuration...');
    installGoogleDependencies();
    createConfigFiles(COMMANDS.GOOGLE);
  } else if (eslintConfigType === eslintConfigTypeChoicesValue.xo) {
    console.log('Setting up XO ESLint configuration...');
    installXODependencies();
    createConfigFiles(COMMANDS.XO);
  } else {
    console.log('Setting up Import Sort ESLint configuration...');
    installImportSortDependencies();
    createConfigFiles(COMMANDS.ESLINT);
  }
};
