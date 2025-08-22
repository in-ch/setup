import fs from 'fs';
import path from 'path';

/**
 * @description Check if the current directory is a project root
 * @param {string} [dir=process.cwd()] - Directory to check.
 * @returns {boolean} true if it's a project root, otherwise false.
 */
export default function checkIsProjectRoot(dir = process.cwd()): boolean {
  const packageJson = path.join(dir, 'package.json');
  if (fs.existsSync(packageJson)) {
    return true;
  }

  const rootIndicators = [
    'package.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'package-lock.json',
    'composer.json',
    'Cargo.toml',
    'go.mod',
    'pyproject.toml',
    'requirements.txt',
    'Gemfile',
    'pom.xml',
    'build.gradle',
    '.git',
    'README.md',
  ];

  return rootIndicators.some(indicator => fs.existsSync(path.join(dir, indicator)));
}

/**
 * @description Get project root directory by traversing up from current directory
 * @param {string} [startDir=process.cwd()] - Directory to start searching from
 * @returns {string | null} Project root path or null if not found
 */
export function findProjectRoot(startDir = process.cwd()): string | null {
  let currentDir = startDir;
  const rootPath = path.parse(currentDir).root;

  while (currentDir !== rootPath) {
    if (checkIsProjectRoot(currentDir)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
}
