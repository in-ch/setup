const fs = require('fs');
const path = require('path');

/**
 * @description Check if a package manager is initialized in the given directory.
 * @param {string} [dir=process.cwd()] - Directory to check.
 * @returns {boolean} true if initialized, otherwise false.
 */
export default function checkPkgInit(dir = process.cwd()): boolean {
  const packageJson = path.join(dir, 'package.json');
  const yarnLock = path.join(dir, 'yarn.lock');
  const pnpmLock = path.join(dir, 'pnpm-lock.yaml');

  return fs.existsSync(packageJson) || fs.existsSync(yarnLock) || fs.existsSync(pnpmLock);
}
