import fs from 'fs';
import checkIsProjectRoot from 'lib/check-is-project-root.ts';
import path from 'path';
import { select } from '@inquirer/prompts';

const IDE_TOOL = {
  vscode: 'vscode',
  cursor: 'cursor',
  neovim: 'neovim',
  windsurf: 'windsurf',
  vim: 'vim',
  emacs: 'emacs',
  jetbrains: 'jetbrains',
  other: 'other',
} as const;

type ideToolType = (typeof IDE_TOOL)[keyof typeof IDE_TOOL];

const IDE_MARKERS: Record<string, ideToolType> = {
  '.cursor': IDE_TOOL.cursor,
  '.vscode': IDE_TOOL.vscode,
  '.ide': IDE_TOOL.jetbrains,
  '.wind': IDE_TOOL.windsurf,
  '.nvim': IDE_TOOL.neovim,
  '.vim': IDE_TOOL.vim,
  '.emacs.d': IDE_TOOL.emacs,
  '.jetbrains': IDE_TOOL.jetbrains,
};

/**
 * Check which IDE the user is using
 * @returns {Promise<ideToolType>}
 */
export default async function checkWhatIdeUse(): Promise<ideToolType> {
  if (!checkIsProjectRoot()) {
    throw new Error('This is not a project root. Please run the command in the project root.');
  }

  const rootPath = process.cwd();

  for (const [marker, ide] of Object.entries(IDE_MARKERS)) {
    if (fs.existsSync(path.join(rootPath, marker))) {
      return ide;
    }
  }

  return await select({
    message: 'Please select your IDE:',
    choices: Object.values(IDE_TOOL).map(tool => ({
      name: tool.charAt(0).toUpperCase() + tool.slice(1),
      value: tool,
    })),
  });
}
export { IDE_TOOL };
