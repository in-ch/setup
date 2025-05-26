#!/usr/bin/env node
import { execSync } from 'child_process';
import { Command } from 'commander';
import checkLatestPkgVersion from 'lib/check-latest-pkg-version.ts';
import { getPackageInfo } from 'lib/get-package-info.ts';
import { initializePackageManager } from 'lib/version-update.ts';

export const updateCli = new Command()
  .command('update')
  .description('Update package version')
  .action(async () => update());
export const update = async () => {
  await initializePackageManager();

  const latestVersion = await checkLatestPkgVersion('@in-ch/setup');
  const currentVersion = await getPackageInfo().version;

  if (currentVersion !== latestVersion) {
    execSync('npm install @in-ch/setup@latest -g', { stdio: 'inherit' });
  } else {
    console.log('@in-ch/setup package is already up to date.');
  }
};
