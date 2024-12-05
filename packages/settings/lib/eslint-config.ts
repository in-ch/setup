import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { select } from '@inquirer/prompts';

import getSettingFilePath from 'lib/get-setting-file-path.ts';
import { COMMANDS } from 'const/commands.ts';
import { packageManagerChoices } from 'const/packagesMng.ts';

/**
 * After identifying the package manager being used in the project, return the appropriate installation command. 
 * If the package manager cannot be found, it indicates either an unsupported environment or that the location 
 * is not the project root.
 * @returns {string} Return install command
 */
const detectPackageManager = (): string => {
  const files = fs.readdirSync(process.cwd());
  if (files.includes('yarn.lock')) {
    return 'yarn add'
  };
  if (files.includes('pnpm-lock.yaml')) {
    return 'pnpm add'
  };
  if (files.includes('package-lock.json')) {
    return 'npm install'
  };
  return 'default';
};

/**
 * install dependencies
 * @returns {Promise<void>} 
 */
const installDependencies = async (): Promise<void> => {
  try {
    const dependencies = 'eslint @types/eslint eslint-plugin-jsdoc eslint-plugin-no-for-of-array eslint-plugin-vue @eslint/js typescript-eslint globals';
    let packageMng = detectPackageManager();
    if(packageMng === 'default') {
      console.log('The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n');
      if(packageMng === 'default') {
        const answer = await select({ message: 'Which package manager would you like to use for installation? \n', choices: packageManagerChoices });
        if(answer === 'cancel') {
          return;
        }
        packageMng = answer;
      }
    }
    const installCommand = `${packageMng} ${dependencies}`;
    execSync(installCommand, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies...');
    process.exit(1);
  }
};

const createConfigFiles = (): void => {
  const rootDir = process.cwd();
  const eslintConfig = fs.readFileSync(getSettingFilePath(COMMANDS.ESLINT), 'utf-8');
  const eslintIgnore = `node_modules/
dist/
build/
coverage/
*.min.js
*.bundle.js
*.config.js
*.cjs
logs/
*.log
.vscode/
.DS_Store
.env
.env.*`;

  try {
    fs.writeFileSync(path.join(rootDir, '.eslintrc.config.mjs'), eslintConfig, 'utf-8');
    fs.writeFileSync(path.join(rootDir, '.eslintignore'), eslintIgnore, 'utf-8');
    console.log('🎉 Successfully created the ESLint configuration file.');
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies... to  ', error);
    process.exit(1);
  }
};

export { installDependencies, createConfigFiles };
