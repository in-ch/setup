import { Command } from 'commander';
import { commandChoices, commandFuc, CommandsTypes } from 'const/commands.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { checkbox } from '@inquirer/prompts';

export const initCli = new Command()
  .command('init')
  .description('Easy Setup various configs')
  .action(async () => {
    await versionCheckAndUpdate();

    const results: CommandsTypes[] = await checkbox({
      message: 'Which files do you want to install?\n',
      choices: commandChoices,
    });
    for (const result of results) {
      if (commandFuc[result] !== undefined) {
        await commandFuc[result]();
      }
    }
  });
