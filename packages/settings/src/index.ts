import { Command } from 'commander';
import { getPackageInfo } from '../lib/get-package-info.ts';
import { listCli } from '../commands/list.ts';
import { eslintCli } from '../commands/eslint.ts';
import { prettierCli } from '../commands/prettier.ts';
import { initCli } from '../commands/init.ts';
import { editCli } from '../commands/edit.ts';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();
  const program = new Command()
    .name('@in-ch/settings')
    .description("Quickly download @in-ch/settings's various config files.")
    .version(
      `@in-ch/settings v${packageInfo.version || '1.0.0'}`,
      '-v, --version',
      'display the version number',
    );
  program.addCommand(listCli);
  program.addCommand(initCli);
  program.addCommand(eslintCli);
  program.addCommand(prettierCli);
  program.addCommand(editCli);
  program.parse();
}

main();
