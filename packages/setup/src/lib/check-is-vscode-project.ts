import fs from 'fs';

/**
 * Check if the current directory is a VSCode project
 *
 * @returns {boolean} - True if the current directory is a VSCode project, false otherwise
 */
export default function checkIsVscodeProject(): boolean {
  const isVscodeProject = fs.existsSync('.vscode');
  if (!isVscodeProject) {
    console.log('🥲 .vscode directory not found');
    return false;
  }
  return true;
}
