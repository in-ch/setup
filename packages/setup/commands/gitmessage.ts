#!/usr/bin/env node
import { Command } from 'commander';
import { existsSync } from 'fs';
import { createConfigFiles, initializeGit } from 'lib/gitmessage-config.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { confirm } from '@inquirer/prompts';

export const gitmessageCli = new Command()
  .command('gitmessage')
  .alias('gm')
  .description('Setup git message file')
  .action(async () => gitmessage());
export const gitmessage = async () => {
  await versionCheckAndUpdate();

  const isInitGit = existsSync('.git');
  if (!isInitGit) {
    const isOkInitGit = await confirm({
      message: 'Git is not initialized. Would you like to initialize it?',
    });
    if (!isOkInitGit) {
      console.log('canceled!');
      return;
    }
    await initializeGit();
  }
  createConfigFiles();
};
