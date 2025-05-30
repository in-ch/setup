#!/usr/bin/env node
import { Command } from 'commander';
import { existsSync } from 'fs';
import { createConfigHusky, installDependencies, updatePackageJson } from 'lib/husky-config.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { confirm } from '@inquirer/prompts';

export const huskyCli = new Command()
  .command('husky')
  .alias('hk')
  .description('Setup husky')
  .action(async () => husky());

export const husky = async () => {
  await versionCheckAndUpdate();

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
  await updatePackageJson();
};
