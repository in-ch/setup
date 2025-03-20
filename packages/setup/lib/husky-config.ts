import { execSync } from 'child_process';
import { packageManagerInstallChoices } from 'const/packagesMng.ts';
import checkIsMonorepo from 'lib/check-is-monorepo.js';
import detectPackageManager from 'lib/detect-package-manger.ts';
import path from 'path';
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
    execSync(`${installCommand} -D ${checkIsMonorepo() ? '-w' : ''}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies...');
    process.exit(1);
  }
};

const createConfigHusky = async (): Promise<void> => {
  execSync(`npx husky init`, { stdio: 'inherit' });
};

const updatePackageJson = async (): Promise<void> => {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const fs = await import('fs-extra');
  try {
    await fs.access(packageJsonPath);
  } catch (error) {
    console.error('Could not find the package.json file.');
    return;
  }

  try {
    const data = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(data);

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    packageJson.scripts.test = 'echo "Error: no test specified" && exit 1';

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
    console.log('package.json file updated successfully.');
  } catch (error) {
    console.error('An error occurred while reading or modifying the package.json file:', error);
  }
};

export { createConfigHusky, installDependencies, updatePackageJson };
