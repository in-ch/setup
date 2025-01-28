import { execSync } from 'child_process';
import { packageManagerInstallChoices } from 'const/packagesMng.ts';
import fs from 'fs';
import detectPackageManager from 'lib/detect-package-manger.ts';
import getSettingFilePath from 'lib/get-setting-file-path.ts';
import path from 'path';
import { select } from '@inquirer/prompts';

/**
 * eslint import sort install dependencies
 * @returns {Promise<void>}
 */
const installImportSortDependencies = async (): Promise<void> => {
  console.log('\nInstalling eslint dependencies...\n');
  try {
    const dependencies =
      'eslint @types/eslint eslint-plugin-jsdoc eslint-plugin-no-for-of-array eslint-plugin-vue @eslint/js typescript-eslint globals';
    let packageMng = detectPackageManager();
    if (packageMng === 'default') {
      console.log(
        'The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n'
      );
      if (packageMng === 'default') {
        const answer = await select({
          message: 'Which package manager would you like to use for installation? \n',
          choices: packageManagerInstallChoices,
        });
        if (answer === 'cancel') {
          return;
        }
        packageMng = answer;
      }
    }
    const installCommand = `${packageMng} ${dependencies}`;
    execSync(`${installCommand} -D`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies...');
    process.exit(1);
  }
};

/**
 * eslint airbnb install dependencies
 * @returns {Promise<void>}
 */
const installAirbnbDependencies = async (): Promise<void> => {
  console.log('\nInstalling eslint dependencies...\n');
  try {
    const dependencies =
      'eslint eslint-config-airbnb-base eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin';
    let packageMng = detectPackageManager();
    if (packageMng === 'default') {
      console.log(
        'The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n'
      );
      if (packageMng === 'default') {
        const answer = await select({
          message: 'Which package manager would you like to use for installation? \n',
          choices: packageManagerInstallChoices,
        });
        if (answer === 'cancel') {
          return;
        }
        packageMng = answer;
      }
    }
    const installCommand = `${packageMng} ${dependencies}`;
    execSync(`${installCommand} -D`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies...');
    process.exit(1);
  }
};

/**
 * eslint google install dependencies
 * @returns {Promise<void>}
 */
const installGoogleDependencies = async (): Promise<void> => {
  console.log('\nInstalling eslint dependencies...\n');
  try {
    const dependencies = 'eslint eslint-config-google';
    let packageMng = detectPackageManager();
    if (packageMng === 'default') {
      console.log(
        'The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n'
      );
      if (packageMng === 'default') {
        const answer = await select({
          message: 'Which package manager would you like to use for installation? \n',
          choices: packageManagerInstallChoices,
        });
        if (answer === 'cancel') {
          return;
        }
        packageMng = answer;
      }
    }
    const installCommand = `${packageMng} ${dependencies}`;
    execSync(`${installCommand} -D`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies...');
    process.exit(1);
  }
};

/**
 * eslint xo install dependencies
 * @returns {Promise<void>}
 */
const installXODependencies = async (): Promise<void> => {
  console.log('\nInstalling eslint dependencies...\n');
  try {
    const dependencies = 'eslint eslint-config-xo';
    let packageMng = detectPackageManager();
    if (packageMng === 'default') {
      console.log(
        'The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n'
      );
      if (packageMng === 'default') {
        const answer = await select({
          message: 'Which package manager would you like to use for installation? \n',
          choices: packageManagerInstallChoices,
        });
        if (answer === 'cancel') {
          return;
        }
        packageMng = answer;
      }
    }
    const installCommand = `${packageMng} ${dependencies}`;
    execSync(`${installCommand} -D`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies...');
    process.exit(1);
  }
};

const createConfigFiles = (command: string): void => {
  const rootDir = process.cwd();
  const eslintConfig = fs.readFileSync(getSettingFilePath(command), 'utf-8');
  try {
    fs.writeFileSync(path.join(rootDir, 'eslint.config.mjs'), eslintConfig, 'utf-8');
    console.log('\n🎉 Successfully created the ESLint configuration file.');
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to setup eslint... to\n', error);
    process.exit(1);
  }
};

export {
  installImportSortDependencies,
  createConfigFiles,
  installAirbnbDependencies,
  installGoogleDependencies,
  installXODependencies,
};
