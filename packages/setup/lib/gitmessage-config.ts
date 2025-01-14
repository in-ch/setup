import { execSync } from 'child_process';
import { COMMANDS } from 'const/commands.ts';
import fs from 'fs';
import getSettingFilePath from 'lib/get-setting-file-path.ts';
import path from 'path';

/**
 * initialize git
 * @returns {Promise<void>}
 */
const initializeGit = async (): Promise<void> => {
  execSync(`git init`, { stdio: 'inherit' });
};

const createConfigFiles = (): void => {
  const rootDir = process.cwd();
  const config = fs.readFileSync(getSettingFilePath(COMMANDS.GITMESSAGE), 'utf-8');
  try {
    fs.writeFileSync(path.join(rootDir, '.gitmessage'), config, 'utf-8');
    execSync('git config commit.template .gitmessage');
    execSync('git config init.defaultBranch main');
    console.log('🎉 Successfully created the git message configuration file. 🎉');
    console.log(
      'You can now write commits following the template using the commit button in your IDE tool or the `git commit` command in the terminal.'
    );
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to setup git message... to  \n', error);
    process.exit(1);
  }
};

export { initializeGit, createConfigFiles };
