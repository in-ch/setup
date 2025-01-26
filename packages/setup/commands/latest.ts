import { Command } from 'commander';
import checkLatestPkgVersion from 'lib/check-latest-pkg-version.ts';
import versionCheckAndUpdate from 'lib/version-update.ts';

export const latestCli = new Command()
  .command('latest')
  .description('Check latest version of @in-ch/cli package')
  .action(() => latest());
export const latest = async () => {
  await versionCheckAndUpdate();
  const latestVersion = await checkLatestPkgVersion('@in-ch/setup');
  console.log(`The latest version of @in-ch/setup is v${latestVersion}`);
};
