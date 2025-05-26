import { Command } from 'commander';
import { commitlintCli } from 'src/commands/commitlint.ts';
import { editCli } from 'src/commands/edit.ts';
import { envCli } from 'src/commands/env.ts';
import { eslintCli } from 'src/commands/eslint.ts';
import { gitmessageCli } from 'src/commands/gitmessage.ts';
import { huskyCli } from 'src/commands/husky.ts';
import { initCli } from 'src/commands/init.ts';
import { latestCli } from 'src/commands/latest.ts';
import { lighthouseCli } from 'src/commands/lighthouse.ts';
import { listCli } from 'src/commands/list.ts';
import { pkgmngCli } from 'src/commands/pkgmng.ts';
import { prettierCli } from 'src/commands/prettier.ts';
import { typescriptCli } from 'src/commands/typescript.ts';
import { updateCli } from 'src/commands/update.ts';
import { vsCodeAutoPrefixCli } from 'src/commands/vscode-autoprefix.ts';
import checkPkgInit from 'lib/check-pkg-init.js';
import { getPackageInfo } from 'lib/get-package-info.ts';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const isPkginit = await checkPkgInit();
  if (isPkginit) {
    const packageInfo = await getPackageInfo();
    const program = new Command()
      .name('@in-ch/setup')
      .description('Quick config: Download and apply settings in seconds.')
      .version(`@in-ch/setup v${packageInfo.version || '1.0.0'}`, '-v, --version', 'display the version number');
    program.addCommand(listCli);
    program.addCommand(initCli);
    program.addCommand(eslintCli);
    program.addCommand(prettierCli);
    program.addCommand(editCli);
    program.addCommand(typescriptCli);
    program.addCommand(gitmessageCli);
    program.addCommand(huskyCli);
    program.addCommand(commitlintCli);
    program.addCommand(pkgmngCli);
    program.addCommand(lighthouseCli);
    program.addCommand(vsCodeAutoPrefixCli);
    program.addCommand(latestCli);
    program.addCommand(updateCli);
    program.addCommand(envCli);
    program.parse();
  } else {
    console.log('❌ No package manager initialized in this directory.');
    console.log('👉 Run "npm init", "yarn init", or "pnpm init" to set up a project.');
  }
}

main();

