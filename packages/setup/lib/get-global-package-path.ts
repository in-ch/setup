import { execSync } from 'child_process';
import path from 'path';

/**
 * Get the global path of a given npm package
 * @param {string} packageName Name of the package
 * @returns {string | null} Path to the global package, or null if not found
 */
export default function getGlobalPackagePath(packageName: string): string | null {
  try {
    const globalNpmRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    const packagePath = path.resolve(globalNpmRoot, packageName);
    return packagePath;
  } catch (error) {
    console.error('Error resolving global package path:', error);
    return null;
  }
}
