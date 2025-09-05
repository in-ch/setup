import { execSync } from 'child_process';
import checkIsMonorepo from 'lib/check-is-monorepo.js';
import detectPackageManager from 'lib/detect-package-manger.ts';
import { packageManagerInstallChoices } from 'src/const/packagesMng.ts';
import { select } from '@inquirer/prompts';

export interface PackageManagerOptions {
  dependencies: string;
  isDev?: boolean;
  workspace?: boolean;
}

/**
 * Install dependencies through the package manager
 * @param {PackageManagerOptions} options Installation options
 * @returns {Promise<void>}
 */
export const installDependencies = async (options: PackageManagerOptions): Promise<void> => {
  const { dependencies, isDev = true, workspace = false } = options;

  console.log('\nInstalling dependencies...\n');

  try {
    let packageMng = detectPackageManager();

    if (packageMng === 'default') {
      console.log(
        'The package manager could not be detected. \n\n1. If this is not the project root, please run the command from the root directory. \n2. If you have not installed the packages beforehand, please install them first and then try again.\n\n'
      );

      const answer = await select({
        message: 'Which package manager would you like to use for installation? \n',
        choices: packageManagerInstallChoices,
      });

      if (answer === 'cancel') {
        return;
      }

      packageMng = answer;
    }

    const installCommand = `${packageMng} ${dependencies}`;
    const flags = [isDev ? '-D' : '', workspace && checkIsMonorepo() ? '-w' : ''].filter(Boolean).join(' ');

    execSync(`${installCommand} ${flags}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('🥲 🥲 🥲 Failed to install dependencies...');
    throw error;
  }
};

/**
 * Install ESLint dependencies
 * @param {string} configType ESLint config type
 * @returns {Promise<void>}
 */
export const installEslintDependencies = async (configType: string): Promise<void> => {
  const dependencyMap = {
    'import-sort':
      'eslint @types/eslint eslint-plugin-jsdoc eslint-plugin-no-for-of-array eslint-plugin-vue @eslint/js typescript-eslint globals',
    airbnb:
      'eslint eslint-config-airbnb-base eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin',
    google: 'eslint eslint-config-google',
    xo: 'eslint eslint-config-xo',
  };

  const dependencies = dependencyMap[configType as keyof typeof dependencyMap] || dependencyMap['import-sort'];

  await installDependencies({
    dependencies,
    isDev: true,
    workspace: true,
  });
};
