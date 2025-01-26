#!/usr/bin/env node
import { execSync } from 'child_process';
import { Command } from 'commander';
import { packageManagerChoices } from 'const/packagesMng.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { select } from '@inquirer/prompts';

export const pkgmngCli = new Command()
  .command('pm')
  .description('Initialize package manager')
  .action(async () => pkgmng());
export const pkgmng = async () => {
  await versionCheckAndUpdate();

  try {
    const answer = await select({
      message: 'Which package manager would you like to use? \n',
      choices: packageManagerChoices,
    });
    if (answer === 'cancel') {
      return;
    }
    execSync(`${answer} init`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to init package manager... to\n', error);
    process.exit(1);
  }
};
