import fs from 'fs';


export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'default';

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
  
  return 'default';
};

/**
 * Detect the package manager type being used in the project.
 * If the package manager cannot be found, it indicates either an unsupported environment or that the location
 * is not the project root.
 * @returns {PackageManager} Return package manager type
 */
export const detectPackageManagerType = (): PackageManager => {
  const files = fs.readdirSync(process.cwd());
  
  if (files.includes('yarn.lock')) {
    return 'yarn';
  }
  
  if (files.includes('pnpm-lock.yaml')) {
    return 'pnpm';
  }
  
  if (files.includes('package-lock.json')) {
    return 'npm';
  }
  
  return 'default';
};

export default detectPackageManager;
