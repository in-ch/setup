#!/usr/bin/env node
import { Command } from 'commander';
import { doAnalysis, installDependencies } from 'lib/lighthouse-config.ts';

export const lighthouseCli = new Command()
  .command('lg')
  .description('Run a Lighthouse test')
  .action(async () => lighthouse());
export const lighthouse = async () => {
  await installDependencies();
  await doAnalysis();
};
