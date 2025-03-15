#!/usr/bin/env node
import { Command } from 'commander';
import fs, { existsSync } from 'fs';
import versionCheckAndUpdate from 'lib/version-update.js';
import path from 'path';
import { confirm, input } from '@inquirer/prompts';

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
        const envFilePath = path.join(rootDir, '.env');

        fs.writeFileSync(envFilePath, '', 'utf-8');
        console.log('Created .env file successfully');

        const addKeyValuePair = async () => {
          const response = await confirm({
            message: 'Would you like to add a key to the .env file?',
          });

          if (response) {
            const key = await input({
              message: 'Enter the key:',
              default: '',
            });

            const value = await input({
              message: 'Enter the value:',
              default: '',
            });

            const envContent = `${key}=${value}\n`;
            fs.appendFileSync(envFilePath, envContent, 'utf-8');
            console.log(`Added ${key}=${value} to .env`);

            addKeyValuePair();
          } else {
            console.log('Finished adding key-value pairs.');
          }
        };
        addKeyValuePair();
      } catch (e) {
        console.error('🥲 Failed to create env file');
      }
    }
  });
