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
  const isDevMode = process.env.NODE_ENV === 'development' || true;
  if (isDevMode) {
    return path.resolve(process.cwd(), 'const/config', file) + extension[file];
  } else {
    const packagePath = path.dirname(require.resolve('@in-ch/setup/package.json'));
    return path.resolve(packagePath, file) + extension[file];
  }
}
