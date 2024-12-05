import { Command } from 'commander';
import { checkbox } from '@inquirer/prompts';

import { CommandsTypes, commandFuc, commandChoices } from 'const/commands.ts';

export const initCli = new Command()
  .command('init')
  .description('Easy setting files')
  .action(async () => {
    const results: CommandsTypes[] = await checkbox({
      message: 'Which files do you want to install?',
      choices: commandChoices,
    });
    for (const result of results) {
      if(commandFuc[result] !== undefined) {
        await commandFuc[result]();
      }
    }
  });
