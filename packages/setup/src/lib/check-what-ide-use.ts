import fs from 'fs';
import checkIsProjectRoot from 'lib/check-is-project-root.ts';
import path from 'path';

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

/**
 * Check which IDE the user is using
 * @returns {ideToolType}
 */
export default function checkWhatIdeUse(): ideToolType {
  const idRoot = checkIsProjectRoot();
  if (!idRoot) {
    throw new Error('This is not a project root. Please run the command in the project root.');
  }
  const rootPath = process.cwd();
  if (fs.existsSync(path.join(rootPath, '.cursor'))) return IDE_TOOL.cursor;
  if (fs.existsSync(path.join(rootPath, '.vscode'))) return IDE_TOOL.vscode;
  if (fs.existsSync(path.join(rootPath, '.ide'))) return IDE_TOOL.jetbrains;
  if (fs.existsSync(path.join(rootPath, '.wind'))) return IDE_TOOL.windsurf;
  if (fs.existsSync(path.join(rootPath, '.nvim'))) return IDE_TOOL.neovim;
  if (fs.existsSync(path.join(rootPath, '.vim'))) return IDE_TOOL.vim;
  if (fs.existsSync(path.join(rootPath, '.emacs.d'))) return IDE_TOOL.emacs;

  return IDE_TOOL.other;
}
export { IDE_TOOL };
