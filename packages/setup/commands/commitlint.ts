#!/usr/bin/env node
import { Command } from 'commander';
import { husky } from 'commands/husky.ts';
import { existsSync } from 'fs';
import { createConfigFiles, installDependencies } from 'lib/commit-lint-config.ts';
import { confirm } from '@inquirer/prompts';

export const commitlintCli = new Command()
  .command('commitlint')
  .description('Setup commit lint')
  .action(async () => commitLint());
export const commitLint = async () => {
  const isInitHusky = existsSync('.husky');
  if (!isInitHusky) {
    const isInitHusky = await confirm({
      message: 'Husky is not initialized. Would you like to initialize it?',
    });
    if (!isInitHusky) {
      console.log('canceled!');
      return;
    }
    await husky();
  }
  installDependencies();
  createConfigFiles();
};
