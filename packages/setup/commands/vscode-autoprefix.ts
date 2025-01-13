import { Command } from 'commander';
import updateVscodeSetting from 'lib/update-vscode-setting.ts';

export const vsCodeAutoPrefixCli = new Command()
  .command('autoPrefix')
  .description('Update VSCode Auto Prefix Settings')
  .action(async () => updateVscodeSetting());
