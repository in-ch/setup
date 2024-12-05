#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Command } from 'commander';
import fs from 'fs';
import { fileURLToPath } from 'url';

import fixedMessage from 'lib/fixed-message.ts';
import tableMessage from 'lib/table-message.ts';
import colorMap from 'lib/color-map.ts';

/**
 * @description This command will list all the tasks.
 */
export const listCli = new Command()
  .command('list')
  .description('list all commands')
  .action(async () => {
    const filePath = fileURLToPath(import.meta.url);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const commandDescriptionPattern = /command\("(.+?)"\)\.description\("(.+?)"\)/g;
    let match;
    const results: Array<{ command: any; description: any }> = [];
    while ((match = commandDescriptionPattern.exec(fileContent)) !== null) {
      const command = match[1];
      const description = match[2];
      results.push({ command, description });
    }
    fixedMessage({
      message: `${colorMap.orange}@in-ch/settings${colorMap.white}'s commands \n\n${tableMessage(
        {
          data: results,
          borderColor: 'lightBlack',
          textColor: 'default',
          headerColor: 'orange',
        },
      )}\nPress (ctrl + c) to exit.\n\n`,
    });
  });
