import { Command } from 'commander';
import checkIsVscodeProject from 'lib/check-is-vscode-project.ts';
import makeCursorFolder from 'lib/make-cursor-folder.ts';

export const cursorRuleCli = new Command()
  .name('cursor-rule')
  .alias('cr')
  .description('Setup Cursor AI rules configuration')
  .action(async () => {
    console.log('🎯 Setting up Cursor AI rules...\n');

    if (!checkIsVscodeProject()) {
      console.log('🥲 .vscode directory not found\n');
      console.log('Is this a cursor project?\n');
      console.log('Please run `ics cursor-rule` in a cursor project\n');
      return;
    }

    const cursorRulesDir = '.cursor/rules';
    const isCursorFolderCreated = await makeCursorFolder(cursorRulesDir);
    if (!isCursorFolderCreated) {
      console.log('🥲 Cursor folder not created\n');
      return;
    }
  });
