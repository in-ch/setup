#!/usr/bin/env node
import { Command } from 'commander';
import { existsSync } from 'fs';
import { createConfigHusky, installDependencies } from 'lib/husky-config.ts';
import { confirm } from '@inquirer/prompts';

export const huskyCli = new Command()
  .command('husky')
  .description('Setup husky')
  .action(async () => husky());

export const husky = async () => {
  const huskyConfigFiles = ['.husky'];
  const existingConfigs = huskyConfigFiles.filter(file => existsSync(file));
  if (existingConfigs.length > 0) {
    const overwrite = await confirm({
      message: 'Husky settings are already configured. Do you still want to proceed with the setup?',
    });
    if (!overwrite) {
      console.log('canceled!');
      return;
    }
  }
  await installDependencies();
  await createConfigHusky();
};
