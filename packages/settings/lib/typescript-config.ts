import { execSync } from 'child_process';
import { packageManagerChoices } from 'const/packagesMng.ts';
import detectPackageManager from 'lib/detect-package-manger.ts';
import { select } from '@inquirer/prompts';

/**
 * install dependencies
 * @returns {Promise<void>}
 */
const installDependencies = async (): Promise<void> => {
  console.log('\nInstalling typescript dependencies...\n');
  try {
    const dependencies = 'typescript @types/node @types/react';
    let packageMng = detectPackageManager();
    if (packageMng === 'default') {
      console.log(
        'The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n'
      );
      if (packageMng === 'default') {
        const answer = await select({
          message: 'Which package manager would you like to use for installation? \n',
          choices: packageManagerChoices,
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
 * Setting typescript file
 * @returns {void}
 */
const createConfigFiles = (): void => {
  console.log('Configure Typescript');
  execSync(`npx tsc --init`);
};

export { installDependencies, createConfigFiles };
