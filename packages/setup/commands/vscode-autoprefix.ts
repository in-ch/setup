import { Command } from 'commander';
import updateVscodeSetting from 'lib/update-vscode-setting.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';

export const vsCodeAutoPrefixCli = new Command()
  .command('autoPrefix')
  .alias('apf')
  .description('Update VSCode Auto Prefix Settings')
  .action(async () => {
    await versionCheckAndUpdate();
    updateVscodeSetting();
  });
