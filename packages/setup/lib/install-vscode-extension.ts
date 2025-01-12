#!/usr/bin/env node
import { execSync } from 'child_process';

/**
 * Install vscode extension
 *
 * @param {string} extensionId - The ID of the VSCode extension to check (e.g., "esbenp.prettier-vscode").
 * @returns {Promise<void>}
 */
export default async function installExtension(extensionId: string): Promise<void> {
  try {
    await execSync(`code --install-extension ${extensionId}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}
