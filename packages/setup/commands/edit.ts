import { exec } from 'child_process';
import { Command } from 'commander';
import { commandChoices, CommandsTypes } from 'const/commands.ts';
import getOpenCommand from 'lib/get-open-command.ts';
import getSettingFilePath from 'lib/get-setting-file-path.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';
import { select } from '@inquirer/prompts';

export const editCli = new Command()
  .command('edit')
  .description('edit config file')
  .action(async () => {
    await versionCheckAndUpdate();

    const file: CommandsTypes = await select({
      message: 'What do you want to edit config file.',
      choices: commandChoices,
    });
    const path = getSettingFilePath(file);
    const command = getOpenCommand(path);
    exec(command, err => {
      if (err) {
        console.error('Failed to open file or folder:', err);
      } else {
        console.log(`Opened: ${path}`);
      }
    });
  });
