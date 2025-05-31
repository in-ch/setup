import fs from 'fs-extra';
import path from 'path';
import { pkgmng } from 'src/commands/pkgmng.ts';

/**
 * Initializes the package manager configuration.
 *
 * This function checks if a `package.json` file exists in the current directory.
 * If the file does not exist, it invokes the `pkgmng` function to set up the package manager.
 *
 * @returns {void} This function does not return any value.
 */
export function initPackagePkg(): void {
  const packageJsonPath = path.join('package.json');
  if (!fs.existsSync(packageJsonPath)) {
    pkgmng();
  }
}
