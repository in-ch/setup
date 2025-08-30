#!/usr/bin/env node
import { Command } from 'commander';
import {  ESLINT_CONFIG_FILES } from 'const/config.ts';
import { setupEslintConfig } from 'lib/eslint-config.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { COMMANDS, eslintConfigTypeChoices } from 'src/const/commands.ts';
import { confirm, select } from '@inquirer/prompts';
import { fileExists } from 'lib/utils.ts';

export const eslintCli = new Command()
  .command('eslint')
  .alias('es')
  .description('Setup eslint file')
  .action(async () => eslint());

export const eslint = async () => {
  await versionCheckAndUpdate();

  const existingConfigs = ESLINT_CONFIG_FILES.filter(file => fileExists(file));
  
  if (existingConfigs.length > 0) {
    const overwrite = await confirm({
      message: 'At least one ESLint file exists. Do you still want to proceed with the setup?',
    });
    
    if (!overwrite) {
      console.log('canceled!');
      return;
    }
  }
  
  const eslintConfigType = await select({
    message: 'Choose an ESLint configuration type:',
    choices: eslintConfigTypeChoices,
  });

  const configTypeMap: Record<string, { type: string; command: string }> = {
    'airbnb': { type: 'airbnb', command: COMMANDS.AIRBNB },
    'google': { type: 'google', command: COMMANDS.GOOGLE },
    'xo': { type: 'xo', command: COMMANDS.XO },
  };

  const config = configTypeMap[eslintConfigType] || { type: 'import-sort', command: COMMANDS.ESLINT };
  
  console.log(`Setting up ${config.type} ESLint configuration...`);
  const success = await setupEslintConfig(config.type, config.command);
  
  if (!success) {
    console.error('❌ Failed to setup ESLint configuration');
    process.exit(1);
  }
};
