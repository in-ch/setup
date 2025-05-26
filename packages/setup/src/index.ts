import { Command } from 'commander';
import { commitlintCli } from 'commands/commitlint.ts';
import { editCli } from 'commands/edit.ts';
import { envCli } from 'commands/env.ts';
import { eslintCli } from 'commands/eslint.ts';
import { gitmessageCli } from 'commands/gitmessage.ts';
import { huskyCli } from 'commands/husky.ts';
import { initCli } from 'commands/init.ts';
import { latestCli } from 'commands/latest.ts';
import { lighthouseCli } from 'commands/lighthouse.ts';
import { listCli } from 'commands/list.ts';
import { pkgmngCli } from 'commands/pkgmng.ts';
import { prettierCli } from 'commands/prettier.ts';
import { typescriptCli } from 'commands/typescript.ts';
import { updateCli } from 'commands/update.ts';
import { vsCodeAutoPrefixCli } from 'commands/vscode-autoprefix.ts';
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

