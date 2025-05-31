import getGlobalPackagePath from 'lib/get-global-package-path.ts';
import path from 'path';
import { extension } from 'src/const/commands.ts';

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
