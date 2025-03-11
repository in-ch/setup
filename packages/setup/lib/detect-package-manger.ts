import fs from 'fs';

/**
 * After identifying the package manager being used in the project, return the appropriate installation command.
 * If the package manager cannot be found, it indicates either an unsupported environment or that the location
 * is not the project root.
 * @returns {string} Return install command
 */
const detectPackageManager = (): string => {
  const files = fs.readdirSync(process.cwd());
  if (files.includes('yarn.lock')) {
    return 'yarn add';
  }
  if (files.includes('pnpm-lock.yaml')) {
    return 'pnpm add';
  }
  if (files.includes('package-lock.json')) {
    return 'npm install';
  }
  return 'npm install';
};

export default detectPackageManager;
