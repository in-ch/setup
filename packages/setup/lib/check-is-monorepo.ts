import fs from 'fs';
import path from 'path';

/**
 * Checks if the given directory is a monorepo workspace.
 * Supports Yarn, pnpm, Lerna, and Bun workspaces.
 *
 * @param {string} [basePath=process.cwd()] - The base path to check.
 * @returns {boolean} true if the directory is a monorepo workspace, false otherwise.
 */
function checkIsMonorepo(basePath: string = process.cwd()): boolean {
  const packageJsonPath = path.join(basePath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  if (packageJson.workspaces) {
    return true;
  }
  const pnpmWorkspacePath = path.join(basePath, 'pnpm-workspace.yaml');
  if (fs.existsSync(pnpmWorkspacePath)) {
    return true;
  }
  const lernaConfigPath = path.join(basePath, 'lerna.json');
  if (fs.existsSync(lernaConfigPath)) {
    return true;
  }
  const bunConfigPath = path.join(basePath, 'bunfig.toml');
  if (fs.existsSync(bunConfigPath)) {
    return true;
  }
  return false;
}

export default checkIsMonorepo;
