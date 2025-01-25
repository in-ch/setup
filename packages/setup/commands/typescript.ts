#!/usr/bin/env node
import { Command } from 'commander';
import { existsSync } from 'fs';
import { createConfigFiles, installDependencies } from 'lib/typescript-config.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';

export const typescriptCli = new Command()
  .command('typescript')
  .description('Setup typescript file')
  .action(async () => typescript());
export const typescript = async () => {
  await versionCheckAndUpdate();
  
  const typescriptConfigFiles = ['.tsconfig.json'];
  const existingConfigs = typescriptConfigFiles.filter(file => existsSync(file));
  if (existingConfigs.length > 0) {
    console.error('At least one Typescript file exists.');
    return;
  }
  installDependencies();
  createConfigFiles();
};
