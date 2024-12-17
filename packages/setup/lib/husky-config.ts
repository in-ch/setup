import { execSync } from 'child_process';
import { packageManagerInstallChoices } from 'const/packagesMng.ts';
import detectPackageManager from 'lib/detect-package-manger.ts';
import { select } from '@inquirer/prompts';

const installDependencies = async (): Promise<void> => {
  console.log('\nInstalling husky dependencies...\n');
  try {
    const dependencies = `husky -D`;
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

const createConfigHusky = async (): Promise<void> => {
  execSync(`npx husky init`, { stdio: 'inherit' });
};

export { createConfigHusky, installDependencies };
