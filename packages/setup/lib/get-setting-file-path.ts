import { execSync } from 'child_process';
import { extension } from 'const/commands.ts';
import path from 'path';

/**
 * @param {string} file Config file name
 * @description Get config file's path
 * @returns {string} Full path to the config file
 */
export default function getSettingFilePath(file: string): string {
  if (!file) {
    throw new Error('File name is required');
  }

  const isDevMode = process.env.NODE_ENV === 'development';
  if (isDevMode) {
    return path.resolve(process.cwd(), 'const/config', file) + extension[file];
  } else {
    const globalPath = getGlobalPackagePath('@in-ch/setup');
    if (!globalPath) {
      throw new Error('Could not resolve global path for @in-ch/setup');
    }
    return path.resolve(globalPath, 'const/config', file) + extension[file];
  }
}

/**
 * Get the global path of a given npm package
 * @param {string} packageName Name of the package
 * @returns {string | null} Path to the global package, or null if not found
 */
function getGlobalPackagePath(packageName: string): string | null {
  try {
    const globalNpmRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    const packagePath = path.resolve(globalNpmRoot, packageName);
    return packagePath;
  } catch (error) {
    console.error('Error resolving global package path:', error);
    return null;
  }
}
