import { Command } from 'commander';
import { doAnalysis, installDependencies } from 'lib/lighthouse-config.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';

export const lighthouseCli = new Command()
  .command('lg')
  .description('Run a Lighthouse test')
  .option('--headless', 'Run Lighthouse in headless mode')
  .action(async cmd => lighthouse(cmd.headless));

export const lighthouse = async (headless = false) => {
  await versionCheckAndUpdate();
  await installDependencies();
  await doAnalysis(headless);
};
