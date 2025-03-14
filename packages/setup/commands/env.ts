#!/usr/bin/env node
import { Command } from 'commander';
import fs, { existsSync } from 'fs';
import versionCheckAndUpdate from 'lib/version-update.js';
import path from 'path';

export const envCli = new Command()
  .command('env')
  .description('create .env file')
  .action(async () => {
    await versionCheckAndUpdate();

    const envConfigFile = ['.env'];
    const existingEnv: string[] = envConfigFile.filter(file => existsSync(file));

    if (existingEnv.length > 0) {
      console.log('At least one env file exists.');
    } else {
      try {
        const rootDir = process.cwd();
        fs.writeFileSync(path.join(rootDir, '.env'), '', 'utf-8');
        console.log('Created .env file successfully');
      } catch (e) {
        console.error('🥲 Failed to create env file');
      }
    }
  });
