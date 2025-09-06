#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import colorMap from 'lib/color-map.ts';
import tableMessage from 'lib/table-message.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { fileURLToPath } from 'url';

/**
 * @description This command will list all the tasks.
 */
export const listCli = new Command()
  .command('list')
  .description('list all commands')
  .action(async () => {
    await versionCheckAndUpdate();

    const isESM = typeof import.meta !== 'undefined';
    const filePath = isESM ? fileURLToPath(import.meta.url) : __filename;
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const commandDescriptionPattern = /command\("(.+?)"\)\.description\("(.+?)"\)/g;
    let match;
    const results: Array<{ command: string; description: string }> = [];
    while ((match = commandDescriptionPattern.exec(fileContent)) !== null) {
      const command = (match[1] as string).split('"')[0] as string;
      const description = match[2] as string;
      results.push({ command, description });
    }
    console.log(
      `${colorMap.orange}@in-ch/setup${colorMap.white}'s commands \n\n${tableMessage({
        data: results,
        borderColor: 'lightBlack',
        textColor: 'default',
        headerColor: 'orange',
      })}\n\n`
    );
  });
