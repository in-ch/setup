#!/usr/bin/env node
import { execSync } from 'child_process';

/**
 * Checks if a specific VSCode extension is installed.
 *
 * @param {string} extensionId - The ID of the VSCode extension to check (e.g., "esbenp.prettier-vscode").
 * @returns {Promise<boolean>} return whether the extension is installed
 */
export default async function checkVsCodeExtensionInstalled(extensionId: string): Promise<boolean | undefined> {
  try {
    const list = execSync('code --list-extensions', { stdio: 'pipe' }).toString();

    if (!list) {
      console.error('No extensions found or error executing the command.');
      return false;
    }
    const extensions = list.split('\n').map(ext => ext.trim());
    return extensions.includes(extensionId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}
