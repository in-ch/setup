#!/usr/bin/env node
import { Command } from 'commander';
import { existsSync } from 'fs';
import { createConfigFiles, installDependencies } from 'lib/eslint-config.ts';
import { confirm } from '@inquirer/prompts';

export const eslintCli = new Command()
  .command('eslint')
  .description('Setup eslint file')
  .action(async () => eslint());
export const eslint = async () => {
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
  installDependencies();
  createConfigFiles();
};
