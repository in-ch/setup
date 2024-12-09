import { Command } from 'commander';
import { editCli } from 'commands/edit.ts';
import { eslintCli } from 'commands/eslint.ts';
import { initCli } from 'commands/init.ts';
import { listCli } from 'commands/list.ts';
import { prettierCli } from 'commands/prettier.ts';
import { getPackageInfo } from 'lib/get-package-info.ts';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();
  const program = new Command()
    .name('@in-ch/setup')
    .description("Quick config: Download and apply settings in seconds.")
    .version(`@in-ch/setup v${packageInfo.version || '1.0.0'}`, '-v, --version', 'display the version number');
  program.addCommand(listCli);
  program.addCommand(initCli);
  program.addCommand(eslintCli);
  program.addCommand(prettierCli);
  program.addCommand(editCli);
  program.parse();
}

main();
