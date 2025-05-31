import { execSync } from 'child_process';
import checkLatestPkgVersion from 'lib/check-latest-pkg-version.ts';
import { getPackageInfo } from 'lib/get-package-info.ts';
import { pkgmng } from 'src/commands/pkgmng.ts';
import { confirm } from '@inquirer/prompts';

export function initializePackageManager() {
  try {
    execSync('npm --version');
  } catch {
    pkgmng();
  }
}

export default async function versionCheckAndUpdate() {
  initializePackageManager();

  const latestVersion = await checkLatestPkgVersion('@in-ch/setup');
  const currentVersion = await getPackageInfo().version;

  if (currentVersion !== latestVersion) {
    const isUpdateLatestVersion = await confirm({
      message: `The latest version is ${latestVersion}, but the current version is ${currentVersion}. An update is needed. Would you like to update?`,
    });
    if (isUpdateLatestVersion) {
      execSync('npm install @in-ch/setup@latest -g', { stdio: 'inherit' });
      console.log('Update completed successfully.');
    }
  }
}
