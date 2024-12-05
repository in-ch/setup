#!/usr/bin/env node

import { Command } from 'commander';
import { confirm } from '@inquirer/prompts';
import { existsSync } from 'fs';

import { createConfigFiles, installDependencies } from 'lib/prettier-config.ts';

export const prettierCli = new Command()
  .command('prettier')
  .description('Setting prettier file')
  .action(async () => prettier());
export const prettier = async () => {
  const prettierConfigFiles = [
    '.prettierrc',
    '.prettierrc.json',
    '.prettierrc.yml',
    '.prettierrc.yaml',
    '.prettierrc.js',
    '.prettierrc.cjs',
    'prettier.config.js',
    'prettier.config.cjs',
  ];
  const existingConfigs = prettierConfigFiles.filter((file) => existsSync(file));
  if (existingConfigs.length > 0) {
    const overwrite = await confirm({
      message: 'At least one Prettier file exists. Do you still want to proceed with the setup?',
    });
    if (!overwrite) {
      console.log('canceled!');
      return;
    }
  }
  installDependencies();
  createConfigFiles();
};
