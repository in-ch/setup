import { Command } from 'commander';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { commandFuc, CommandsTypes, filteredCommandChoices } from 'src/const/commands.ts';
import { checkbox } from '@inquirer/prompts';

export const initCli = new Command()
  .command('init')
  .description('Easy Setup various configs')
  .action(async () => {
    await versionCheckAndUpdate();

    const results: CommandsTypes[] = await checkbox({
      message: 'Which files do you want to install?\n',
      choices: filteredCommandChoices,
    });
    for (const result of results) {
      if (commandFuc[result] !== undefined) {
        await commandFuc[result]();
      }
    }
  });
